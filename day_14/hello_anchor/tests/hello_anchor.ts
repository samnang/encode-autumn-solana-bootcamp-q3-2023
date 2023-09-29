import * as anchor from "@coral-xyz/anchor";
import { AnchorError, Program } from "@coral-xyz/anchor";
import { BN } from "bn.js";
import { assert, expect } from "chai";
import { HelloAnchor } from "../target/types/hello_anchor";

describe("hello_anchor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.HelloAnchor as Program<HelloAnchor>;
  let myAccount = anchor.web3.Keypair.generate();

  it("is initialized!", async () => {
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

  it("updates account balance", async () => {
    for (let i = 1; i < 10; i++) {
      await program.methods
        .update()
        .accounts({
          myAccount: myAccount.publicKey,
        })
        .rpc();
    }

    let expectedMyAccount = await program.account.myAccount.fetch(myAccount.publicKey);
    assert(expectedMyAccount.balance.eq(new BN(1000)));
  });

  it("cannot update account balance over 1000", async () => {
    try {
      await program.methods
        .update()
        .accounts({
          myAccount: myAccount.publicKey,
        })
        .rpc();

      assert.fail("Account balance cannot be greater than 1000");
    } catch (error) {
      assert(error instanceof AnchorError);
      assert(error.message.includes("Account balance cannot be greater than 1000"));
    }
  });
});
