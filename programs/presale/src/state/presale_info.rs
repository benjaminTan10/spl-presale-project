use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct PresaleInfo {
    pub presale_identifier: u8,
    pub token_mint_address: Pubkey,
    pub softcap_amount: u64,
    pub hardcap_amount: u64,
    pub deposit_token_amount: u64,
    pub sold_token_amount: u64,
    pub start_time: i64,
    pub end_time: i64,
    pub max_token_amount_per_address: u64,
    pub lamport_price_per_token: u64,
    pub is_live: bool,
    pub authority: Pubkey,
    pub is_soft_capped: bool,
    pub is_hard_capped: bool,
    pub is_initialized: bool,
    pub decimals: u8,
    pub decimal_per_token: u64,
}

#[account]
#[derive(Default)]
pub struct BuyerAccount {
    pub purchased_amount: u64,
}