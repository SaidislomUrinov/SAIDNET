import { useEffect, useState } from "react";
import { get } from "../../utils/fetching";
import { errorMsg } from "../../utils/alert";
import { Button, Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";
import Add from "./Add";
import List from "./List";

function Catalogs() {
  const [catalogs, setCatalogs] = useState([]);
  const [load, setLoad] = useState(false);
  //
  useEffect(() => {
    get("/catalog/list")
      .then((res) => {
        const { ok, data } = res;
        if (ok) {
          setCatalogs(data);
        }
      })
      .catch((error) => {
        errorMsg(error.message);
      })
      .finally(() => {
        setLoad(true);
      });
  }, []);
  //
  const nv = useNavigate();
  return (
    <div className="flex gap-[10px] items-start justify-start flex-col w-full">
      {!load && (
        <div className="w-full flex-col h-[50vh] gap-2 flex items-center justify-center">
          <Spinner color="green" className="w-[40px] h-[40px]" />
          <p className="text-[12px] text-zinc-700">Fetching catalogs...</p>
        </div>
      )}
      {load && !catalogs[0] && (
        <div className="w-full flex-col h-[50vh] gap-2 flex items-center justify-center">
          <FaSadTear className="text-[80px] text-orange-600" />
          <p className="text-[12px] text-zinc-700">Catalogs not found</p>
          <Button onClick={() => nv("#add")} color="green">
            Add new catalog
          </Button>
        </div>
      )}
      {load && catalogs[0] && (
        <>
          <Button onClick={() => nv("#add")} color="green">
            Add new catalog
          </Button>
          <List catalogs={catalogs} />
        </>
      )}
      {/*  */}
      <Add setCatalogs={setCatalogs} />
    </div>
  );
}

export default Catalogs;
