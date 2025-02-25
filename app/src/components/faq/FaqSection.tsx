import React, { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import FaqData from "./FaqData";
import AnimatedOnViewTitle from "../animated/AnimatedOnViewTitleLg";
import { BiCaretUp, BiCaretDown } from "react-icons/bi";

const Faqs = (props) => {
    const [answerIsShown, setAnswerIsShown] = useState(false);

    function toggleAnswerIsShown() {
        setAnswerIsShown(prevAnswerIsShow => !prevAnswerIsShow);
    }
    return (

        <details key={props.id} className="bg-white rounded-[18px] border-[#01a52c] border-[3px] border-opacity-30 py-[24px] sm:py-[34px] md:py-[42px] px-[24px] sm:px-[32px] md:px-[38px]">
            <summary className="outline-none hover:cursor-pointer text-[18px] sm:text-[20px] md:text-[22px] font-medium text-[#01a52c] ">
                {props.question}</summary>
            <div className="text-[14px] sm:text-[16px] md:text-[18px] text-cB mt-[10px]">
                <p>{props.answer}</p>
            </div>
        </details>
    );
}
const FaqSection = () => {
    const faqElements = FaqData.map(
        faq => {
            return (
                <Faqs key={faq.id} question={faq.question} answer={faq.answer} />
            )
        }
    )
    return (
        <div className="w-full  bg-white mt-[10px] 2xl:px-[145px] xl:px-[120px] lg:px-[80px] md:px-[40px] sm:px-[10px]" id="faq_id">
            <section className="container bg-[#0D6EFD] bg-opacity-5 2xl:px-[117px] rounded-[14px]">
                <div className="container flex flex-col justify-center w-full p-4 mx-auto md:p-8">
                    <h2 className=" mb-12 font-bold leading-none text-center text-[28px] sm:text-[36px] md:text-[48px] text-cB">Frequently Asked Questions</h2>
                    <div className="flex flex-col gap-4">
                        {faqElements}
                    </div>
                </div>
            </section>
        </div>
    );
}
export default FaqSection;



