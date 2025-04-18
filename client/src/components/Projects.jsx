import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";

function Projects() {
  const { t } = useTranslation();
  return (
    <div
      id="projects"
      className="flex items-center justify-start gap-[20px] flex-col w-full"
    >
      {/* title */}
      <div className="flex items-center justify-center flex-col relative">
        <Fade triggerOnce direction="up">
          <p className="text-[50px] font-bold">{t("projects.title")}</p>
        </Fade>
        <div className="absolute bottom-0 h-[3px] w-full bg-emerald-500 rounded-full shadow-[0_0_10px] shadow-emerald-500"></div>
      </div>
    </div>
  );
}

export default Projects;
