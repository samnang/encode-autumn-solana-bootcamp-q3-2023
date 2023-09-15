use borsh::{BorshDeserialize, BorshSchema, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

// Define data structure of the state stored in the on-chain account
#[derive(BorshSerialize, BorshDeserialize, BorshSchema, Debug, Clone)]
pub struct GreetingStruct {
    pub counter: u32,
}

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    msg!("[lib] Solana counter example program");

    // Best practices to iterating accoutns is safer than indexing
    let accounts_iter = &mut accounts.iter();

    // Get the first account from the accounts interation
    let greeting_account = next_account_info(accounts_iter)?;

    msg!("[lib] counter program account: {:?}", greeting_account.key);

    // Verify data/state account must be owned by the program in order to modify its data
    if greeting_account.owner != program_id {
        msg!("Greeted account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    } else {
        msg!("Greeted account has the correct program id");
    }

    // Deserialize data from bytes into a struct instance
    let mut greeting_struct = GreetingStruct::try_from_slice(&greeting_account.data.borrow())?;

    // increment the counter
    greeting_struct.counter += 1;

    msg!(
        "[lib] Program added to the greeting counter account stored at: {:?}",
        greeting_account.key
    );

    // Serialize a struct instance into bytes to be stored on data/state account
    greeting_struct.serialize(&mut &mut greeting_account.data.borrow_mut()[..])?;

    msg!("Greeted {} time(s)!", greeting_struct.counter);

    Ok(())
}
