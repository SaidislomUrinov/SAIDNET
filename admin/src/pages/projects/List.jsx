import {
  Chip,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { API } from "../../utils/fetching";
import { BiDotsVertical } from "react-icons/bi";
import { FaEdit, FaGithub, FaImages, FaLink, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function List({ projects }) {
  const nv = useNavigate();
  return (
    <div className="flex items-start justify-start flex-col w-full xl:w-auto overflow-x-scroll xl:overflow-x-auto">
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
        <div className="flex items-center justify-center w-[70px] h-full border-r border-zinc-200">
          <p className="text-white text-[13px]">Images</p>
        </div>
        {/* slug */}
        <div className="flex items-center justify-center w-[150px] h-full border-r border-zinc-200">
          <p className="text-white text-[13px]">Slug</p>
        </div>
        <div className="flex items-center justify-center w-[300px] h-full border-r border-zinc-200">
          <p className="text-white text-[13px]">Catalogs</p>
        </div>
        <div className="flex items-center justify-center w-[100px] h-full border-r border-zinc-200">
          <p className="text-white text-[13px]">Status</p>
        </div>
        <div className="flex items-center justify-center w-[100px] h-full border-r border-zinc-200">
          <p className="text-white text-[13px]">Tech Stack</p>
        </div>
        <div className="flex items-center justify-center w-[70px] h-full border-r border-zinc-200">
          <p className="text-white text-[13px]">URL</p>
        </div>
        <div className="flex items-center justify-center w-[70px] h-full border-r border-zinc-200">
          <p className="text-white text-[13px]">GitHub</p>
        </div>
      </div>
      {/*  */}
      {projects?.map((c, i) => {
        const lastIndex = projects?.length - 1;
        return (
          <div
            key={i}
            className={`flex items-center justify-start bg-white h-[60px] ${
              lastIndex === i ? "rounded-b-[10px]" : "border-b border-zinc-500"
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
                    onClick={() => nv(`#edit-info-${c?._id}`)}
                  >
                    <FaEdit className="text-blue-500" />
                    Edit
                  </MenuItem>
                  <MenuItem
                    className="flex items-center justify-start w-full gap-1"
                    onClick={() => nv(`#edit-images-${c?._id}`)}
                  >
                    <FaImages className="text-cyan-500" />
                    Edit images
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
            {/* images */}
            <div className="flex items-center justify-center w-[70px] h-full border-r border-zinc-500">
              <Chip variant="ghost" value={`${c?.images?.length}`} />
            </div>
            {/* slug */}
            <div className="flex items-center justify-center w-[150px] h-full  border-r border-zinc-500">
              <p className="text-zinc-800 text-[13px]">{c?.slug}</p>
            </div>
            <div className="flex items-center justify-center w-[300px] gap-1 flex-wrap px-[5px] h-full border-r border-zinc-500">
              {c?.catalogs?.map((c, i) => (
                <Chip variant="ghost" key={i} size="sm" value={c?.name} />
              ))}
            </div>
            <div className="flex items-center justify-center w-[100px] h-full border-r border-zinc-500">
              <Chip
                variant="ghost"
                color={
                  c?.status === "active"
                    ? "green"
                    : c?.status === "inactive"
                    ? "red"
                    : "orange"
                }
                value={`${c?.status}`}
              />
            </div>
            <div className="flex items-center justify-center w-[100px] gap-1 flex-wrap h-full border-r border-zinc-500">
              <Chip variant="ghost" size="sm" value={c?.techStack?.length} />
            </div>
            <div className="flex items-center justify-center w-[70px] h-full border-r border-zinc-500">
              {c?.url ? (
                <IconButton size="sm" onClick={() => window.open(c?.url)}>
                  <FaLink />
                </IconButton>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center justify-center w-[70px] h-full">
              {c?.github ? (
                <IconButton size="sm" onClick={() => window.open(c?.github)}>
                  <FaGithub />
                </IconButton>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
      {/*  */}
    </div>
  );
}

export default List;
