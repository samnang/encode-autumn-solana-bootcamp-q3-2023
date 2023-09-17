use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    instruction::Instruction,
    msg,
    program::invoke,
    pubkey::Pubkey,
};

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    msg!("[CPI] entrypoint");

    // Best practices to iterating accoutns is safer than indexing
    let accounts_iter = &mut accounts.iter();

    // Get the first account from the accounts interation
    let helloworld_account = next_account_info(accounts_iter)?;

    msg!("[CPI] program id: {:?}", program_id);

    let instruction = Instruction::new_with_bincode(*helloworld_account.key, &[0; 0], vec![]);

    msg!(
        "[CPI] Calling helloworld program id: {}",
        helloworld_account.key
    );

    invoke(&instruction, &[helloworld_account.clone()])?;

    Ok(())
}
