import { IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { RiDashboardFill, RiLink, RiPriceTag2Fill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ path = "", title = "", icon }) => {
  const p = useLocation().pathname;
  const Icon = icon;
  return (
    <Link
      to={path}
      className={`capitalize flex items-center w-full h-[50px] rounded-[10px] px-[10px] justify-start gap-[10px] ${
        p === path ? "text-white bg-zinc-700" : "text-zinc-500"
      }`}
    >
      <Icon />
      {title}
    </Link>
  );
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const p = useLocation().pathname;

  const closeOpen = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(false);
  }, [p]);

  return (
    <>
      <div
        className={`flex duration-300 z-[3] items-center justify-start flex-col w-[300px] lg:w-1/6 bg-zinc-800 fixed top-0 left-0 lg:relative lg:top-0 lg:left-auto ${
          open ? "left-0" : "left-[-300px]"
        }`}
      >
        {/*  */}
        <div className="flex relative items-center justify-between w-full h-[10vh] px-[20px]">
          <p className="text-[30px] font-bold bg-gradient-to-br from-yellow-500 to-red-500 text-transparent bg-clip-text">
            SAIDNET
          </p>
          <div
            className={`absolute duration-300 lg:hidden ${
              open ? "right-[20px]" : "right-[-60px]"
            }`}
          >
            <IconButton color="white" onClick={() => setOpen(!open)}>
              {open ? <FaXmark /> : <FaBars />}
            </IconButton>
          </div>
        </div>
        {/*  */}
        <div className="flex items-start flex-col justify-start w-full h-[90vh] px-[20px] gap-[10px] overflow-y-scroll">
          {/*  */}
          <NavLink path="/dashboard" title="dashboard" icon={RiDashboardFill} />
          <NavLink path="/catalogs" title="catalogs" icon={RiPriceTag2Fill} />
          <NavLink path="/projects" title="projects" icon={RiLink} />
          <NavLink path="/orders" title="orders" icon={FiTarget} />
          {/*  */}
        </div>
      </div>

      {/* closer */}
      <div
        className={`fixed duration-300 z-[2] bg-black/50 top-0 left-0 w-full h-full ${
          open ? "block" : "hidden"
        }`}
        onClick={closeOpen}
      ></div>
    </>
  );
}

export default Navbar;
