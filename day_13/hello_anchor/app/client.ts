import * as anchor from "@coral-xyz/anchor";
import path from "path";
import fs from "fs";
import os from "os";
import yaml from "yaml";
import { Keypair, Connection } from "@solana/web3.js";

async function main() {
  // setup local provider
  let connection = new Connection("http://127.0.0.1:8899", "confirmed");
  let provider = new anchor.AnchorProvider(connection, getWallet(), {});
  anchor.setProvider(provider);

  // Read the generated IDL.
  const idl = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../target/idl/hello_anchor.json"), {
      encoding: "utf8",
    })
  );

  // Address of the deployed program.
  const programId = new anchor.web3.PublicKey(idl.metadata.address);

  // Generate the program client from IDL.
  const program = new anchor.Program(idl, programId);

  const myAccount = anchor.web3.Keypair.generate();

  // Execute the RPC.
  const tx = await program.methods
    .initialize()
    .accounts({ myAccount: myAccount.publicKey })
    .signers([myAccount])
    .rpc();
  console.log("Your transaction signature", tx);
}

function getWallet() {
  const CONFIG_FILE_PATH = path.resolve(os.homedir(), ".config", "solana", "cli", "config.yml");

  const configFileYAML = fs.readFileSync(CONFIG_FILE_PATH, {
    encoding: "utf8",
  });
  const configFile = yaml.parse(configFileYAML);
  const secretKeyString = fs.readFileSync(configFile.keypair_path, {
    encoding: "utf8",
  });
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));

  return new anchor.Wallet(Keypair.fromSecretKey(secretKey));
}

console.log("Running client.");
main().then(() => console.log("Success"));
