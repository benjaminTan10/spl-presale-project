import React from 'react'
import WalletMultiButtonDynamic from './WalletMultiButtonDynamic'
import AnimatedOnViewTitleMd from '../animated/AnimatedOnViewTitleMd'

export default function ConnectWalletCard() {
    return (
        <div className='max-w-[1240px] mx-auto px-4 py-16 items-center flex flex-col bg-gray-200'>
            <div className=' py-2 px-3 md:p-3 md:px-5  items-center flex flex-col rounded-3xl ' >
                <div className='w-[80vw]  sm:w-[500px] md:w-[600px] lg:w-[900px] items-center flex-col  p-4 my-2 al mx-auto rounded-2xl transition-colors duration-300 justify-center text-center'>
                    <AnimatedOnViewTitleMd text={"Connect Wallet"} className={"mx-auto self-center  justify-center flex text-center"} />
                    <div className='flex h-30 py-auto px-3 md:px-5 align-end mt-7 mb-3'>
                        <div className={"mx-auto mb-4"}>
                            <div className='mr-[-20px]' >
                                <WalletMultiButtonDynamic />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
