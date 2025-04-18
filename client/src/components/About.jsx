import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import animationData from "../assets/programming.json";
import { FaGithub, FaPhone, FaTelegram } from "react-icons/fa";
function About() {
  const { t } = useTranslation();
  return (
    <div
      id="about"
      className="flex items-center justify-start gap-[20px] flex-col w-full"
    >
      {/* title */}
      <div className="flex items-center justify-center flex-col relative">
        <Fade triggerOnce direction="up">
          <p className="text-[50px] font-bold">{t("about.title")}</p>
        </Fade>
        <div className="absolute bottom-0 h-[3px] w-full bg-emerald-500 rounded-full shadow-[0_0_10px] shadow-emerald-500"></div>
      </div>
      {/* about */}
      <div className="flex items-center justify-center gap-[20px] flex-col md:flex-row w-full p-[20px] bg-zinc-800/20">
        <div className="flex items-center justify-center w-[90%] md:w-[40%]">
          <Lottie animationData={animationData} loop={true} />
        </div>
        <div className="flex w-full p-[10px] md:w-[60%] lg:w-[40%] justify-start flex-col items-start gap-[10px]">
          <p className="text-emerald-400 text-[20px] sm:text-[35px] font-semibold">
            {t("about.text")}
          </p>
          <p className="text-[14px]">{t("about.text2")}</p>
          <div className="flex items-center justify-center gap-[10px]">
            <button
              onClick={() => window.open("https://github.com/SaidislomUrinov")}
              className="outlined !p-0 w-[45px]"
            >
              <FaGithub fontSize={20} />
            </button>
            <button
              onClick={() => window.open("https://t.me/Saidweb")}
              className="outlined !p-0 w-[45px]"
            >
              <FaTelegram fontSize={20} />
            </button>
            <button
              onClick={() => window.open("tel:+998931042255")}
              className="outlined !p-0 w-[45px]"
            >
              <FaPhone fontSize={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
