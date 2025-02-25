import React,{useRef,useState,useEffect} from "react";
import Card from "./card";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const CarouselImage = () => {
    const carousel = useRef(null);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [carouselWidth,setCarouselWidth] = useState("100%");

    const handleChange = (curIndex) => {
        setCurrentIndex(curIndex);
    };

    const handleIndicatorClick = (targetIndex) => {
        if(carousel) {
            carousel.current?.moveTo(targetIndex);
        }
    };

    const data = [
        {url: "monkey/1.webp",title: "Transforming Our Trading"},
        {url: "monkey/2.webp",title: "Transforming Our Trading"},
        {url: "monkey/3.webp",title: "Transforming Our Trading"},
    ];

    const handleJoinCommunity = (event) => {
        event.stopPropagation();
        window.open('https://discord.com/invite/cpjsEXcKvU',"_blank");
    };

    return (
        <>
            <div className="relative xl:top-96 lg:top-80 md:top-56 sm:top-52 xs:top-32">
                <div className="absolute flex flex-col items-start px-10 font-bold text-gray-200 xs:left-0 left-5 translate-y-[25%] lg:translate-y-20 xl:translate-y-10 sm:translate-y-1/4 xs:translate-y-1/4 text-9xl xl:text-7xl lg:text-5xl md:text-4xl sm:text-3xl xs:text-lg text-shadow-md">
                    <div className=" font-roboto">For Clean planet!</div>
                    <div className="hidden text-xs md:flex">  <br /></div>
                    <div className="hidden text-xs lg:flex">  <br /></div>
                    <button style={{transition: 'background-color 0.3s'}}
                        onClick={handleJoinCommunity}
                        className="relative px-4 py-2 mt-4 font-semibold text-white transition-transform transform -translate-y-1/2 rounded-lg left-5 xs:left-0 xs:py-1 bottom-full text-7xl xl:text-5xl lg:text-3xl md:text-xl sm:text-lg xs:text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 md:mt-8 lg:mt-6 xl:mt-4 hover:shadow-xl hover:z-10 hover:shadow-blue-500/50"
                    >
                        Join our community!
                    </button>
                </div>
            </div>
            <div className="relative overflow-hidden -z-10 t-1 zw-full">
                <Carousel
                    axis="horizontal"
                    width="100%"
                    interval={3000}
                    autoPlay={true}
                    infiniteLoop={true} // This property may be available in some libraries
                    showStatus={false}
                    showArrows={true}
                    ref={carousel}
                    showIndicators={false}
                    showThumbs={false}
                    onChange={handleChange}
                >
                    {data.map((item,index) => (
                        <Card key={index} title={item.title} url={item.url} carouselWidth={carouselWidth} />
                    ))}
                </Carousel>

                <div className="flex flex-row items-start justify-center gap-3 -translate-y-4 -z-30">
                    {[0,1,2].map((item) => (
                        <div
                            key={item}
                            className={`h-1 w-4 cursor-pointer rounded-md ${currentIndex === item ? "bg-[#ceff5b]" : "bg-[#58780d]"}`}
                            onClick={() => handleIndicatorClick(item)}
                        ></div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CarouselImage;
