import { useLocation } from "react-router-dom";
import Intro from "../components/Intro";
import Skills from "../components/Skills";
import About from "../components/About";
import { useEffect } from "react";
import Projects from "../components/Projects";

function Home() {
  const h = useLocation().hash;
  useEffect(() => {
    try {
      window.scrollTo({
        top: !h ? 0 : document.querySelector(h).offsetTop - 70,
        behavior: "smooth",
      });
    } catch {}
  }, [h]);
  return (
    <>
      <Intro />
      <About />
      <Skills />
      <Projects />
    </>
  );
}

export default Home;
