import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function Collapse({ children, title }) {
  const [openCollapse, setOpenCollapse] = useState(false);
  return (
    <div className="mb-4">
      <h2
        className={`shadow-md ${openCollapse ? " rounded-t-md" : "rounded-md"}`}
      >
        <button
          type="button"
          className={`flex items-center justify-between w-full p-2 font-medium  text-gray-600 border border-gray-200 focus:ring-4 focus:ring-gray-200/50 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${
            openCollapse ? " rounded-t-md" : "rounded-md"
          }`}
          onClick={() => setOpenCollapse((prev) => !prev)}
        >
          <span>{title}</span>
          {openCollapse ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </h2>
      <div
        className={`shadow-md rounded-b-md ${
          openCollapse ? "block" : "hidden"
        }`}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded-b-md">
          {children}
        </div>
      </div>
    </div>
  );
}
