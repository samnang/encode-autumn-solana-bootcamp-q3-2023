use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg,
    program_error::ProgramError, pubkey::Pubkey,
};

entrypoint!(process_instruction);

pub fn process_instruction(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("[entrypoint] compute example entrypoint");

    let (prime_count, _) = instruction_data
        .split_first()
        .ok_or(ProgramError::InvalidArgument)?;

    msg!("[entrypoint] will find {}-prime", prime_count);

    let prime = division_based(*prime_count);

    msg!("{} th prime number is {}", prime_count, prime);

    Ok(())
}

fn is_prime(number: &u16) -> bool {
    let upper_range = (*number as f32) / 2.0 + 1.0;

    for i in 2..upper_range as u16 {
        if *number % i == 0 {
            return false;
        }
    }

    true
}

fn division_based(nth_prime: u8) -> u16 {
    let mut primes_found: u16 = 0;
    let mut numb: u16 = 2;
    let mut latest_prime: u16 = 2;

    while primes_found < nth_prime as u16 {
        if is_prime(&numb) {
            primes_found += 1;
            latest_prime = numb;
            msg!("{} th prime number is {}", primes_found, latest_prime);
        }
        numb += 1;
    }

    latest_prime
}
