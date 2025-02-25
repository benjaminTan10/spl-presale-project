use anchor_lang::prelude::*;
use anchor_spl::token::{Token, Mint, InitializeMint};
use crate::state::PresaleInfo;
use crate::errors::PresaleError;
use crate::constants::PRESALE_SEED;

pub fn create_and_start_presale(
    ctx: Context<CreateAndStartPresale>,
    presale_identifier: u8,
    token_mint_address: Pubkey,
    softcap_amount: u64,
    hardcap_amount: u64,
    max_token_amount_per_address: u64,
    price_per_token: u64,
    start_time: i64,
    end_time: i64,
    decimals: u8,
) -> Result<()> {
    let presale_info = &mut ctx.accounts.presale_info;
    let authority = &ctx.accounts.authority;
    let clock = Clock::get()?;
    let current_time = clock.unix_timestamp;

    if presale_info.is_initialized && presale_info.deposit_token_amount > 0 {
        return Err(PresaleError::PresaleAlreadyDeposited.into());
    }

    if !presale_info.is_initialized {
        presale_info.is_initialized = true;
        presale_info.presale_identifier = presale_identifier;
        msg!("Presale account initialized");
    } else {
        if presale_info.presale_identifier != presale_identifier {
            return Err(PresaleError::InvalidPresaleIdentifier.into());
        }
    }

    if softcap_amount >= hardcap_amount {
        return Err(PresaleError::InvalidCapAmounts.into());
    }


    if start_time >= end_time {
        return Err(PresaleError::InvalidTimeRange.into());
    }

    if start_time <= current_time {
        return Err(PresaleError::InvalidStartTime.into());
    }

    if max_token_amount_per_address == 0 || price_per_token == 0 {
        return Err(PresaleError::InvalidParameters.into());
    }
    if decimals > 9 || decimals == 0 {
        return Err(PresaleError::InvalidDecimals.into());
    }

    // Replace the pow operation with lookup
    let decimal_per_token = match decimals {
        1 => 10,
        2 => 100,
        3 => 1_000,
        4 => 10_000,
        5 => 100_000,
        6 => 1_000_000,
        7 => 10_000_000,
        8 => 100_000_000,
        9 => 1_000_000_000,
        _ => return Err(PresaleError::InvalidDecimals.into()),
    };

    // Check if the difference between start_time and current_time is less than 1 day
    let one_day_in_seconds: i64 = 24 * 60 * 60; // 24 hours * 60 minutes * 60 seconds
    let time_difference = start_time.checked_sub(current_time).ok_or(PresaleError::Overflow)?;

    let adjusted_start_time: i64 = if time_difference < one_day_in_seconds {
        current_time
    } else {
        start_time
    };

    presale_info.token_mint_address = token_mint_address;
    presale_info.softcap_amount = softcap_amount;
    presale_info.hardcap_amount = hardcap_amount;
    presale_info.deposit_token_amount = 0;
    presale_info.sold_token_amount = 0;
    presale_info.start_time = adjusted_start_time;
    presale_info.end_time = end_time;
    presale_info.max_token_amount_per_address = max_token_amount_per_address;
    presale_info.lamport_price_per_token = price_per_token;
    presale_info.is_live = true; // Set to false initially, will be set to true when presale starts
    presale_info.authority = authority.key();
    presale_info.is_soft_capped = false;
    presale_info.is_hard_capped = false;
    presale_info.decimals = decimals;
    presale_info.decimal_per_token = decimal_per_token;  // Store the pre-calculated value

    if !ctx.accounts.token_mint.is_initialized {
        let cpi_context = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            InitializeMint {
                mint: ctx.accounts.token_mint.to_account_info(),
                rent: ctx.accounts.rent.to_account_info(),
            },
        );
        anchor_spl::token::initialize_mint(cpi_context, decimals, ctx.accounts.authority.key, Some(ctx.accounts.authority.key))?;
        msg!("Token mint initialized");
    }

    msg!("Presale created successfully, decimal_per_token: {}", decimal_per_token);
    msg!("Adjusted start time: {}", adjusted_start_time);
    Ok(())
}

#[derive(Accounts)]
#[instruction(presale_identifier: u8)]
pub struct CreateAndStartPresale<'info> {
    #[account(
        init_if_needed,
        seeds = [PRESALE_SEED, &[presale_identifier]],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<PresaleInfo>()
    )]
    pub presale_info: Box<Account<'info, PresaleInfo>>,

    #[account(mut)]
    pub token_mint: Account<'info, Mint>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}