use solana_program::{msg, program_error::ProgramError};

#[derive(Debug)]
pub enum Instruction {
    FunctionA,
    FunctionB,
}

impl Instruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        // split into first element and the rest [element], [element array]
        let split = input.split_first();

        msg!("[instruction] Split");

        let (function_flag, _rest) = split.ok_or({
            msg!("Message before the error");
            ProgramError::BorshIoError("Invalid parameters passed".to_owned())
        })?;

        msg!("[instruction]Received function flag: {}", function_flag);

        match function_flag {
            0 => Ok(Instruction::FunctionA),
            1 => Ok(Instruction::FunctionB),
            _ => Err(ProgramError::BorshIoError(
                "Invalid function flag".to_owned(),
            )),
        }
    }
}
