"use client"
import Image from "next/image"
const Card = ({url,title,carouselWidth}) => {
    return (
        <div className="relative w-full h-auto ">
            <Image src={`/${url}`} width={1500} height={1500} alt="" className="-z-50 rounded-lg" />
        </div>

    );
};

export default Card;