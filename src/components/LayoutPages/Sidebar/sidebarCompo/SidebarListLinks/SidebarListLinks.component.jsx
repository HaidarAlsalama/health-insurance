import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SidebarLink from "../SidebarLink/SidebarLink.component";
import "./SidebarListLinks.scss";

export default function SidebarListLinks({ list }) {
  const sidebarState = useSelector((state) => state.layout.layoutState);
  const location = useLocation();
  const [openList, setOpenList] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const containsUrl = list.content.some(
      (item) => item.url === location.pathname
    );
    containsUrl ? setOpenList(true) : setOpenList(false);
  }, [location]);

  return (
    <li
      className={`flex flex-col sidebar-list-link cursor-pointer ${sidebarState}`}
      onClick={() => setOpenList((prev) => !prev)}
    >
      <div
        className={`sidebar-list-link-header flex text-lg items-center justify-between hover:bg-gray-300 hover:text-white_ duration-200 rounded-md md:flex-row-reverse lg:flex-row dark:hover:bg-blue-600 dark:hover:text-white ${
          openList ? "bg-gray-300 dark:bg-blue-600 text-white_" : ""
        }`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div
          className={`hidden md:flex items-center gap-2 md:flex-row-reverse lg:flex-row navbarState overflow-hidden`}
        >
          <div className="p-1 ">
            <list.icon />
          </div>
          <h5 className="text-sm font-bold text-nowrap hidden lg:block">
            {list.title}
          </h5>
        </div>
        <div className={`items-center`}>
          {openList ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
        <div
          className={`sm:invisible ${
            showTooltip && "md:visible"
          } lg:invisible absolute hidden md:block ltr:-right-[220%] rtl:-left-[220%] w-36 min-h-10 text-nowrap_ px-3 py-2 text-sm font-medium text-gray-700 transition-opacity bg-white rounded-md shadow-2xl_ dark:bg-gray-700 dark:text-white tooltip`}
        >
          <div className="border-transparent absolute ltr:right-full rtl:left-full top-1/3 w-0 border-8 ltr:border-r-white rtl:border-l-white ltr:dark:border-r-gray-700 rtl:dark:border-l-gray-700 "></div>
          {list.title}
        </div>
      </div>

      <ul
        className={`list flex flex-col h-0 overflow-y-hidden  gap-1 text-gray-600 dark:text-gray-300 ${
          openList && "mt-1 !h-full"
        } `}
      >
        {list.content.map((item, index) => (
          <SidebarLink key={index} item={item} sidebarState={sidebarState} />
        ))}
      </ul>
    </li>
  );
}
