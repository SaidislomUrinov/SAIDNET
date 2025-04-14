import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function Top() {
  const { name, username } = useSelector((e) => e?.user);
  //
  const p = useLocation().pathname?.slice(1);
  //
  return (
    <div className="flex items-center justify-between px-[10px] w-full h-[10vh] bg-zinc-800">
      <div className="lg:hidden"></div>
      <p className="text-[20px] md:text-[30px] font-bold uppercase text-white">
        {p}
      </p>
      <div className="flex items-center justify-center gap-1">
        <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-gradient-to-br from-red-500 to-yellow-500">
          <p className="text-white text-[20px] font-bold">{name?.[0]}</p>
        </div>
        <div>
          <p className="text-white text-[16px] mb-[-4px]">{name}</p>
          <p className="text-zinc-500 text-[14px] mt-[-4px]">{username}</p>
        </div>
      </div>
    </div>
  );
}

export default Top;
