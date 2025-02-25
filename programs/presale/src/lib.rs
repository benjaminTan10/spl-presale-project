use anchor_lang::prelude::*;

mod instructions;
mod state;
mod errors;
mod constants;

use instructions::*;
use errors::PresaleError;

declare_id!("8GuUDSZ8XiCxFL9cPjNeJdVedCx6JSsFknv6x2Mc41kV");

#[program]
pub mod token_presale {
    use super::*;

    pub fn create_and_start_presale(
        ctx: Context<CreateAndStartPresale>,
        presale_identifier: u8,
        token_mint_address: Pubkey,
        softcap_amount: u64,
        hardcap_amount: u64,
        max_token_amount_per_address: u64,
        lamport_price_per_token: u64,
        start_time: i64,
        end_time: i64,
        decimals: u8,
    ) -> Result<()> {
        if presale_identifier == 0 || presale_identifier > 5 {
            return Err(error!(PresaleError::InvalidPresaleIdentifier));
        }
        instructions::create_and_start_presale::create_and_start_presale(
            ctx,
            presale_identifier,
            token_mint_address,
            softcap_amount,
            hardcap_amount,
            max_token_amount_per_address,
            lamport_price_per_token,
            start_time,
            end_time,
            decimals,
        )
    }

    pub fn deposit_token(ctx: Context<DepositToken>, amount: u64) -> Result<()> {
        instructions::deposit_token::deposit_token(ctx, amount)
    }

    pub fn buy_and_claim_token(ctx: Context<BuyAndClaimToken>, token_amount: u64) -> Result<()> {
        instructions::buy_and_claim_token::buy_and_claim_token(ctx, token_amount)
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64, withdraw_type: WithdrawType) -> Result<()> {
        instructions::withdraw::withdraw(ctx, amount, withdraw_type)
    }
}