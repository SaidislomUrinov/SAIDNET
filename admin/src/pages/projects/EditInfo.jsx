import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Checkbox,
  Radio,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../../utils/alert";
import { API, put } from "../../utils/fetching";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const projectStruct = {
  _id: "",
  name: "",
  image: "",
  newImage: "",
  desc: "",
  url: "",
  github: "",
  catalogs: [],
  techStack: [],
  status: "",
};

function EditInfo({ projects, setProjects, catalogs }) {
  const [form, setForm] = useState(projectStruct);
  const nv = useNavigate();
  const h = useLocation().hash;
  const [disabled, setDisabled] = useState(false);
  const [techInput, setTechInput] = useState("");

  const close = () => {
    setForm(projectStruct);
    nv("#");
  };

  const toggleCatalog = (id) => {
    setForm((prev) => ({
      ...prev,
      catalogs: prev.catalogs.includes(id)
        ? prev.catalogs.filter((c) => c !== id)
        : [...prev.catalogs, id],
    }));
  };

  const removeTech = (index) => {
    setForm((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index),
    }));
  };

  const addTech = () => {
    if (techInput.trim()) {
      setForm((prev) => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()],
      }));
      setTechInput("");
    }
  };
  //
  useEffect(() => {
    if (h.startsWith("#edit-info-")) {
      const id = h.split("-")[2];
      const p = projects?.find((p) => p?._id === id);
      if (p) {
        setForm({
          _id: p?._id,
          name: p?.name,
          image: p?.image,
          newImage: "",
          desc: p?.desc,
          url: p?.url,
          github: p?.github,
          catalogs: p?.catalogs?.map((c) => c?._id),
          techStack: p?.techStack,
          status: p?.status,
        });
      } else {
        nv("#");
      }
    }
  }, [h]);

  async function submit() {
    try {
      setDisabled(true);
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("_id", form._id);
      if (form.newImage) formData.append("image", form.newImage);
      formData.append("desc", form.desc);
      form.catalogs.forEach((c) => formData.append("catalogs", c));
      form.techStack.forEach((t) => formData.append("techStack", t));
      if (form.url) formData.append("url", form.url);
      if (form.github) formData.append("github", form.github);
      formData.append("status", form.status);

      const { ok, msg, data } = await put("/project/update/info", formData);
      if (!ok) throw new Error(msg);
      setProjects((prev) =>
        prev?.map((p) => (p?._id === data?._id ? data : p))
      );
      successMsg(msg);
      close();
    } catch (error) {
      errorMsg(error.message);
    } finally {
      setDisabled(false);
    }
  }
  //
  return (
    <Dialog open={h.startsWith("#edit-info-")}>
      <DialogHeader>Edit project</DialogHeader>
      <DialogBody className="flex items-start justify-start flex-col gap-[10px] max-h-[500px] border-y overflow-y-scroll">
        <div className="flex items-center justify-center gap-[10px]">
          <label className="w-[160px] aspect-square flex items-center justify-center cursor-pointer border rounded-lg bg-zinc-100 hover:bg-zinc-200 overflow-hidden">
            {!form.newImage ? (
              <img src={API + form?.image} alt="main" />
            ) : (
              <img src={URL.createObjectURL(form.newImage)} alt="main" />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setForm({ ...form, newImage: e.target.files?.[0] })
              }
            />
          </label>
          <div className="flex items-start justify-start flex-col">
            <p className="font-semibold text-zinc-800">Project status</p>
            <Radio
              name="status"
              onChange={() => setForm({ ...form, status: "active" })}
              label="Active"
              checked={form.status === "active"}
              color="green"
            />
            <Radio
              name="status"
              onChange={() => setForm({ ...form, status: "inactive" })}
              label="Inactive"
              checked={form.status === "inactive"}
              color="green"
            />
            <Radio
              name="status"
              onChange={() => setForm({ ...form, status: "archived" })}
              label="Archived"
              checked={form.status === "archived"}
              color="green"
            />
          </div>
        </div>
        {/*  */}
        <div className="flex items-center justify-center w-full gap-[10px] flex-col sm:flex-row">
          <Input
            label="Project Name"
            required
            color="green"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Project URL"
            color="green"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </div>
        {/*  */}
        <div className="flex items-center justify-center w-full gap-[10px] flex-col sm:flex-row">
          <Input
            label="Github URL"
            color="green"
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
          />
          <Input
            label="Add tech stack"
            required
            color="green"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTech()}
          />
        </div>
        {/*  */}
        <div
          className={`flex gap-2 flex-wrap ${
            form.techStack.length ? "" : "hidden"
          }`}
        >
          {form.techStack.map((t, i) => (
            <span
              key={i}
              className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded cursor-pointer"
              onClick={() => removeTech(i)}
            >
              {t} ✕
            </span>
          ))}
        </div>
        {/*  */}
        <div className="flex items-center justify-center gap-[10px] flex-wrap">
          {catalogs.map((cat) => (
            <Checkbox
              key={cat._id}
              label={cat.name}
              checked={form.catalogs.includes(cat._id)}
              onChange={() => toggleCatalog(cat._id)}
            />
          ))}
        </div>
        {/*  */}
        <ReactQuill
          theme="snow"
          value={form.desc}
          onChange={(val) => setForm({ ...form, desc: val })}
          className="w-full"
        />
      </DialogBody>
      <DialogFooter className="gap-2">
        <Button variant="text" onClick={close} disabled={disabled}>
          Close
        </Button>
        <Button color="green" onClick={submit} disabled={disabled}>
          {disabled ? "Editing..." : "Edit"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default EditInfo;
