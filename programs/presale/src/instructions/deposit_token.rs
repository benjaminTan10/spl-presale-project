use anchor_lang::prelude::*;
use anchor_spl::{associated_token, token};
use crate::state::PresaleInfo;
use crate::constants::{PRESALE_SEED, PRESALE_VAULT};
use crate::errors::PresaleError;

pub fn deposit_token(ctx: Context<DepositToken>, amount: u64) -> Result<()> {
    let presale_info = &mut ctx.accounts.presale_info;

    if !presale_info.is_initialized {
        return Err(PresaleError::PresaleNotInitialized.into());
    }

    if ctx.accounts.presale_vault.data_is_empty() && ctx.accounts.presale_vault.lamports() == 0 {
        let vault_account_space = 0;
        let vault_lamports = Rent::get()?.minimum_balance(vault_account_space);
        
        anchor_lang::system_program::create_account(
            CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::CreateAccount {
                    from: ctx.accounts.admin.to_account_info(),
                    to: ctx.accounts.presale_vault.to_account_info(),
                },
                &[&[
                    PRESALE_VAULT,
                    &[presale_info.presale_identifier],
                    &[ctx.bumps.presale_vault],
                ]],
            ),
            vault_lamports,
            vault_account_space as u64,
            ctx.program_id,
        )?;
    }

    let new_deposit_amount = presale_info.deposit_token_amount
        .checked_add(amount)
        .ok_or(PresaleError::Overflow)?;
    if new_deposit_amount > presale_info.hardcap_amount {
        return Err(PresaleError::ExceedsHardcap.into());
    }

    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.from_associated_token_account.to_account_info(),
                to: ctx.accounts.to_associated_token_account.to_account_info(),
                authority: ctx.accounts.from_authority.to_account_info(),
            },
        ),
        amount,
    )?;

    presale_info.deposit_token_amount = new_deposit_amount;

    if new_deposit_amount >= presale_info.softcap_amount {
        presale_info.is_soft_capped = true;
    }

    if new_deposit_amount >= presale_info.hardcap_amount {
        presale_info.is_hard_capped = true;
    }

    msg!("Tokens deposited successfully");
    Ok(())
}

#[derive(Accounts)]
pub struct DepositToken<'info> {
    #[account(mut)]
    pub mint_account: Account<'info, token::Mint>,

    #[account(
        mut,
        associated_token::mint = mint_account,
        associated_token::authority = from_authority,
    )]
    pub from_associated_token_account: Account<'info, token::TokenAccount>,

    #[account(constraint = admin.key() == from_authority.key())]
    pub from_authority: Signer<'info>,

    #[account(
        init_if_needed,
        payer = admin,
        associated_token::mint = mint_account,
        associated_token::authority = presale_info,
    )]
    pub to_associated_token_account: Account<'info, token::TokenAccount>,

    #[account(
        mut,
        seeds = [PRESALE_VAULT, &[presale_info.presale_identifier]],
        bump,
    )]
    /// CHECK: This is initialized in the instruction
    pub presale_vault: AccountInfo<'info>,

    #[account(
        mut,
        seeds = [PRESALE_SEED, &[presale_info.presale_identifier]],
        bump
    )]
    pub presale_info: Box<Account<'info, PresaleInfo>>,

    #[account(mut)]
    pub admin: Signer<'info>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
}