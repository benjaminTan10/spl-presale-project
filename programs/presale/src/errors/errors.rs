use anchor_lang::prelude::*;

#[error_code]
pub enum PresaleError {
    #[msg("Presale is not initialized")]
    PresaleNotInitialized,
    #[msg("Invalid decimals")]
    InvalidDecimals,
    #[msg("Presale is not live")]
    PresaleNotLive,
    #[msg("Presale is not active")]
    PresaleNotActive,
    #[msg("Exceeds maximum tokens per address")]
    ExceedsMaxPerAddress,
    #[msg("Insufficient tokens available")]
    InsufficientTokens,
    #[msg("Unauthorized access")]
    Unauthorized,
    #[msg("Presale is still active")]
    PresaleStillActive,
    #[msg("Softcap not reached")]
    SoftcapNotReached,
    #[msg("Insufficient funds")]
    InsufficientFunds,
    #[msg("Presale already initialized")]
    AlreadyInitialized,
    #[msg("Invalid cap amounts")]
    InvalidCapAmounts,
    #[msg("Invalid time range")]
    InvalidTimeRange,
    #[msg("Invalid start time")]
    InvalidStartTime,
    #[msg("Invalid parameters")]
    InvalidParameters,
    #[msg("Presale already started")]
    PresaleAlreadyStarted,
    #[msg("Exceeds hardcap")]
    ExceedsHardcap,
    #[msg("Arithmetic overflow")]
    Overflow,
    #[msg("Invalid presale identifier")]
    InvalidPresaleIdentifier,
    #[msg("Invalid token account")]
    InvalidTokenAccount,
    #[msg("Invalid presale authority")]
    InvalidPresaleAuthority,
    #[msg("Invalid vault owner")]
    InvalidVaultOwner,
    #[msg("Missing required signature")]
    MissingRequiredSignature,
    #[msg("Cannot reinitialize presale after tokens have been deposited")]
    PresaleAlreadyDeposited,
}