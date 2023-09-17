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
  getUserInput,
} from "./utils/utils";

const PROGRAM_PATH = path.resolve(__dirname, "../rust/target/deploy/");
const PROGRAM_BIN_PATH = path.join(PROGRAM_PATH, "compute.so");
const PROGRAM_KEYPAIR_PATH = path.join(PROGRAM_PATH, "compute-keypair.json");

async function main() {
  console.log("Let's try to fail the program!");

  let payer = await getPayer();

  let connection = await establishConnection();
  await establishEnoughSol(connection, payer);

  const [startBalanceSol, startBalanceLamport] = await getBalance(connection, payer);

  // Check if the solana has been built
  const programId = await checkBinaryExists(PROGRAM_KEYPAIR_PATH);

  // Check if the solana program has been deployed
  if (await checkAccountDeployed(connection, programId)) {
    await getPrimes(programId, connection, payer);

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

async function getPrimes(
  programId: PublicKey,
  connection: Connection,
  payer: Keypair,
): Promise<void> {
  let primeLimit = parseInt(await getUserInput("Choose n-th prime up to 90 (I'm serious!)"));

  const instruction = new TransactionInstruction({
    programId,
    keys: [],
    data: Buffer.from([primeLimit]),
  });

  await sendAndConfirmTransaction(connection, new Transaction().add(instruction), [payer]);
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  },
);
