import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../../utils/alert";
import { API, del, post, put } from "../../utils/fetching";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
} from "@material-tailwind/react";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { FaRotate } from "react-icons/fa6";

const projectStruct = {
  _id: "",
  images: [],
};

function EditImage({ projects, setProjects }) {
  const [form, setForm] = useState(projectStruct);
  const nv = useNavigate();
  const h = useLocation().hash;
  const [disabled, setDisabled] = useState(false);
  const close = () => {
    setForm(projectStruct);
    nv("#");
  };
  useEffect(() => {
    if (h.startsWith("#edit-images-")) {
      const id = h.split("-")[2];
      const p = projects?.find((p) => p?._id === id);
      if (p) {
        setForm({
          _id: p?._id,
          images: p?.images,
        });
      } else {
        nv("#");
      }
    }
  }, [h]);

  async function deleteImage(index) {
    try {
      setDisabled(true);
      const { ok, data, msg } = await del("/project/delete/image", {
        index,
        id: form._id,
      });
      console.log(data);

      if (!ok) throw new Error(msg);

      successMsg(msg);
      setProjects((prev) =>
        prev.map((p) =>
          p._id === data._id ? { ...p, images: data.images } : p
        )
      );
      setForm({ ...form, images: data.images });
    } catch (error) {
      errorMsg(error.message);
    } finally {
      setDisabled(false);
    }
  }

  async function updateImage(index, image) {
    const fData = new FormData();

    fData.append("image", image);
    fData.append("index", index);
    fData.append("id", form._id);

    const { ok, data, msg } = await put("/project/update/image", fData);

    if (!ok) throw new Error(msg);

    successMsg(msg);
    setProjects((prev) =>
      prev.map((p) => (p._id === data._id ? { ...p, images: data.images } : p))
    );

    setForm({ ...form, images: data.images });
    try {
    } catch (error) {
      errorMsg(error.message);
    } finally {
      setDisabled(false);
    }
  }

  async function addImage(image) {
    const fData = new FormData();

    fData.append("image", image);
    fData.append("id", form._id);

    const { ok, data, msg } = await post("/project/update/image", fData);

    if (!ok) throw new Error(msg);

    successMsg(msg);
    setProjects((prev) =>
      prev.map((p) => (p._id === data._id ? { ...p, images: data.images } : p))
    );

    setForm({ ...form, images: data.images });
  }
  return (
    <Dialog open={h.startsWith("#edit-images-")}>
      <DialogHeader>Edit project images</DialogHeader>
      <DialogBody className="flex items-start justify-center flex-wrap gap-[10px] max-h-[500px] border-y overflow-y-scroll">
        <div className="flex items-center justify-end w-full">
          <label className="flex items-center justify-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => addImage(e.target.files?.[0])}
              className="hidden"
            />
            <div
              color="blue"
              className=" h-[30px] gap-1 px-[10px] flex items-center justify-center rounded-[7px] bg-blue-500 text-white text-[12px] font-semibold"
              size="sm"
            >
              <FaPlusCircle />
              Add new Image
            </div>
          </label>
        </div>
        {form?.images?.map((img, i) => {
          return (
            <div
              className="flex items-center justify-center relative w-[200px] aspect-square rounded-[10px] overflow-hidden"
              key={i}
            >
              {/*  */}
              <div className="absolute top-[5px] right-[5px]">
                <IconButton
                  color="red"
                  size="sm"
                  onClick={() => deleteImage(i)}
                >
                  <FaTrash />
                </IconButton>
              </div>
              <label className="absolute top-[5px] left-[5px]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateImage(i, e.target.files?.[0])}
                  className="hidden"
                />
                <div
                  color="blue"
                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[7px] bg-blue-500 text-white text-[12px] cursor-pointer"
                  size="sm"
                >
                  <FaRotate />
                </div>
              </label>
              {/*  */}
              <img
                src={API + img}
                alt="p_img"
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </DialogBody>
      <DialogFooter className="gap-2">
        <Button variant="text" onClick={close} disabled={disabled}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default EditImage;
