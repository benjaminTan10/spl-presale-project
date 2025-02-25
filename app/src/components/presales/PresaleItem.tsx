import React from 'react'
import AnimatedButton from '../animated/AnimatedButton'
import AnimatedOnViewTitleMd from '../animated/AnimatedOnViewTitleMd'

const PresaleItem = ({ presaleIdentifier, tokenAddress, amountOfTokens, maxTokensPerWallet, price}) => {

    return (
        <div className='max-w-[1240px] mx-auto px-4 py-10 items-center flex flex-col'>
        <div className='flex flex-col items-center px-3 py-2 md:p-3 md:px-5 rounded-3xl bg-cB' >
            <div className='w-[80vw]  sm:w-[300px] md:w-[300px] lg:w-[400px] items-center flex-col bg-cA p-4 my-2 al mx-auto rounded-2xl transition-colors duration-300 justify-center'>
                <AnimatedOnViewTitleMd text={`Presale ${presaleIdentifier}`} className={"mx-auto self-center text-cB justify-center flex" }/>
                <div className={"w-full"}>
                        <h1 className={"text-cB text-3xl py-auto pt-3 self-center font-medium " }>Presale Token Address:</h1>
                        <h1 onClick={()=> window.open(`https://solscan.io/account/${tokenAddress}`, "_blank")} 
                            className={" h-10 flex w-[60%] px-1 py-1.5  focus:outline-cB text-cC text-2xl font-medium cursor-pointer "}>{`${tokenAddress.substr(0,3)}...${tokenAddress.substr(-3,3)}`}</h1>
                        <h1 className={"text-cB text-3xl py-auto pt-3 self-center font-medium" }>Amount of Tokens:</h1>
                        <h1 className={" h-10 flex w-[60%] px-1 py-1.5 focus:outline-cB text-cC text-2xl font-medium"}>{amountOfTokens}</h1>
                        <h1 className={"text-cB text-3xl py-auto pt-3 self-center font-medium" }>Max Tokens Per Wallet:</h1>
                        <h1 className={" h-10 flex w-[60%] px-1 py-1.5 focus:outline-cB text-cC text-2xl font-medium" }>{maxTokensPerWallet}</h1>
                        <h1 className={"text-cB text-3xl py-auto pt-3 self-center font-medium" }>Price:</h1>
                        <h1 className={" h-10 flex w-[60%] px-1 py-1.5 focus:outline-cB text-cC text-2xl font-medium"}>{price}</h1>
                    <div className='flex px-3 mb-3 h-30 py-auto md:px-5 align-end mt-7'>
                        <AnimatedButton type="submit" text={'Buy'} className={"mx-auto"}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default PresaleItem
