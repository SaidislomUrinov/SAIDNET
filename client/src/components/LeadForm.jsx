import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiLoader, BiX } from "react-icons/bi";
import { IMaskInput } from "react-imask";
import { errorMsg, successMsg } from "../utils/alert";
import { useLocation, useNavigate } from "react-router-dom";
import { post } from "../utils/fetching";
function LeadForm() {
  const { t } = useTranslation();
  const h = useLocation().hash;
  const nv = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    telegram: "",
    via: "phone", //telegram
  });
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(false);

  const submit = async () => {
    try {
      setDisabled(true);
      const { name, phone, telegram, via } = form;

      if (!name || !phone || phone.length !== 9)
        throw new Error(t("request.fill"));

      if (telegram && telegram.length < 5)
        throw new Error(t("request.telegram_error"));

      if (via === "telegram" && !telegram)
        throw new Error(t("request.telegram_via_error"));

      const { ok, msg } = await post("/order/create", {
        name,
        phone,
        telegram,
        via,
      });

      if (!ok) throw new Error(t(`request.${msg}`));

      successMsg(t(`request.${msg}`));
      close();
    } catch (error) {
      errorMsg(error.message);
    } finally {
      setDisabled(false);
    }
  };
  const close = async () => {
    setForm({
      name: "",
      phone: "",
      telegram: "",
      via: "phone", //telegram
    });
    nv("#");
  };
  return (
    <div
      className={`flex items-center justify-center w-full h-[100vh] fixed duration-300 top-0 left-0 backdrop-blur-sm ${
        h === "#request" ? "z-[4] opacity-100" : "z-[-1] opacity-0 scale-0"
      }`}
    >
      <div className="flex items-start justify-start flex-col relative w-[90%] sm:w-[500px] p-[20px] rounded-[20px] bg-zinc-800 border border-zinc-700 gap-[20px]">
        {/*  */}
        <button
          onClick={close}
          className="outlined absolute !bg-zinc-900 right-[-12px] top-[-12px] !rounded-full !p-0 w-[45px]"
        >
          <BiX className="text-[25px]" />
        </button>
        {/*  */}
        <div className="flex items-start justify-start flex-col">
          <p className="text-[20px] font-bold">{t("request.title")}</p>
          <p className="text-[15px] text-gray-300">{t("request.text")}</p>
        </div>
        {/*  */}
        <div className="flex items-start justify-start flex-col w-full gap-[10px]">
          <input
            type="text"
            placeholder={t("request.name")}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
          />
          {/*  */}
          <IMaskInput
            mask={"+998 [00 000 00 00]"}
            //   radix="."
            value={form.phone}
            unmask={true}
            ref={ref}
            inputRef={inputRef}
            onAccept={(value) => setForm({ ...form, phone: value })}
            placeholder={t("request.phone")}
          />
          <input
            type="text"
            placeholder={t("request.telegram")}
            onChange={(e) =>
              setForm({ ...form, telegram: e.target.value.trim() })
            }
            value={form.telegram}
          />
          {/*  */}
          <p className="text-[14px]">{t("request.type")}</p>
          <div className="flex items-center flex-wrap justify-start gap-[10px]">
            <label className="flex items-center justify-start gap-[5px] cursor-pointer">
              <input
                type="radio"
                name="via"
                value="phone"
                checked={form.via === "phone"}
                onChange={(e) => setForm({ ...form, via: e.target.value })}
              />
              {t("request.via.phone")}
            </label>
            <label className="flex items-center justify-start gap-[5px] cursor-pointer">
              <input
                disabled={!form.telegram?.[4]}
                type="radio"
                name="via"
                value="telegram"
                checked={form.via === "telegram"}
                onChange={(e) => setForm({ ...form, via: e.target.value })}
              />
              {t("request.via.telegram")}
            </label>
          </div>
        </div>
        <button
          className="w-full relative"
          disabled={disabled}
          onClick={submit}
        >
          {disabled ? (
            <BiLoader
              fontSize={20}
              className="animate-spin text-white absolute right-[10px]"
            />
          ) : (
            ""
          )}
          {t("request.submit")}
        </button>
      </div>
    </div>
  );
}

export default LeadForm;
