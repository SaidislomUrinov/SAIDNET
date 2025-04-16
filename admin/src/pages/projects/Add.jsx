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
import { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../../utils/alert";
import { post } from "../../utils/fetching";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const projectStruct = {
  name: "",
  image: "",
  images: [],
  desc: "",
  url: "",
  github: "",
  catalogs: [],
  techStack: [],
  status: "",
};

function Add({ setProjects, catalogs }) {
  const h = useLocation().hash;
  const nv = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [form, setForm] = useState(projectStruct);
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

  async function submit() {
    try {
      setDisabled(true);
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("image", form.image);
      formData.append("desc", form.desc);
      form.catalogs.forEach((c) => formData.append("catalogs", c));
      form.techStack.forEach((t) => formData.append("techStack", t));
      form.images.forEach((img) => formData.append("images", img));
      if (form.url) formData.append("url", form.url);
      if (form.github) formData.append("github", form.github);
      formData.append("status", form.status);

      const { ok, msg, data } = await post("/project/create", formData);
      if (!ok) throw new Error(msg);
      setProjects((prev) => [data, ...prev]);
      successMsg(msg);
      close();
    } catch (error) {
      errorMsg(error.message);
    } finally {
      setDisabled(false);
    }
  }

  return (
    <Dialog open={h === "#add"}>
      <DialogHeader>Add new project</DialogHeader>
      <DialogBody className="flex items-start justify-start flex-col gap-[10px] max-h-[500px] border-y overflow-y-scroll">
        <div className="flex items-center justify-center gap-[10px]">
          <label className="w-[160px] aspect-square flex items-center justify-center cursor-pointer border rounded-lg bg-zinc-100 hover:bg-zinc-200 overflow-hidden">
            {!form.image ? (
              <RiImageAddFill className="text-[40px]" />
            ) : (
              <img src={URL.createObjectURL(form.image)} alt="main" />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setForm({ ...form, image: e.target.files?.[0] })}
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
        <div className="flex items-start justify-start flex-col gap-[10px] w-full">
          <Input
            required
            label="Project images"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, images: Array.from(e.target.files) })
            }
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {form.images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-16 h-16 object-cover rounded"
              />
            ))}
          </div>
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
          {disabled ? "Creating..." : "Create"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default Add;
