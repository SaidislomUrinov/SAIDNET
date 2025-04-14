import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { FaAt, FaHandPointDown, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { post } from "../utils/fetching";
import { errorMsg, successMsg } from "../utils/alert";
import { updateUser } from "../contexts/user";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const nv = useNavigate();
  const dp = useDispatch();
  const [disabled, setDisabled] = useState(false);

  async function submit() {
    try {
      setDisabled(true);
      const { ok, msg, data, access } = await post("/admin/signIn", form);

      if (!ok) throw new Error(msg);

      sessionStorage.setItem("access", access);
      nv("/dashboard");
      setTimeout(() => {
        dp(updateUser(data));
      }, 500);
      successMsg(msg);
    } catch (error) {
      errorMsg(error.message);
    } finally {
      setDisabled(false);
    }
  }
  return (
    <div
      onKeyDown={(k) => k.key === "Enter" && submit()}
      className="flex items-center justify-center w-full h-[100vh]"
    >
      <div className="flex shadow-md items-start justify-start flex-col w-[90%] sm:w-[500px] bg-white rounded-[20px] p-[20px]">
        <p className="text-zinc-800 font-bold text-[30px]">Login</p>
        <p className="text-zinc-500 text-[14px] flex items-center justify-center gap-1">
          Please fill the rows
          <FaHandPointDown fontSize={16} className="text-emerald-500" />
        </p>
        {/*  */}
        <div className="flex items-center mt-[10px] w-full justify-start flex-col gap-[10px]">
          <Input
            color="green"
            label="Username"
            required
            placeholder="username"
            variant="standard"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            value={form.username}
            icon={<FaAt className="text-emerald-500" />}
          />
          <Input
            color="green"
            label="Password"
            required
            placeholder="******"
            type="password"
            variant="standard"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            value={form.password}
            icon={<FaLock className="text-emerald-500" />}
          />
          <Button
            onClick={submit}
            loading={disabled}
            className="w-full"
            color="green"
          >
            Login
          </Button>
        </div>
        {/*  */}
      </div>
    </div>
  );
}

export default Auth;
