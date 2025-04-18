import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaPhone } from "react-icons/fa";

function Intro() {
  const { t } = useTranslation();
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const nv = useNavigate();
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
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
      id="intro"
      className="relative flex items-center justify-center gap-1 flex-col w-full h-[calc(100vh-70px)]"
    >
      <div
        ref={vantaRef}
        className="absolute z-[0] inset-0 bg-[#18181b]/50 w-full h-full opacity-30"
      />

      <div className="z-1 flex flex-col items-center justify-center text-center">
        <Fade triggerOnce direction="up" cascade>
          <p className="text-[14px] border rounded-[20px] p-[5px_10px] border-zinc-600">
            {t("intro.stack")}
          </p>
          <p className="text-[60px] my-[0] sm:my-[-20px] md:my-[-40px] sm:text-[100px] md:text-[180px] font-bold relative flex items-center justify-center">
            {t("intro.title")}
          </p>
          <p className="text-[16px] px-[20px] sm:text-[20px]">
            {t("intro.text.t1")}{" "}
            <span className="text-emerald-400">{t("intro.text.t2")}</span>
          </p>
          <div className="flex flex-wrap mt-[20px] items-center justify-center gap-[10px]">
            <button onClick={() => window.open("tel:+998931042255")}>
              {t("intro.call")}
              <FaPhone className="rotate-90" />
            </button>
            <button className="outlined" onClick={() => nv("#request")}>
              {t("intro.request")}
              <FaArrowRight />
            </button>
          </div>
        </Fade>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <Fade triggerOnce direction="up" delay={1700}>
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-[40px] bg-emerald-500 shadow-[0_0_5px_#10b981]" />

            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-bounce" />
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default Intro;
