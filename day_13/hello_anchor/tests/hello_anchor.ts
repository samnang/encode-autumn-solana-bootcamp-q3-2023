import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BN } from "bn.js";
import { assert, expect } from "chai";
import { HelloAnchor } from "../target/types/hello_anchor";

describe("hello_anchor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.HelloAnchor as Program<HelloAnchor>;

  it("Is initialized!", async () => {
    let myAccount = anchor.web3.Keypair.generate();

    await program.methods
      .initialize()
      .accounts({
        myAccount: myAccount.publicKey,
      })
      .signers([myAccount])
      .rpc();

    let expectedMyAccount = await program.account.myAccount.fetch(myAccount.publicKey);
    assert(expectedMyAccount.balance.eq(new BN(100)));
  });
});
