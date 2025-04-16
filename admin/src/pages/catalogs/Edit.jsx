import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../../utils/alert";
import { API, put } from "../../utils/fetching";

function Edit({ setCatalogs, catalogs }) {
  const h = useLocation().hash;
  const nv = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [form, setForm] = useState({
    _id: "",
    name: "",
    desc: "",
    image: "",
    newImage: "",
  });
  const close = () => {
    setForm({ _id: "", name: "", image: "", desc: "" });
    nv("#");
  };

  async function submit() {
    try {
      setDisabled(true);
      const formData = new FormData();
      formData.append("id", form._id);
      formData.append("name", form.name);
      formData.append("desc", form.desc);
      if (form.newImage) formData.append("image", form.newImage);
      const { ok, msg, data } = await put("/catalog/edit", formData);
      if (!ok) throw new Error(msg);
      setCatalogs((prev) => prev.map((p) => (p?._id === data?._id ? data : p)));
      successMsg(msg);
      close();
    } catch (error) {
      errorMsg(error.message);
    } finally {
      setDisabled(false);
    }
  }
  useEffect(() => {
    if (h.startsWith("#edit-")) {
      const catalog = catalogs.find((c) => c._id === h.split("-")[1]);
      setForm({ ...form, ...catalog });
    }
  }, [h]);
  return (
    <Dialog open={h.startsWith("#edit-")} size="xs">
      <DialogHeader>
        <p>Edit catalog</p>
      </DialogHeader>
      <DialogBody className="flex items-start justify-start flex-col gap-[10px] border-y">
        <label className="flex items-center border cursor-pointer justify-center w-[100px] aspect-square bg-zinc-100 hover:bg-zinc-200 rounded-[10px] overflow-hidden">
          {!form.newImage ? (
            <img src={API + form.image} alt="" />
          ) : (
            <img src={URL.createObjectURL(form.newImage)} />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, newImage: e.target.files?.[0] })
            }
            className="hidden"
          />
        </label>
        <Input
          variant="standard"
          color="green"
          label="Name for catalog"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          value={form.name}
        />
        <Textarea
          color="green"
          variant="standard"
          label="Description"
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          value={form.desc}
        />
      </DialogBody>
      <DialogFooter className="gap-[10px]">
        <Button disabled={disabled} variant="text" onClick={close}>
          Close
        </Button>
        <Button loading={disabled} onClick={submit} color="green">
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default Edit;
