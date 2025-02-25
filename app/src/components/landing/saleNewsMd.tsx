import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

export default function App() {
    return (
        <div className='flex flex-col items-center'>
            <div className='flex justify-center flex-1 w-full'>
                <Swiper
                    navigation={false}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper"
                    slidesPerView={1}
                    spaceBetween={10}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    style={{ width: '375px', height: '200px' }} // Set the width of the Swiper
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 1,
                            spaceBetween: 40,
                        },
                    }}
                >
                    <SwiperSlide>
                        <div className="relative w-full p-2 my-5 rounded-lg">
                            <div className="relative w-full h-36"> {/* Reduced height for images (70% of h-52) */}
                                <Image
                                    src="/monkey/anouncement_panel.webp"
                                    alt="Panel Background"
                                    width={238} // 70% of 340
                                    height={210} // 70% of 300
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute z-10 flex flex-col items-center justify-center text-white inset-3">
                                <h1 className="text-lg xl:text-md lg:text-sm md:text-xs font-bold text-center text-[#2c6317]">Meme Creation Contest Announcement</h1>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs text-center text-[#2c6317]">Participate in the #TMONKMemeChallenge and win $TMONK tokens.</p>
                                <button className="px-2 mt-2 text-white bg-blue-500 rounded-lg md:py-1 xl:text-lg lg:text-sm md:text-xs sm:text-xs">
                                    Participate
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full p-2 my-5 rounded-lg">
                            <div className="relative w-full h-36"> {/* Reduced height for images (70% of h-52) */}
                                <Image
                                    src="/monkey/anouncement_panel.webp"
                                    alt="Panel Background"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                                <h1 className="text-lg xl:text-md lg:text-sm md:text-xs font-bold text-center text-[#2c6317]">Win a Property in Alabama!</h1>
                                <div className="text-sm xl:text-xs lg:text-xs md:text-xs text-left text-[#2c6317]">🪙 100,000 TMONK = 1 ticket 🎟</div>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs text-left text-[#2c6317]">🪙 500,000 TMONK = 10 tickets 🎟</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs text-left text-[#2c6317]">🪙 1,000,000 TMONK = 25 tickets 🎟</p>
                                <button className="px-2 mt-2 text-white bg-blue-500 rounded-lg md:py-1 xl:text-lg lg:text-sm md:text-xs sm:text-xs">
                                    Participate
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className='flex justify-center flex-1 w-full'>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    className="mySwiper"
                    slidesPerView={1.5}
                    spaceBetween={10}
                    autoplay={{
                        delay: 1300,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    style={{ width: '375px' }} // Set the width of the Swiper
                    breakpoints={{
                        640: {
                            slidesPerView: 1.5,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                    }}
                >
                    <SwiperSlide>
                        <div className="relative w-full rounded-lg">
                            <div className="relative w-full h-36"> {/* Reduced height for images */}
                                <Image
                                    src="/monkey/anouncement_card.webp"
                                    alt="Panel Background"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                                <p className="text-lg xl:text-base md:text-sm lg:text-base  text-[#831d61]">Why should you enter?</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]"> Having fun creating memes</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]">Be part of real-world mission.</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Reduce carbon emissions</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Make positive change.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full rounded-lg">
                            <div className="relative w-full h-36"> {/* Reduced height for images */}
                                <Image
                                    src="/monkey/anouncement_card.webp"
                                    alt="Panel Background"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                                <p className="text-lg xl:text-base md:text-sm lg:text-base  text-[#831d61]">Why should you enter?</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]"> Having fun creating memes</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]">Be part of real-world mission.</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Reduce carbon emissions</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Make positive change.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full rounded-lg">
                            <div className="relative w-full h-36"> {/* Reduced height for images */}
                                <Image
                                    src="/monkey/anouncement_card.webp"
                                    alt="Panel Background"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                                <p className="text-lg xl:text-base md:text-sm lg:text-base  text-[#831d61]">Why should you enter?</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]"> Having fun creating memes</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]">Be part of real-world mission.</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Reduce carbon emissions</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Make positive change.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full rounded-lg">
                            <div className="relative w-full h-36"> {/* Reduced height for images */}
                                <Image
                                    src="/monkey/anouncement_card.webp"
                                    alt="Panel Background"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                                <p className="text-lg xl:text-base md:text-sm lg:text-base  text-[#831d61]">Why should you enter?</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]"> Having fun creating memes</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]">Be part of real-world mission.</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Reduce carbon emissions</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Make positive change.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full rounded-lg">
                            <div className="relative w-full h-36"> {/* Reduced height for images */}
                                <Image
                                    src="/monkey/anouncement_card.webp"
                                    alt="Panel Background"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                                <p className="text-lg xl:text-base md:text-sm lg:text-base  text-[#831d61]">Why should you enter?</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]"> Having fun creating memes</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]">Be part of real-world mission.</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Reduce carbon emissions</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Make positive change.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full rounded-lg">
                            <div className="relative w-full h-36"> {/* Reduced height for images */}
                                <Image
                                    src="/monkey/anouncement_card.webp"
                                    alt="Panel Background"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                                <p className="text-lg xl:text-base md:text-sm lg:text-base  text-[#831d61]">Why should you enter?</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]"> Having fun creating memes</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]">Be part of real-world mission.</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Reduce carbon emissions</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Make positive change.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full rounded-lg">
                            <div className="relative w-full h-36"> {/* Reduced height for images */}
                                <Image
                                    src="/monkey/anouncement_card.webp"
                                    alt="Panel Background"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                                <p className="text-lg xl:text-base md:text-sm lg:text-base  text-[#831d61]">Why should you enter?</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]"> Having fun creating memes</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]">Be part of real-world mission.</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Reduce carbon emissions</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Make positive change.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full rounded-lg">
                            <div className="relative w-full h-36"> {/* Reduced height for images */}
                                <Image
                                    src="/monkey/anouncement_card.webp"
                                    alt="Panel Background"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                                <p className="text-lg xl:text-base md:text-sm lg:text-base  text-[#831d61]">Why should you enter?</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]"> Having fun creating memes</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]">Be part of real-world mission.</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Reduce carbon emissions</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Make positive change.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full rounded-lg">
                            <div className="relative w-full h-36"> {/* Reduced height for images */}
                                <Image
                                    src="/monkey/anouncement_card.webp"
                                    alt="Panel Background"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                                <p className="text-lg xl:text-base md:text-sm lg:text-base  text-[#831d61]">Why should you enter?</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]"> Having fun creating memes</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]">Be part of real-world mission.</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Reduce carbon emissions</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Make positive change.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full rounded-lg">
                            <div className="relative w-full h-36"> {/* Reduced height for images */}
                                <Image
                                    src="/monkey/anouncement_card.webp"
                                    alt="Panel Background"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                                <p className="text-lg xl:text-base md:text-sm lg:text-base  text-[#831d61]">Why should you enter?</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]"> Having fun creating memes</p>
                                <p className="text-sm xl:text-xs lg:text-xs md:text-xs  text-[#2c6317]">Be part of real-world mission.</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Reduce carbon emissions</p>
                                <p className="text-sm text-black xl:text-xs lg:text-xs md:text-xs">Make positive change.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}
