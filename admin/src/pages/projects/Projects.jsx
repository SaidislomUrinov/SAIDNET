import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../utils/fetching";
import { Button, Spinner } from "@material-tailwind/react";
import { FaSadTear } from "react-icons/fa";
import Add from "./Add";
import List from "./List";
import EditInfo from "./EditInfo";
import EditImage from "./EditImage";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [load, setLoad] = useState(false);
  const nv = useNavigate();
  useEffect(() => {
    get("/project/list")
      .then((res) => {
        const { ok, data } = res;
        if (ok) {
          setProjects(data);
        }
      })
      .finally(() => {
        setLoad(true);
      });

    get("/catalog/list").then((res) => {
      const { ok, data } = res;
      if (ok) {
        setCatalogs(data);
      }
    });
  }, []);
  return (
    <div className="flex gap-[10px] items-start justify-start flex-col w-full">
      {!load && (
        <div className="w-full flex-col h-[50vh] gap-2 flex items-center justify-center">
          <Spinner color="green" className="w-[40px] h-[40px]" />
          <p className="text-[12px] text-zinc-700">Fetching projects...</p>
        </div>
      )}
      {load && !projects[0] && (
        <div className="w-full flex-col h-[50vh] gap-2 flex items-center justify-center">
          <FaSadTear className="text-[80px] text-orange-600" />
          <p className="text-[12px] text-zinc-700">Projects not found</p>
          <Button onClick={() => nv("#add")} color="green">
            Add new project
          </Button>
        </div>
      )}
      {load && projects[0] && (
        <>
          <Button onClick={() => nv("#add")} color="green">
            Add new catalog
          </Button>
          <List projects={projects} />
        </>
      )}
      {/*  */}
      <Add setProjects={setProjects} catalogs={catalogs} />
      <EditInfo
        setProjects={setProjects}
        projects={projects}
        catalogs={catalogs}
      />
      <EditImage projects={projects} setProjects={setProjects} />
    </div>
  );
}

export default Projects;
