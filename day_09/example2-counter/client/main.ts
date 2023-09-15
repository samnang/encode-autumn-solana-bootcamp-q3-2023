import path from "path";
import * as borsh from "borsh";
import {
  PublicKey,
  Connection,
  Keypair,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";

import {
  checkAccountDeployed,
  checkBinaryExists,
  establishConnection,
  establishEnoughSol,
  getBalance,
  getPayer,
} from "./utils/utils";

const PROGRAM_PATH = path.resolve(__dirname, "../rust/target/deploy/");
const PROGRAM_BIN_PATH = path.join(PROGRAM_PATH, "counter.so");
const PROGRAM_KEYPAIR_PATH = path.join(PROGRAM_PATH, "counter-keypair.json");

async function main() {
  console.log("Let's increment counter for an account");

  let payer = await getPayer();

  let connection = await establishConnection();
  await establishEnoughSol(connection, payer);

  const [startBalanceSol, startBalanceLamport] = await getBalance(connection, payer);

  // Check if the solana has been built
  const programId = await checkBinaryExists(PROGRAM_KEYPAIR_PATH);

  // Check if the solana program has been deployed
  if (await checkAccountDeployed(connection, programId)) {
    await callCounterProgram(programId, connection, payer);

    const [endBalanceSol, endBalanceLamport] = await getBalance(connection, payer);

    console.log(
      `\nIt cost:\n\t${startBalanceSol - endBalanceSol} SOL\n\t${
        startBalanceLamport - endBalanceLamport
      } Lamports\nto perform the call`,
    );
  } else {
    console.log(`\nProgram ${PROGRAM_BIN_PATH} not deployed!\n`);
  }
}

async function callCounterProgram(
  programId: PublicKey,
  connection: Connection,
  payer: Keypair,
): Promise<void> {
  const GreetingSchema = {
    struct: { counter: "u32" },
  };

  console.log("Program id account: {}", programId.toBase58());

  // Geneate a public key for greeted account that bases from the payer account
  const GREETING_SEED = "greeting_counter_seed";
  const greetedPubkey = await PublicKey.createWithSeed(payer.publicKey, GREETING_SEED, programId);

  // Check if the greeted account has been created
  if (await checkAccountDeployed(connection, greetedPubkey)) {
    console.log("Writing to the greeting counter account: ", greetedPubkey.toBase58());

    const instruction = new TransactionInstruction({
      keys: [{ pubkey: greetedPubkey, isSigner: false, isWritable: true }],
      programId,
      data: Buffer.alloc(0),
    });
    await sendAndConfirmTransaction(connection, new Transaction().add(instruction), [payer]);
  } else {
    // Calculate the space needed for the new greeted account
    const GREETING_SIZE = borsh.serialize(GreetingSchema, new GreetingAccount()).length;

    console.log(`Greeting account ${greetedPubkey} not yet created`);
    console.log("Creating greeting account", greetedPubkey.toBase58(), "to say hello to");

    // Calculate the enough lamports to apply rent exemption
    const lamports = await connection.getMinimumBalanceForRentExemption(GREETING_SIZE);

    // Create an instruction to create a new greeted account
    const txInstruction = SystemProgram.createAccountWithSeed({
      fromPubkey: payer.publicKey,
      basePubkey: payer.publicKey,
      seed: GREETING_SEED,
      newAccountPubkey: greetedPubkey,
      lamports,
      space: GREETING_SIZE,
      programId,
    });
    await sendAndConfirmTransaction(connection, new Transaction().add(txInstruction), [payer]);
  }

  const accountInfo = await connection.getAccountInfo(greetedPubkey);
  if (accountInfo === null) {
    throw "Error: cannot find the greetd account";
  }

  // Deserialize greeted account's data that is in bytes into an instance of GreetingAccount
  const greetingAccount = borsh.deserialize(GreetingSchema, accountInfo.data) as GreetingAccount;
  console.log(greetedPubkey.toBase58(), "has been greeted", greetingAccount.counter, "time(s)");
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  },
);

class GreetingAccount {
  counter = 0;
}
