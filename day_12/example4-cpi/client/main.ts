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
const PROGRAM_BIN_PATH = path.join(PROGRAM_PATH, "cpi.so");
const PROGRAM_KEYPAIR_PATH = path.join(PROGRAM_PATH, "cpi-keypair.json");
const HELLOWORD_PROGRAM_KEYPAIR_PATH = path.join(
  __dirname,
  "../../example1-helloworld/rust/target/deploy/helloworld-keypair.json",
);

async function main() {
  console.log("Let's invoke other program!");

  let payer = await getPayer();

  let connection = await establishConnection();
  await establishEnoughSol(connection, payer);

  const [startBalanceSol, startBalanceLamport] = await getBalance(connection, payer);

  // Check if the solana has been built
  const programId = await checkBinaryExists(PROGRAM_KEYPAIR_PATH);

  // Check if the solana program has been deployed
  if (await checkAccountDeployed(connection, programId)) {
    await invokeOtherProgram(programId, connection, payer);

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

async function invokeOtherProgram(
  programId: PublicKey,
  connection: Connection,
  payer: Keypair,
): Promise<void> {
  let helloworldProgramId = await checkBinaryExists(HELLOWORD_PROGRAM_KEYPAIR_PATH);

  console.log("helloworld program id: ", helloworldProgramId.toBase58());

  // Check if the helloworld program account has been created
  if (await checkAccountDeployed(connection, helloworldProgramId)) {
    const instruction = new TransactionInstruction({
      programId,
      data: Buffer.alloc(0),
      keys: [{ pubkey: helloworldProgramId, isSigner: false, isWritable: false }],
    });

    await sendAndConfirmTransaction(connection, new Transaction().add(instruction), [payer]);
  } else {
    console.log(`\nProgram ${helloworldProgramId.toBase58()} not deployed!\n`);
  }
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  },
);
