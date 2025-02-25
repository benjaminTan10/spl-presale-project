import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay , Pagination} from 'swiper/modules';

export default function App() {
    return (
        <div className='flex flex-col items-center '>
            <div className='flex:2'>
                <Swiper
                    navigation={false}
                    modules={[Navigation , Autoplay, Pagination]}
                    className="mySwiper flex:1 "
                    slidesPerView={1}
                    spaceBetween={4}
                    pagination={{
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<span class="' + className + '">' + (index + 1) + '</span>';
                        },
                    }}
                    loop={true}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    speed={1000}
                >
                    <SwiperSlide>
                        <div className="relative p-2 my-5 rounded-lg w-30">
                            <Image
                                src="/monkey/anouncement_panel.webp"
                                alt="Panel Background"
                                width={600}
                                height={300}
                                className="rounded-lg"
                            />
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                                <h1 className="md:mx-6 text-[2.5rem] xl:text-[3rem] lg:text-[2rem] md:text-[1.5rem] font-bold text-center bg-gradient-to-r from-[#5fbd39] to-[#8c47a1] bg-clip-text text-transparent animate-gradient-text animate-pulse">
                                    Presale round 1 started
                                </h1>
                                <p className="mx-20 mt-4 text-[2rem] text-center text-black xl:text-[1.25rem] md:text-[0.75rem] lg:text-[1rem]">
                                    🌍Build something meaningful together.🌍
                                </p>
                                <p className="mx-20 mt-4 text-[2rem] text-center text-black xl:text-[1.25rem] md:text-[0.75rem] lg:text-[1rem]">
                                    {/* Additional content here */}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative p-2 my-5 rounded-lg w-30">
                            <Image
                                src="/monkey/anouncement_panel.webp"
                                alt="Panel Background"
                                width={600}
                                height={300}
                                className="rounded-lg"
                            />
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                                <h1 className="text-[2.5rem] xl:text-[2rem] lg:text-[1.5rem] md:text-[1rem] font-bold text-center text-[#2c6317]">
                                    🏡Win a Property in Alabama!🚜
                                </h1>
                                <p className="mx-20 mt-4 text-[1.5rem] text-center text-black xl:text-[1.25rem] md:text-[0.75rem] lg:text-[1rem]">
                                    Win property in Russell County, Alabama, USA.
                                </p>
                                <p className="text-lg xl:text-base lg:text-sm md:text-xs mt-2 text-left text-[#2c6317]">
                                    🪙 1,000,000 TMONK = 25 tickets 🎫🎫🎫
                                </p>
                                <p className="text-lg xl:text-base lg:text-sm md:text-xs mt-2 text-left text-[#2c6317]">
                                    🪙 500,000 TMONK = 10 tickets 🎫🎫
                                </p>
                                <div className="text-lg xl:text-base lg:text-sm md:text-xs mt-2 text-left text-[#2c6317]">
                                    🪙 100,000 TMONK = 1 ticket 🎫
                                </div>
                                <button className="px-2 mt-4 text-white bg-blue-500 rounded-lg md:py-1 xl:text-xl lg:text-lg md:text-sm sm:text-xs">
                                    Participate ( Coming soon! )
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative p-2 my-5 rounded-lg w-30">
                            <Image
                                src="/monkey/anouncement_panel.webp"
                                alt="Panel Background"
                                width={600}
                                height={300}
                                className="rounded-lg"
                            />
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                                <h1 className="text-[2.5rem] xl:text-[2rem] lg:text-[1.5rem] md:text-[1rem] font-bold text-center text-[#2c6317]">
                                    Meme Creation Contest Announcement
                                </h1>
                                <p className="text-lg xl:text-base lg:text-sm md:text-xs mt-2 px-6 text-center text-[#2c6317]">
                                    Participate in the #TMONKMemeChallenge and win $TMONK tokens.
                                </p>
                                <p className="mx-20 mt-4 text-xl text-black xl:text-lg lg:text-base">
                                    You could walk away with rewards
                                </p>
                                <button className="px-2 mt-4 text-white bg-blue-500 rounded-lg md:py-1 xl:text-xl lg:text-lg md:text-sm sm:text-xs">
                                    Participate ( Coming soon! )
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

            </div>
            <Swiper
                navigation={false}
                modules={[Navigation, Autoplay ]}
                className="mySwiper flex:1 "
                slidesPerView={1.5}
                spaceBetween={4}
                autoplay={{
                    delay: 1800,
                    disableOnInteraction: false,
                }}  
                loop={true}
            >

                <SwiperSlide>
                    <div className="relative w-full rounded-lg ">
                        <Image
                            src="/monkey/anouncement_card.webp"
                            alt="Panel Background"
                            width={600}
                            height={300}
                            className="rounded-lg"
                        />
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                            <p className="text-[1.5rem] xl:text-[1.25rem] md:text-sm lg:text-lg mt-4 text-[#831d61]">
                                Why should you enter?
                            </p>
                            <p className="text-lg xl:text-base lg:text-sm md:text-xs mt-4 text-[#2c6317]">
                                Not just having fun creating memes
                            </p>
                            <p className="text-lg xl:text-base lg:text-sm md:text-xs mt-2 text-[#2c6317]">
                                Also be part of a real-world mission.
                            </p>
                            <p className="mt-2 text-lg text-black xl:text-base lg:text-sm md:text-xs">
                                Reduce carbon emissions
                            </p>
                            <p className="hidden mt-2 text-lg text-black xl:text-base lg:text-sm md:text-xs md:block">
                                Make positive change.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full rounded-lg ">
                        <Image
                            src="/monkey/anouncement_card.webp"
                            alt="Panel Background"
                            width={600}
                            height={300}
                            className="rounded-lg -inset-3"
                        />
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                            <p className="text-[1.5rem] xl:text-[1.25rem] md:text-sm lg:text-lg mt-4 text-[#831d61]">
                                Winning Rewards?
                            </p>
                            <p className="text-lg xl:text-base lg:text-sm md:text-xs mt-4 text-[#2c6317]">
                                Earn $TMONK Tokens
                            </p>
                            <p className="text-lg xl:text-base lg:text-sm md:text-xs mt-2 text-[#2c6317]">
                                Boost Social Media Presence
                            </p>
                            <p className="mt-2 text-lg text-black xl:text-base lg:text-sm md:text-xs">
                                Grow Your Network
                            </p>
                            <p className="hidden mt-2 text-lg text-black xl:text-base lg:text-sm md:text-xs md:block">
                                Have Fun
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full rounded-lg ">
                        <Image
                            src="/monkey/anouncement_card.webp"
                            alt="Panel Background"
                            width={600}
                            height={300}
                            className="rounded-lg -inset-3"
                        />
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                            <p className="text-[1.5rem] xl:text-[1.25rem] md:text-sm lg:text-lg mt-4 text-[#831d61]">
                                Pro Tips?
                            </p>
                            <p className="text-lg xl:text-base lg:text-sm md:text-xs mt-4 text-[#2c6317]">
                                Resonates with people
                            </p>
                            <p className="text-lg xl:text-base lg:text-sm md:text-xs mt-2 text-[#2c6317]">
                                Engagement boost.
                            </p>
                            <p className="mt-2 text-lg text-black xl:text-base lg:text-sm md:text-xs">
                                Hashtags #SaveThePlanet
                            </p>
                            <p className="hidden mt-2 text-lg text-black xl:text-base lg:text-sm md:text-xs md:block">
                                Join the community and have fun.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full rounded-lg ">
                        <Image
                            src="/monkey/anouncement_card.webp"
                            alt="Panel Background"
                            width={600}
                            height={300}
                            className="rounded-lg -inset-3"
                        />
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                            <p className="text-[1.5rem] xl:text-[1.25rem] md:text-sm lg:text-lg mt-4 text-[#831d61]">
                                Is it Secure?
                            </p>
                            <p className="text-lg xl:text-base lg:text-sm md:text-xs mt-4 text-[#2c6317]">
                                Liquidity Lockup
                            </p>
                            <p className="text-lg xl:text-base lg:text-sm md:text-xs mt-2 text-[#2c6317]">
                                Smart Contract Audits
                            </p>
                            <p className="mt-2 text-lg text-black xl:text-base lg:text-sm md:text-xs">
                                Multi-Sig Wallets
                            </p>
                            <p className="hidden mt-2 text-lg text-black xl:text-base lg:text-sm md:text-xs md:block">
                                Anti-Rug Pull Measures.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full rounded-lg ">
                        <Image
                            src="/monkey/anouncement_card.webp"
                            alt="Panel Background"
                            width={600}
                            height={300}
                            className="rounded-lg -inset-3"
                        />
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                            <p className="text-[1.5rem] xl:text-[1.25rem] md:text-sm lg:text-lg mt-4 text-[#831d61]">
                                TOKEN USE CASES?
                            </p>
                            <p className="text-lg xl:text-base lg:text-sm md:text-xs mt-4 text-[#2c6317]">
                                Primary currency in $TMONK marketplace
                            </p>
                            <p className="text-lg xl:text-base lg:text-sm md:text-xs mt-2 text-[#2c6317]">
                                Governance Rights
                            </p>
                            <p className="mt-2 text-lg text-black xl:text-base lg:text-sm md:text-xs">
                                Staking and Rewards
                            </p>
                            <p className="mt-2 text-lg text-black xl:text-base lg:text-sm md:text-xs">
                                Access to Premium Features.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
