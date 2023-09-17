use anchor_lang::prelude::*;

declare_id!("5FRML9QG24rh4N65iG2Rjo3HPSueMceiVPQyvPaw8CzL");

#[program]
pub mod helloworld_anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Hello Anchor!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
