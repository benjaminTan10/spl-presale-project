import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import Image from 'next/image'

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../../styles/roadmap";
import { roadmap } from "../../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: 'linear-gradient(120deg, #fdfbfb 0%, #e3f7b2 100%)',
        color: "#111111",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex items-center justify-center w-full h-full">
          <Image
            src={experience.icon}
            alt={experience.phase}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-cB text-[24px] font-bold">{experience.title}</h3>
        <p
          className="text-cB text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.phase}
        </p>
      </div>

      <ul className="mt-5 ml-5 space-y-2 list-disc">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-cB text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <div className="w-full mt-0 bg-gradient-to-r from-green-400 to-yellow-400">
      <div className="mx-auto">
        {/* <div className="w-full mt-0 bg-gradient-to-r from-green-400 to-lime-500"> */}
        <motion.div variants={textVariant()}>
          {/* <p className={styles.sectionSubText}> Fort Knox, but for Bananas</p> */}
          <h2 className={styles.sectionHeadText}>Roadmap</h2>
        </motion.div>

        <div className="flex flex-col mt-2 " id='roadmap-section'>
          <VerticalTimeline>
            {roadmap.map((roadmapStep, index) => (
              <ExperienceCard key={index} experience={roadmapStep} />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </div>
  );
};

export default Experience;
// export default SectionWrapper(Experience, "work");
