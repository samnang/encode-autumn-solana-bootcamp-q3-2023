import path from "path";
import {
  PublicKey,
  Connection,
  Keypair,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Transaction,
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
const PROGRAM_BIN_PATH = path.join(PROGRAM_PATH, "helloworld.so");
const PROGRAM_KEYPAIR_PATH = path.join(PROGRAM_PATH, "helloworld-keypair.json");

async function main() {
  const payer = await getPayer(); // payer is the account who is used to submit the transaction
  const connection = await establishConnection(); // establish the connection to the RPC cluster

  await establishEnoughSol(connection, payer); // Make sure the payer has enough funds to submit the transaction otherwise requesting an airdrop

  const [startBalanceSol, startBalanceLamport] = await getBalance(connection, payer);

  const programId = await checkBinaryExists(PROGRAM_KEYPAIR_PATH);

  // verify if the program has been deployed
  if (await checkAccountDeployed(connection, programId)) {
    await sayHello(programId, connection, payer);

    const [endBalanceSol, endBalanceLamport] = await getBalance(connection, payer);

    console.log(
      `\nIt cost:\n\t${startBalanceSol - endBalanceSol} SOL\n\t${
        startBalanceLamport - endBalanceLamport
      } Lamports\nto perform the call`,
    );
  } else {
    console.log(`\n Program ${PROGRAM_BIN_PATH} not deployed!\n`);
  }
}

export async function sayHello(
  programId: PublicKey,
  connection: Connection,
  payer: Keypair,
): Promise<void> {
  // Prepare the instruction to call to the program
  const transactionInstruction = new TransactionInstruction({
    programId: programId,
    keys: [],
    data: Buffer.alloc(0),
  });

  // Submit the transaction to the RPC cluster
  await sendAndConfirmTransaction(connection, new Transaction().add(transactionInstruction), [
    payer,
  ]);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  },
);
