export const authorFilter = (authorBase58PublicKey) => ({
    memcmp: {
        offset: 8, // Discriminator.
        bytes: authorBase58PublicKey,
    },
})
