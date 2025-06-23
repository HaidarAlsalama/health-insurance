import React, { useEffect, useState } from "react";
import Logo from "../../Assets/Images/photo_2024-05-15_11-32-10.jpg";
import "./Welcome.css";
import { Navigate, useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div className="conatiner flex flex-col h-screen text-lg justify-center items-center bg-white">
      <div className="flex flex-col-reverse justify-center items-center h-64 w-3/6 pt-0 md:flex md:flex-row md:items-center md:w-4/6 md:h-44 md:p-4 bg-white rounded-3xl shadow-md lg:flex lg:flex-row lg:items-center lg:justify-start lg:h-60 lg:p-1 lg:pt-0 lg:2/3">
        <div className="flex justify-center items-start w-full flex-col space-y-0 mb-2 h-8 md:w-80 md:pr-10  lg:w-4/5">
          <h1 className=" text-xs w-full text-center mb-2 mt-20 md:text-xl md:ml-20 md:text-center font-sans font-semibold md:mt-5  lg:text-3xl lg:ml-8  ">
            التأمين الصحي - عقد الاستشفاء
          </h1>
          <h2 className=" text-xs w-full text-center mb-2 mt-20 md:text-xl md:ml-20 md:text-center font-sans font-normal  lg:text-2xl  lg:ml-8 ">
            فرع حمص
          </h2>
        </div>
        <div className="flex justify-center items-center w-20  md:w-28 lg:w-48 lg:ml-8">
          <img src={Logo} className=" w-full mt-8 md:w-full md:mt-5" />
        </div>
      </div>
      <div className=" container flex mt-20 justify-center">
        <div className="w-6 h-6 mr-2 rounded-full  bg-blue-200  animate-bounce md:w-10 md:h-10 md:mr-5 lg:w-10 lg:h-10 lg:mr-5 ani1"></div>
        <div className="w-6 h-6 mr-2 rounded-full  bg-blue-200  animate-bounce md:w-10 md:h-10 md:mr-5 lg:w-10 lg:h-10 lg:mr-5 ani2"></div>
        <div className="w-6 h-6 mr-2 rounded-full  bg-blue-200 animate-bounce md:w-10 md:h-10 md:mr-5 lg:w-10 lg:h-10 lg:mr-5 ani3"></div>
        <div className="w-6 h-6 mr-2 rounded-full  bg-blue-900 animate-bounce md:w-10 md:h-10 md:mr-5 lg:w-10 lg:h-10 lg:mr-5 ani4"></div>
      </div>
    </div>
  );
};

export default Welcome;
