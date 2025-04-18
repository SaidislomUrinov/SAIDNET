import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import css from "../assets/css.svg";
import scss from "../assets/scss.svg";
import bootstrap from "../assets/bootstrap.svg";
import tailwind from "../assets/tailwind.svg";
import js from "../assets/javascript.svg";
import ts from "../assets/typescript.svg";
import react from "../assets/react.svg";
import next from "../assets/next.svg";
import node from "../assets/nodejs.svg";
import express from "../assets/express.svg";
import mongo from "../assets/mongodb.svg";
import git from "../assets/git.svg";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import RINGS from "vanta/dist/vanta.rings.min";

const skills = [
  { name: "CSS", image: css },
  { name: "SCSS", image: scss },
  { name: "Bootstrap", image: bootstrap },
  { name: "Tailwind", image: tailwind },
  { name: "JavaScript", image: js },
  { name: "TypeScript", image: ts },
  { name: "React", image: react },
  { name: "NextJS", image: next },
  { name: "NodeJS", image: node },
  { name: "ExpressJS", image: express },
  { name: "MongoDB", image: mongo },
  { name: "Git", image: git },
];
function Skills() {
  const { t } = useTranslation();
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        RINGS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: "#10b981",
          backgroundColor: "#18181b",
          // showDots: false,
          THREE,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div
      id="skills"
      className="flex relative items-center justify-start gap-[20px] flex-col w-full min-h-[calc(100vh-70px)]"
    >
      <div
        ref={vantaRef}
        className="absolute z-[-1] inset-0 bg-[#18181b]/50 w-full h-full opacity-30"
      />
      {/* title */}
      <div className="flex items-center justify-center flex-col relative">
        <Fade triggerOnce direction="up">
          <p className="text-[50px] font-bold">{t("skills.title")}</p>
        </Fade>
        <div className="absolute bottom-0 h-[3px] w-full bg-emerald-500 rounded-full shadow-[0_0_10px] shadow-emerald-500"></div>
      </div>
      {/* mapping */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[10px]">
        {skills.map((s, i) => {
          return (
            <Fade triggerOnce key={i} direction="up" delay={i * 100}>
              <div className="flex gap-[10px] items-center justify-center flex-col w-[170px] sm:w-[200px] rounded-[20px] p-[20px] border border-zinc-500 hover:border-emerald-500 duration-300 group hover:shadow-[0_5px_10px] shadow-emerald-500/10">
                <div className="flex items-center justify-center w-full aspect-square overflow-hidden rounded-[20px] p-[10px] ">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="group-hover:scale-[1.1] duration-300"
                  />
                </div>
                {/*  */}
                <p className="text-[20px] group-hover:text-emerald-500 duration-300">
                  {s.name}
                </p>
                {/*  */}
              </div>
            </Fade>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
