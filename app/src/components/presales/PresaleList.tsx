import PresaleItem from './PresaleItem'


const PresaleList = ({ presales }) => {

    return (
        <ul className={"flex flex-wrap max-w-[1240px] mx-auto px-4 py-2 items-center"}>
            {presales.map((presale) => (
                <PresaleItem
                    key={presale.account.identifier}
                    presaleIdentifier={presale.account.identifier}
                    {...presale.account}
                    publicKey={presale.publicKey.toBase58()}
                    tokenAddress={presale.account.tokenMintAddress.toBase58()}
                    amountOfTokens={presale.account.tokenAmount.toNumber()}
                    maxTokensPerWallet={presale.account.maxTokenAmountPerAddress.toNumber()}
                    price={presale.account.pricePerToken.toNumber()}
                />
            ))}
        </ul>
    )
}

export default PresaleList
