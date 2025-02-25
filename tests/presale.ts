import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Presale } from "../target/types/presale";
import {
  PublicKey,
  Keypair,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import 
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createMint,
  createAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import { assert } from "chai";

describe("presale", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Presale as Program<Presale>;

  const admin = Keypair.generate();
  const buyer = Keypair.generate();
  let mint: PublicKey;
  let adminAta: PublicKey;
  let presaleAta: PublicKey;
  let buyerAta: PublicKey;
  let presaleInfo: PublicKey;
  let presaleVault: PublicKey;

  const PRESALE_SEED = "PRESALE_SEED";
  const PRESALE_VAULT = "PRESALE_VAULT";

  before(async () => {
    // Airdrop SOL to admin and buyer
    await provider.connection.requestAirdrop(admin.publicKey, 10 * LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(buyer.publicKey, 10 * LAMPORTS_PER_SOL);

    // Create token mint
    mint = await createMint(
      provider.connection,
      admin,
      admin.publicKey,
      null,
      9
    );

    // Create token accounts
    adminAta = await createAssociatedTokenAccount(
      provider.connection,
      admin,
      mint,
      admin.publicKey
    );

    [presaleInfo] = await PublicKey.findProgramAddress(
      [Buffer.from(PRESALE_SEED)],
      program.programId
    );

    [presaleVault] = await PublicKey.findProgramAddress(
      [Buffer.from(PRESALE_VAULT)],
      program.programId
    );

    presaleAta = await createAssociatedTokenAccount(
      provider.connection,
      admin,
      mint,
      presaleInfo
    );

    buyerAta = await createAssociatedTokenAccount(
      provider.connection,
      buyer,
      mint,
      buyer.publicKey
    );

    // Mint some tokens to admin
    await mintTo(
      provider.connection,
      admin,
      mint,
      adminAta,
      admin.publicKey,
      1000000000
    );
  });

  it("Creates and starts a presale", async () => {
    const tokenMintAddress = mint;
    const softcapAmount = new anchor.BN(100 * LAMPORTS_PER_SOL);
    const hardcapAmount = new anchor.BN(1000 * LAMPORTS_PER_SOL);
    const maxTokenAmountPerAddress = new anchor.BN(10 * LAMPORTS_PER_SOL);
    const pricePerToken = new anchor.BN(0.1 * LAMPORTS_PER_SOL);
    const startTime = new anchor.BN(Math.floor(Date.now() / 1000));
    const endTime = new anchor.BN(Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60); // 1 week from now

    await program.methods
      .createAndStartPresale(
        tokenMintAddress,
        softcapAmount,
        hardcapAmount,
        maxTokenAmountPerAddress,
        pricePerToken,
        startTime,
        endTime
      )
      .accounts({
        presaleInfo: presaleInfo,
        authority: admin.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([admin])
      .rpc();

    const presaleInfoAccount = await program.account.presaleInfo.fetch(presaleInfo);
    assert.ok(presaleInfoAccount.isLive);
    assert.ok(presaleInfoAccount.tokenMintAddress.equals(tokenMintAddress));
  });

  it("Deposits tokens", async () => {
    const depositAmount = new anchor.BN(1000 * LAMPORTS_PER_SOL);

    await program.methods
      .depositToken(depositAmount)
      .accounts({
        mintAccount: mint,
        fromAssociatedTokenAccount: adminAta,
        fromAuthority: admin.publicKey,
        toAssociatedTokenAccount: presaleAta,
        presaleVault: presaleVault,
        presaleInfo: presaleInfo,
        admin: admin.publicKey,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .signers([admin])
      .rpc();

    const presaleInfoAccount = await program.account.presaleInfo.fetch(presaleInfo);
    assert.ok(presaleInfoAccount.depositTokenAmount.eq(depositAmount));
  });

  it("Buys and claims tokens", async () => {
    const quoteAmount = new anchor.BN(1 * LAMPORTS_PER_SOL);
    const tokenAmount = new anchor.BN(10 * LAMPORTS_PER_SOL);

    const [presalePDA, bump] = await PublicKey.findProgramAddress(
      [Buffer.from(PRESALE_SEED)],
      program.programId
    );

    await program.methods
      .buyAndClaimToken(quoteAmount, tokenAmount, bump)
      .accounts({
        tokenMint: mint,
        buyerTokenAccount: buyerAta,
        presaleTokenAccount: presaleAta,
        presaleInfo: presaleInfo,
        presaleAuthority: admin.publicKey,
        presaleVault: presaleVault,
        buyer: buyer.publicKey,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .signers([buyer])
      .rpc();

    const buyerTokenBalance = await provider.connection.getTokenAccountBalance(buyerAta);
    assert.ok(buyerTokenBalance.value.uiAmount === 10);
  });

  it("Withdraws SOL", async () => {
    const withdrawAmount = new anchor.BN(0.5 * LAMPORTS_PER_SOL);

    const [presaleVaultPDA, vaultBump] = await PublicKey.findProgramAddress(
      [Buffer.from(PRESALE_VAULT)],
      program.programId
    );

    const initialAdminBalance = await provider.connection.getBalance(admin.publicKey);

    await program.methods
      .withdraw(withdrawAmount, { sol: {} }, vaultBump)
      .accounts({
        presaleInfo: presaleInfo,
        presaleVault: presaleVault,
        admin: admin.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([admin])
      .rpc();

    const finalAdminBalance = await provider.connection.getBalance(admin.publicKey);
    assert.approximately(finalAdminBalance - initialAdminBalance, withdrawAmount.toNumber(), 10000);
  });

  it("Withdraws tokens", async () => {
    const withdrawAmount = new anchor.BN(5 * LAMPORTS_PER_SOL);

    const [presalePDA, bump] = await PublicKey.findProgramAddress(
      [Buffer.from(PRESALE_SEED)],
      program.programId
    );

    const initialAdminTokenBalance = await provider.connection.getTokenAccountBalance(adminAta);
    if (!initialAdminTokenBalance.value.uiAmount) {
      throw new Error("Failed to get initial admin token balance");
    }

    await program.methods
      .withdraw(withdrawAmount, { token: {} }, bump)
      .accounts({
        presaleInfo: presaleInfo,
        presaleVault: presaleVault,
        tokenMint: mint,
        adminTokenAccount: adminAta,
        presaleTokenAccount: presaleAta,
        admin: admin.publicKey,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .signers([admin])
      .rpc();

    const finalAdminTokenBalance = await provider.connection.getTokenAccountBalance(adminAta);
    if (!finalAdminTokenBalance.value.uiAmount) {
      throw new Error("Failed to get final admin token balance");
    }

    assert.approximately(
      finalAdminTokenBalance.value.uiAmount - initialAdminTokenBalance.value.uiAmount,
      5,
      0.001
    );
  });
});

console.log("All tests completed successfully!");