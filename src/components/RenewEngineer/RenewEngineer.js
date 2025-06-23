
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // استيراد CSS الخاص بـ DatePicker
import React, { useEffect, useRef, useState } from "react";
import { use } from "i18next";
import usePost from "Custom Hooks/usePost";
import config from "Constants/environment";
import axios from "axios";
import { createAlert } from "components/Alert/Alert";
import { Spin } from "antd";

const RenewEngineer = ({ ensuranceNum ,name ,last}) => {
  const [startDate, setStartDate] = useState(null);
  const [renewDate, setRenewDate] = useState(null);
  // const [ensuranceNum, setEnsuranceNum] = useState();
  const [wait, setWait] = useState(false);
  const [cardStatus, setCardStatus] = useState(true);
  const [onSendForm, setOnSendForm] = useState(false);
  const [message, setMessage] = useState();
  //   const [loading, message, postFunc] = usePost(config.renewal, {
  //     previousYear: startDate,
  //     newYear: renewDate,
  //     insuranceNumber: ensuranceNum,
  //     waiting: wait,
  //     cardStatus: cardStatus,
  //   });
  const inputref = useRef();
  // دالة لتغيير قيمة الانتظار بناءً على الـ checkbox
  const handleWaitChange = (e) => {
    setWait(e.target.checked);
  };

  // دالة لتغيير حالة البطاقة بناءً على الـ checkbox
  const handleCardStatusChange = (e) => {
    setCardStatus(!e.target.checked);
  };
  // const handleChangeEnc = (e) => {
  //   const newValue = e.target.value;
  //   if (/^[\d-]*$/.test(newValue)) {
  //     setEnsuranceNum(newValue);
  //     inputref.current.placeholder = "";
  //   } else {
  //     inputref.current.placeholder = "الرجاء ادخال ارقام فقط";
  //   }
  // };
  console.log("ensur", ensuranceNum);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSendForm || !ensuranceNum) return; // تأكد أن `ensuranceNum` ليس فارغًا
    setOnSendForm(true);
    axios
      .post(`${config.baseUrl1}/${config.renewal}`, null, {
        params: {
          previousYear: startDate?.getFullYear() || 0,
          newYear: renewDate?.getFullYear() || 0,
          insuranceNumber: ensuranceNum, // تأكد من تمرير القيمة الصحيحة
          waiting: wait,
          cardStatus: cardStatus,
        },
      })
      .then((res) => {
        console.log(res);
        setMessage(res.status);
        setStartDate(null);
        setRenewDate(null);
      })
      .catch((err) => {
        console.error(err);
        createAlert("Error", "فشل الارسال");
      });
    setOnSendForm(false);
  };


useEffect(() => {
    if (message === 200) {
      setTimeout(() => {
        createAlert("Success", "نجاح الارسال");
        setMessage(null);
      }, 1000);
    }
  }, [message]);
  return (
    <div className="w-full border-gray-300 border-8 p-2 rounded-xl mt-5">
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <div className="text-center font-semibold text-lg mb-7 mt-4">{`تجديد للمهندس ${name} ${last}`}</div>
          <div className="w-full mb-2 items-center p-3 md:flex md:flex-row md:mr-3">
            <div className="flex items-center pt-3 md:w-1/2 md:ml-2">
              <label
                className="w-2/6 md:w-2/5 md:text-sm md:mt-1 lg:w-1/4"
                style={{ cursor: "pointer" }}
              >
                العام الحالي
              </label>
              <DatePicker
                selected={startDate}
                dateFormat="yyyy"
                showYearPicker
                onChange={(date) => setStartDate(date)}
                placeholderText="اضغط لاختيار العام"
                className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-3 w-11/12 px-6 mr-0 md:w-11/12 md:ml-1 lg:w-5/6 lg:px-12"
              />
            </div>
            <div className="flex pt-3 md:w-1/2 md:ml-3">
              <label
                className="w-2/6 md:w-2/5 md:text-sm md:mt-3 lg:w-1/4"
                style={{ cursor: "pointer" }}
              >
                التجديد لعام
              </label>
              <DatePicker
                selected={renewDate}
                onChange={(date) => setRenewDate(date)}
                dateFormat="yyyy"
                showYearPicker
                placeholderText="اضغط لاختيار العام"
                className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-3 w-11/12 px-6 mr-0 md:w-11/12 md:ml-1 lg:w-5/6 lg:px-12 lg:mr-1"
              />
            </div>
          </div>

          {/* <div className="w-1/2 mb-2 items-center p-3 md:flex md:flex-row md:mr-3">
            <div className="flex w-full pt-3 md:ml-3">
              <label
                className="w-2/6 md:w-1/4 md:text-sm md:mt-1"
                style={{ cursor: "pointer" }}
              >
                رقم التأمين
              </label>
              <input
                ref={inputref}
                value={ensuranceNum}
                type="text"
                className="rounded-2xl p-2 ml-10 md:mr-4 md:px-4 md:ml-1 "
                // onChange={(e)=>setEnsuranceNum(e.target.value)}
              />
            </div>
          </div> */}

          <div className="w-1/3 mb-2 items-center p-3 md:flex md:flex-row md:mr-3">
            <div className="flex items-center gap-2 pt-3 w-1/2">
              <input
                type="checkbox"
                checked={wait}
                onChange={handleWaitChange} // تغيير قيمة wait بناءً على حالة الـ checkbox
              />
              <label
                className="md:w-2/5 md:text-sm md:mt-1"
                style={{ cursor: "pointer" }}
              >
                انتظار
              </label>
            </div>
            <div className="flex items-center gap-2 pt-3 w-1/2">
              <input
                type="checkbox"
                checked={!cardStatus}
                onChange={handleCardStatusChange} // تغيير قيمة cardStatus بناءً على حالة الـ checkbox
              />
              <label
                className="md:w-4/5 md:text-sm md:mt-1"
                style={{ cursor: "pointer" }}
              >
                عدم استفادة لهذا العام
              </label>
            </div>
          </div>


<div className="flex justify-end p-2 w-full">
            <button
              className="flex justify-center items-center shadow-md rounded-full w-1/3 py-0 mt-2 h-10 md:w-1/4 lg:w-1/6 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400"
              style={{ color: "white", fontSize: "18px" }}
              disabled={onSendForm}
            >
              {onSendForm ? (
                <Spin size="small" /> // عرض Spin عند الإرسال
              ) : (
                "تجديد الاشتراك"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RenewEngineer;