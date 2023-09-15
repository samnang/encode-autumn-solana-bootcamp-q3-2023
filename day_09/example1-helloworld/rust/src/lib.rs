use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    _accounts: &[AccountInfo], // list of instruction's accounts sent from clients
    _instruction_data: &[u8],
) -> ProgramResult {
    msg!(
        "[lib] Hello World from the Solana program. Program id: {}",
        program_id
    );

    Ok(())
}
