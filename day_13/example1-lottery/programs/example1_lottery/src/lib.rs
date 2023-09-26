use anchor_lang::prelude::*;

declare_id!("CRTqpK925UGfmxJxSpncim7hF5RRAoFvtvLggQHHMvf8");

#[program]
pub mod example1_lottery {
    use super::*;
    use anchor_lang::{solana_program::entrypoint::ProgramResult, system_program};

    pub fn initialize_lottery(
        ctx: Context<Create>,
        ticket_price: u64,
        oracle_pubkey: Pubkey,
    ) -> ProgramResult {
        let lottery = &mut ctx.accounts.lottery;
        lottery.authority = ctx.accounts.admin.key();
        lottery.count = 0;
        lottery.ticket_price = ticket_price;
        lottery.oracle = oracle_pubkey;

        Ok(())
    }

    pub fn buy_ticket(ctx: Context<Submit>) -> ProgramResult {
        let lottery = &mut ctx.accounts.lottery;
        let player = &mut ctx.accounts.player;

        let instruction = anchor_lang::solana_program::system_instruction::transfer(
            &player.key(),
            &lottery.key(),
            lottery.ticket_price,
        );
        anchor_lang::solana_program::program::invoke(
            &instruction,
            &[player.to_account_info(), lottery.to_account_info()],
        )?;

        let ticket = &mut ctx.accounts.ticket;
        ticket.submitter = player.key();
        ticket.idx = lottery.count;
        lottery.count += 1;

        Ok(())
    }

    pub fn pick_winner(ctx: Context<Winner>, winner: u32) -> ProgramResult {
        let lottery = &mut ctx.accounts.lottery;
        lottery.winner_index = winner;

        Ok(())
    }

    pub fn pay_out_winner(ctx: Context<Payout>) -> ProgramResult {
        let lottery = &mut ctx.accounts.lottery;
        let recipient = &mut ctx.accounts.winner;

        let payout_balance = (lottery.to_account_info().lamports() * 90) / 100;

        **lottery.to_account_info().try_borrow_mut_lamports()? -= payout_balance;
        **recipient.to_account_info().try_borrow_mut_lamports()? += payout_balance;

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> ProgramResult {
        let lottery = &mut ctx.accounts.lottery.to_account_info();
        let admin = &mut ctx.accounts.admin.to_account_info();

        **admin.try_borrow_mut_lamports()? += **lottery.try_borrow_mut_lamports()?;

        **lottery.try_borrow_mut_lamports()? = 0;
        lottery.assign(&system_program::ID);
        lottery.realloc(0, false)?;

        Ok(())
    }
}

// Contexts
////////////////////////////////////////////////////////////////
#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = admin, space = 8 + 180)]
    pub lottery: Account<'info, Lottery>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Submit<'info> {
    #[account(
        init,
        seeds = [&lottery.count.to_be_bytes(), lottery.key().as_ref()],
        constraint = player.to_account_info().lamports() >= lottery.ticket_price,
        bump,
        payer = player,
        space=80)]
    pub ticket: Account<'info, Ticket>,
    #[account(mut)]
    pub player: Signer<'info>,
    #[account(mut)]
    pub lottery: Account<'info, Lottery>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Winner<'info> {
    #[account(mut, constraint = lottery.oracle == *oracle.key)]
    pub lottery: Account<'info, Lottery>,
    pub oracle: Signer<'info>,
}

#[derive(Accounts)]
pub struct Payout<'info> {
    #[account(mut, constraint = ticket.submitter == *winner.key && ticket.idx == lottery.winner_index)]
    pub lottery: Account<'info, Lottery>,
    #[account(mut)]
    /// CHECK: Not dangerous as it only receives lamports
    pub winner: AccountInfo<'info>,
    #[account(mut)]
    pub ticket: Account<'info, Ticket>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut, constraint = lottery.authority == *admin.key)]
    pub lottery: Account<'info, Lottery>,
    #[account(mut)]
    /// CHECK: Not dangerous as it only receives lamports
    pub admin: AccountInfo<'info>,
}

// Accounts
////////////////////////////////////////////////////////////////

#[account]
pub struct Lottery {
    pub authority: Pubkey,
    pub oracle: Pubkey,
    pub winner: Pubkey,
    pub winner_index: u32,
    pub count: u32,
    pub ticket_price: u64,
}

// Ticket PDA
#[account]
#[derive(Default)]
pub struct Ticket {
    pub submitter: Pubkey,
    pub idx: u32,
}
