import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { API } from "../../utils/fetching";
import { BiDotsVertical } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function List({ catalogs }) {
  const nv = useNavigate();
  return (
    <div className="flex items-start justify-start flex-col w-full sm:w-auto overflow-x-scroll sm:overflow-x-auto">
      {/* STURCT */}
      <div className="flex items-center rounded-t-[10px] justify-start bg-zinc-700 h-[40px]">
        {/* # */}
        <div className="flex items-center justify-center w-[50px] h-full border-r border-zinc-200">
          <p className="text-white text-[13px]">#</p>
        </div>
        {/* name */}
        <div className="flex items-center justify-center w-[150px] h-full border-r border-zinc-200">
          <p className="text-white text-[13px]">Name</p>
        </div>
        {/* image */}
        <div className="flex items-center justify-center w-[70px] h-full border-r border-zinc-200">
          <p className="text-white text-[13px]">Image</p>
        </div>
        {/* image */}
        <div className="flex items-center justify-center w-[150px] h-full">
          <p className="text-white text-[13px]">Slug</p>
        </div>
      </div>
      {/*  */}
      {catalogs?.map((c, i) => {
        const lastIndex = catalogs?.length - 1;
        return (
          <div
            key={i}
            className={`flex items-center justify-start bg-white h-[60px] ${
              lastIndex === i ? "rounded-b-[10px]" : ""
            }`}
          >
            {/* # */}
            <div className="flex items-center justify-center w-[50px] h-full border-r border-zinc-500">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <IconButton variant="text">
                    <BiDotsVertical fontSize={20} />
                  </IconButton>
                </MenuHandler>
                <MenuList>
                  <MenuItem
                    className="flex items-center justify-start w-full gap-1"
                    onClick={() => nv(`#edit-${c?._id}`)}
                  >
                    <FaEdit className="text-blue-500" />
                    Edit
                  </MenuItem>
                  <MenuItem
                    disabled
                    className="flex items-center justify-start w-full gap-1"
                    onClick={() => nv(`#delete-${c?._id}`)}
                  >
                    <FaTrash className="text-red-500" />
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
            {/* name */}
            <div className="flex items-center justify-center w-[150px] h-full border-r border-zinc-500">
              <p className="text-zinc-800 text-[13px]">{c?.name}</p>
            </div>
            {/* image */}
            <div className="flex items-center justify-center w-[70px] h-full border-r border-zinc-500">
              <div className="flex items-center justify-center w-[50px] aspect-square rounded-[10px] overflow-hidden">
                <img src={API + c?.image} alt="c_img" />
              </div>
            </div>
            {/* image */}
            <div className="flex items-center justify-center w-[150px] h-full">
              <p className="text-zinc-800 text-[13px]">{c?.slug}</p>
            </div>
          </div>
        );
      })}
      {/*  */}
    </div>
  );
}

export default List;
