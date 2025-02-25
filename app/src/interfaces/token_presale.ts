
export type TokenPresale =
{
  "version": "0.1.0",
  "name": "token_presale",
  "instructions": [
    {
      "name": "createAndStartPresale",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "presaleIdentifier",
          "type": "u8"
        },
        {
          "name": "tokenMintAddress",
          "type": "publicKey"
        },
        {
          "name": "softcapAmount",
          "type": "u64"
        },
        {
          "name": "hardcapAmount",
          "type": "u64"
        },
        {
          "name": "maxTokenAmountPerAddress",
          "type": "u64"
        },
        {
          "name": "lamportPricePerToken",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "i64"
        },
        {
          "name": "endTime",
          "type": "i64"
        },
        {
          "name": "decimals",
          "type": "u8"
        }
      ]
    },
    {
      "name": "depositToken",
      "accounts": [
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "toAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buyAndClaimToken",
      "accounts": [
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "presaleVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "buyerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "withdrawType",
          "type": {
            "defined": "WithdrawType"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "PresaleInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "presaleIdentifier",
            "type": "u8"
          },
          {
            "name": "tokenMintAddress",
            "type": "publicKey"
          },
          {
            "name": "softcapAmount",
            "type": "u64"
          },
          {
            "name": "hardcapAmount",
            "type": "u64"
          },
          {
            "name": "depositTokenAmount",
            "type": "u64"
          },
          {
            "name": "soldTokenAmount",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "maxTokenAmountPerAddress",
            "type": "u64"
          },
          {
            "name": "lamportPricePerToken",
            "type": "u64"
          },
          {
            "name": "isLive",
            "type": "bool"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "isSoftCapped",
            "type": "bool"
          },
          {
            "name": "isHardCapped",
            "type": "bool"
          },
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "decimals",
            "type": "u8"
          },
          {
            "name": "decimalPerToken",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "BuyerAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "purchasedAmount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "WithdrawType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Sol"
          },
          {
            "name": "Token"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "PresaleNotInitialized",
      "msg": "Presale is not initialized"
    },
    {
      "code": 6001,
      "name": "InvalidDecimals",
      "msg": "Invalid decimals"
    },
    {
      "code": 6002,
      "name": "PresaleNotLive",
      "msg": "Presale is not live"
    },
    {
      "code": 6003,
      "name": "PresaleNotActive",
      "msg": "Presale is not active"
    },
    {
      "code": 6004,
      "name": "ExceedsMaxPerAddress",
      "msg": "Exceeds maximum tokens per address"
    },
    {
      "code": 6005,
      "name": "InsufficientTokens",
      "msg": "Insufficient tokens available"
    },
    {
      "code": 6006,
      "name": "Unauthorized",
      "msg": "Unauthorized access"
    },
    {
      "code": 6007,
      "name": "PresaleStillActive",
      "msg": "Presale is still active"
    },
    {
      "code": 6008,
      "name": "SoftcapNotReached",
      "msg": "Softcap not reached"
    },
    {
      "code": 6009,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds"
    },
    {
      "code": 6010,
      "name": "AlreadyInitialized",
      "msg": "Presale already initialized"
    },
    {
      "code": 6011,
      "name": "InvalidCapAmounts",
      "msg": "Invalid cap amounts"
    },
    {
      "code": 6012,
      "name": "InvalidTimeRange",
      "msg": "Invalid time range"
    },
    {
      "code": 6013,
      "name": "InvalidStartTime",
      "msg": "Invalid start time"
    },
    {
      "code": 6014,
      "name": "InvalidParameters",
      "msg": "Invalid parameters"
    },
    {
      "code": 6015,
      "name": "PresaleAlreadyStarted",
      "msg": "Presale already started"
    },
    {
      "code": 6016,
      "name": "ExceedsHardcap",
      "msg": "Exceeds hardcap"
    },
    {
      "code": 6017,
      "name": "Overflow",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6018,
      "name": "InvalidPresaleIdentifier",
      "msg": "Invalid presale identifier"
    }
  ]
}

export const IDL: TokenPresale =
{
  "version": "0.1.0",
  "name": "token_presale",
  "instructions": [
    {
      "name": "createAndStartPresale",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "presaleIdentifier",
          "type": "u8"
        },
        {
          "name": "tokenMintAddress",
          "type": "publicKey"
        },
        {
          "name": "softcapAmount",
          "type": "u64"
        },
        {
          "name": "hardcapAmount",
          "type": "u64"
        },
        {
          "name": "maxTokenAmountPerAddress",
          "type": "u64"
        },
        {
          "name": "lamportPricePerToken",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "i64"
        },
        {
          "name": "endTime",
          "type": "i64"
        },
        {
          "name": "decimals",
          "type": "u8"
        }
      ]
    },
    {
      "name": "depositToken",
      "accounts": [
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "toAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buyAndClaimToken",
      "accounts": [
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "presaleVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "buyerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "withdrawType",
          "type": {
            "defined": "WithdrawType"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "PresaleInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "presaleIdentifier",
            "type": "u8"
          },
          {
            "name": "tokenMintAddress",
            "type": "publicKey"
          },
          {
            "name": "softcapAmount",
            "type": "u64"
          },
          {
            "name": "hardcapAmount",
            "type": "u64"
          },
          {
            "name": "depositTokenAmount",
            "type": "u64"
          },
          {
            "name": "soldTokenAmount",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "maxTokenAmountPerAddress",
            "type": "u64"
          },
          {
            "name": "lamportPricePerToken",
            "type": "u64"
          },
          {
            "name": "isLive",
            "type": "bool"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "isSoftCapped",
            "type": "bool"
          },
          {
            "name": "isHardCapped",
            "type": "bool"
          },
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "decimals",
            "type": "u8"
          },
          {
            "name": "decimalPerToken",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "BuyerAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "purchasedAmount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "WithdrawType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Sol"
          },
          {
            "name": "Token"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "PresaleNotInitialized",
      "msg": "Presale is not initialized"
    },
    {
      "code": 6001,
      "name": "InvalidDecimals",
      "msg": "Invalid decimals"
    },
    {
      "code": 6002,
      "name": "PresaleNotLive",
      "msg": "Presale is not live"
    },
    {
      "code": 6003,
      "name": "PresaleNotActive",
      "msg": "Presale is not active"
    },
    {
      "code": 6004,
      "name": "ExceedsMaxPerAddress",
      "msg": "Exceeds maximum tokens per address"
    },
    {
      "code": 6005,
      "name": "InsufficientTokens",
      "msg": "Insufficient tokens available"
    },
    {
      "code": 6006,
      "name": "Unauthorized",
      "msg": "Unauthorized access"
    },
    {
      "code": 6007,
      "name": "PresaleStillActive",
      "msg": "Presale is still active"
    },
    {
      "code": 6008,
      "name": "SoftcapNotReached",
      "msg": "Softcap not reached"
    },
    {
      "code": 6009,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds"
    },
    {
      "code": 6010,
      "name": "AlreadyInitialized",
      "msg": "Presale already initialized"
    },
    {
      "code": 6011,
      "name": "InvalidCapAmounts",
      "msg": "Invalid cap amounts"
    },
    {
      "code": 6012,
      "name": "InvalidTimeRange",
      "msg": "Invalid time range"
    },
    {
      "code": 6013,
      "name": "InvalidStartTime",
      "msg": "Invalid start time"
    },
    {
      "code": 6014,
      "name": "InvalidParameters",
      "msg": "Invalid parameters"
    },
    {
      "code": 6015,
      "name": "PresaleAlreadyStarted",
      "msg": "Presale already started"
    },
    {
      "code": 6016,
      "name": "ExceedsHardcap",
      "msg": "Exceeds hardcap"
    },
    {
      "code": 6017,
      "name": "Overflow",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6018,
      "name": "InvalidPresaleIdentifier",
      "msg": "Invalid presale identifier"
    }
  ]
}