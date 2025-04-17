import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import { BiCheck, BiGlobe, BiMenu, BiX } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { t, i18n } = useTranslation();
  const nv = useNavigate();
  const [open, setOpen] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    setOpenLang(false);
  };
  return (
    <>
      <Fade triggerOnce direction="down">
        <div className="w-full h-[70px]">
          <div className="flex z-[3] fixed top-0 left-0 items-center px-[2%] justify-between w-full h-[70px] bg-zinc-900/50 backdrop-blur-lg border-b border-zinc-700">
            {/*  */}
            <div className="flex items-center justify-start lg:w-[33%]">
              <Link to={"#"} className="text-[30px] font-bold">
                SAIDNET
              </Link>
            </div>
            {/*  */}
            <div className="md:flex hidden items-center justify-center gap-[50px]">
              <Link
                to={"#about"}
                className="text-[16px] lg:text-[20px] text-gray-300 hover:text-white"
              >
                {t("nav.about")}
              </Link>
              <Link
                to={"#skills"}
                className="text-[16px] lg:text-[20px] text-gray-300 hover:text-white"
              >
                {t("nav.skills")}
              </Link>
              <Link
                to={"#projects"}
                className="text-[16px] lg:text-[20px] text-gray-300 hover:text-white"
              >
                {t("nav.projects")}
              </Link>
              <Link
                to={"#contact"}
                className="text-[16px] lg:text-[20px] text-gray-300 hover:text-white"
              >
                {t("nav.contact")}
              </Link>
            </div>
            {/*  */}
            <div className="flex items-center justify-end lg:w-[33%] gap-[30px]">
              <button
                className="outlined !w-[45px] !p-[0]"
                onClick={() => setOpenLang(!openLang)}
              >
                <BiGlobe fontSize={20} />
              </button>
              {/*  */}
              <button
                onClick={() => nv("#request")}
                className="outlined !hidden md:!flex"
              >
                {t("nav.request")}
                <FaArrowRight />
              </button>
              {/*  */}
              <button
                className="outlined !w-[45px] !p-[0] md:!hidden"
                onClick={() => setOpen(!open)}
              >
                {!open ? <BiMenu fontSize={20} /> : <BiX fontSize={20} />}
              </button>
            </div>
          </div>
        </div>
      </Fade>
      <div
        className={`flex items-start justify-start flex-col rounded-b-[10px] px-[20px] gap-[20px] w-[200px] fixed right-[2%] lg:right-[155px] ${
          openLang ? "h-[215px] py-[20px] border-b border-x" : "h-0 border-none"
        } duration-300 bg-zinc-800/50 overflow-hidden backdrop-blur-lg border-zinc-700 z-[2]`}
      >
        <button
          onClick={() => changeLang("uz")}
          className="outlined w-full min-h-[45px]"
          disabled={t("lang") === "uz"}
        >
          {t("lang") === "uz" ? <BiCheck /> : ""}
          O'zbekcha
        </button>
        <button
          onClick={() => changeLang("en")}
          className="outlined w-full min-h-[45px]"
          disabled={t("lang") === "en"}
        >
          {t("lang") === "en" ? <BiCheck /> : ""}
          English
        </button>
        <button
          onClick={() => changeLang("ru")}
          className="outlined w-full min-h-[45px]"
          disabled={t("lang") === "ru"}
        >
          {t("lang") === "ru" ? <BiCheck /> : ""}
          Русский
        </button>
      </div>
      <div
        className={`flex items-start lg:hidden justify-start flex-col px-[20px] gap-[20px] w-full fixed left-0 ${
          open ? "h-[294px] py-[20px] border-b" : "h-0 border-none"
        } duration-300 bg-zinc-900/50 overflow-hidden backdrop-blur-lg border-zinc-700 z-[2]`}
      >
        <Link
          to={"#about"}
          className="text-[20px] text-gray-300 hover:text-white"
          onClick={() => setOpen(false)}
        >
          {t("nav.about")}
        </Link>
        <Link
          to={"#skills"}
          className="text-[20px] text-gray-300 hover:text-white"
          onClick={() => setOpen(false)}
        >
          {t("nav.skills")}
        </Link>
        <Link
          to={"#projects"}
          className="text-[20px] text-gray-300 hover:text-white"
          onClick={() => setOpen(false)}
        >
          {t("nav.projects")}
        </Link>
        <Link
          to={"#contact"}
          className="text-[20px] text-gray-300 hover:text-white"
          onClick={() => setOpen(false)}
        >
          {t("nav.contact")}
        </Link>
        <button
          onClick={() => {
            nv("#request");
            setOpen(false);
          }}
          className="outlined mt-2"
        >
          {t("nav.request")}
          <FaArrowRight />
        </button>
      </div>
    </>
  );
}

export default Navbar;
