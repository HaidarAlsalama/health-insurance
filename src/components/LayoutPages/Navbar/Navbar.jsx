import React from "react";
import { CgMenuLeft } from "react-icons/cg";
import { FiBell } from "react-icons/fi";
import logo from "./../../../Assets/Images/photo_2024-05-15_11-32-10.jpg";

export default function Navbar({ action }) {
  return (
    <div className="flex md:hidden justify-between items-center mx-3 backdrop-blur-md rounded-lg bg-white/50 dark:bg-gray-800/60 mb-1.5 px-3 py-3 h-fit sticky top-1 z-10">
      <button
        className="text-xl hover:bg-slate-600 hover:text-white rounded-md p-2 duration-150 text-gray-600 dark:text-gray-300 dark:hover:bg-blue-600"
        onClick={action}
      >
        <CgMenuLeft />
      </button>
      <h1 className="text-4xl font-extrabold text-black dark:text-blue-600">
        <div className="flex flex-row-reverse gap-2 mt-1 ">
          <div className="flex flex-col justify-center ">
            <h2 className="text-xs">التأمين الصحي - عقد الاستشفاء </h2>
            <h3 className="text-sm text-center">فرع حمص</h3>
          </div>
          <div className="w-10 mr-2">
            <img src={logo} className="w-full" />
          </div>
        </div>
      </h1>
      <div
        className={`relative invisible_ lg:visible text-xl hover:bg-slate-600 hover:text-white rounded-md p-2 duration-150 text-gray-600 dark:text-gray-300 dark:hover:bg-blue-600 notification`}
      >
    
</div>
     
    </div>
  );
}
