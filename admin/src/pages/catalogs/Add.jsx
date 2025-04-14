import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../../utils/alert";
import { post } from "../../utils/fetching";

function Add({ setCatalogs }) {
  const h = useLocation().hash;
  const nv = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    image: "",
  });
  const close = () => {
    setForm({ name: "", image: "" });
    nv("#");
  };

  async function submit() {
    try {
      setDisabled(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image);
      const { ok, msg, data } = await post("/catalog/create", formData);
      if (!ok) throw new Error(msg);
      setCatalogs((prev) => [...prev, data]);
      successMsg(msg);
      close();
    } catch (error) {
      errorMsg(error.message);
    } finally {
      setDisabled(false);
    }
  }
  return (
    <Dialog open={h === "#add"} size="xs">
      <DialogHeader>
        <p>Add new catalog</p>
      </DialogHeader>
      <DialogBody className="flex items-start justify-start flex-col gap-[10px] border-y">
        <label className="flex items-center border cursor-pointer justify-center w-[100px] aspect-square bg-zinc-100 hover:bg-zinc-200 rounded-[10px] overflow-hidden">
          {!form?.image ? (
            <RiImageAddFill className="text-[40px]" />
          ) : (
            <img src={URL.createObjectURL(form.image)} alt="img" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files?.[0] })}
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
      </DialogBody>
      <DialogFooter className="gap-[10px]">
        <Button disabled={disabled} variant="text" onClick={close}>
          Close
        </Button>
        <Button loading={disabled} onClick={submit} color="green">
          Create
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default Add;
