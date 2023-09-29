use anchor_lang::prelude::*;

declare_id!("sg4FnSFby2nf8ri8Pgoqe71bnTx4ZabtEAKVp24mb3y");

#[program]
pub mod hello_anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.balance = 100;

        Ok(())
    }

    pub fn update(ctx: Context<Update>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.balance += 100;

        if my_account.balance > 1000 {
            return Err(ErrorCode::ExceededBalance.into());
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = payer, space = 8 + 8)]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[account]
pub struct MyAccount {
    balance: u64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Account balance cannot be greater than 1000")]
    ExceededBalance,
}
