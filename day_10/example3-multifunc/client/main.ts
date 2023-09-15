import path from "path";
import {
  checkAccountDeployed,
  checkBinaryExists,
  establishConnection,
  establishEnoughSol,
  getBalance,
  getPayer,
  getUserInput,
} from "./utils/utils";
import {
  PublicKey,
  Connection,
  Keypair,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";

const PROGRAM_PATH = path.resolve(__dirname, "../rust/target/deploy/");
const PROGRAM_BIN_PATH = path.join(PROGRAM_PATH, "multifunc.so");
const PROGRAM_KEYPAIR_PATH = path.join(PROGRAM_PATH, "multifunc-keypair.json");

async function main() {
  console.log("Let's select function!");

  const payer = await getPayer();
  const connection = await establishConnection();
  await establishEnoughSol(connection, payer);

  const [startBalanceSol, startBalanceLamport] = await getBalance(connection, payer);

  const programId = await checkBinaryExists(PROGRAM_KEYPAIR_PATH);
  if (await checkAccountDeployed(connection, programId)) {
    await callFuncs(programId, connection, payer);

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

async function callFuncs(programId: PublicKey, connection: Connection, payer: Keypair) {
  const userInput = await getUserInput(
    "Which function do you want to call? (A = FunctionA, B = FunctionB)",
  );
  let dest_func = userInput.toUpperCase() === "A" ? 0 : 1;

  const instruction = new TransactionInstruction({
    programId,
    keys: [],
    data: Buffer.from([dest_func]),
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
