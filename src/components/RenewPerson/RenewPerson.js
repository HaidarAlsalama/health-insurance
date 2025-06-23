
import { Spin } from "antd";
import DatePicker from "react-datepicker";
import axios from "axios";
import { createAlert } from "components/Alert/Alert";
import config from "Constants/environment";
import React, { useEffect, useRef, useState } from "react";
import { json } from "react-router-dom";

const RenewPerson = ({ engId, name, personId2 }) => {
  const [startDate, setStartDate] = useState(null);
  const [renewDate, setRenewDate] = useState(null);
  const [wait, setWait] = useState(false);
  const [cardStatus, setCardStatus] = useState(true);
  const [onSendForm, setOnSendForm] = useState(false);
  const [message, setMessage] = useState();
  const [renewMembers, setRenewMembers] = useState([]);
  const [showRenewalForm, setShowRenewalForm] = useState(false); // حالة التحكم في عرض القائمة
  const inputref = useRef();

  const handleWaitChange = (e) => {
    setWait(e.target.checked);
  };

  const handleCardStatusChange = (e) => {
    setCardStatus(!e.target.checked);
  };

  // Function to add a new person object to the list and show the renewal form
  // const handleAddPerson = () => {
  //   const newPerson = {
  //     personId: personId2, // Replace with dynamic personId if needed
  //     waiting: wait,
  //     cardStatus: cardStatus,
  //     name,
  //   };

  //   let temp = JSON.parse(sessionStorage.getItem("temp")  "[]");

  //   sessionStorage.setItem("temp", JSON.stringify([...temp, newPerson]));

  //   // Add the new person to the list
  //   setRenewMembers([...temp, newPerson]);

  //   // Show the renewal form
  //   setShowRenewalForm(true);
  // };
  const handleAddPerson = () => {
    // تحقق مما إذا كان الشخص موجود بالفعل في القائمة
    const isPersonExist = renewMembers.some(
      (member) => member.personId === personId2
    );

    if (isPersonExist) {
      createAlert("Warning", "هذا الفرد تمت إضافته بالفعل");
      return;
    }

    const newPerson = {
      personId: personId2,
      waiting: wait,
      cardStatus: cardStatus,
      name,
    };

    let temp = JSON.parse(sessionStorage.getItem("temp")  ||"[]");

    sessionStorage.setItem("temp", JSON.stringify([...temp, newPerson]));

    // Add the new person to the list
    setRenewMembers([...temp, newPerson]);

    // Show the renewal form
    setShowRenewalForm(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSendForm) return;

    setOnSendForm(true);

    const previousYear = startDate?.getFullYear() || 0;
    const newYear = renewDate?.getFullYear() || 0;

    axios
      .post(
        `${config.baseUrl1}/${config.renewalPerson}?engineerId=${engId}&previousYear=${previousYear}&newYear=${newYear}`,
        renewMembers
      )
      .then((res) => {
        console.log(res);
        setMessage(res.status);
        setStartDate(null);
        setRenewDate(null);
        setRenewMembers([]);

        // Clear session storage
        sessionStorage.removeItem("temp");
        createAlert("Success", `تم التجديد للفرد ${name}`);
      })
      .catch((err) => {
        console.error(err);
        createAlert("Error", "فشل الارسال");
      })
      .finally(() => {
        setOnSendForm(false);
      });
  };


return (
    <div className="w-full bg-gray-100 p-2 rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="w-full ">
          <div className="text-center font-semibold text-lg mb-7 mt-4">{`تجديد للفرد ${name}`}</div>
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

          <div className="w-1/3 mb-2 items-center p-3 md:flex md:flex-row md:mr-3">
            <div className="flex items-center gap-2 pt-3 w-1/2">
              <input
                type="checkbox"
                checked={wait}
                onChange={handleWaitChange}
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
                onChange={handleCardStatusChange}
              />
              <label
                className="md:w-4/5 md:text-sm md:mt-1"
                style={{ cursor: "pointer" }}
              >
                عدم استفادة لهذا العام
              </label>
            </div>
          </div>

          {/* Display the button only if currentUserId matches engId */}

          <div className="flex justify-end p-2 w-full">
            <button
              type="button"
              onClick={handleAddPerson}
              className="flex justify-center items-center shadow-md rounded-full w-1/3 py-0 mt-2 h-10 md:w-1/4 lg:w-1/6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400"
              style={{ color: "white", fontSize: "18px" }}
            >
              إضافة الشخص
            </button>
          </div>

          {/* Submit button */}
          <div className="flex justify-end p-2 w-full">
            <button
              className="flex justify-center items-center shadow-md rounded-full w-1/3 py-0 mt-2 h-10 md:w-1/4 lg:w-1/6 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400"
              style={{ color: "white", fontSize: "18px" }}
              disabled={onSendForm}
            >
              {onSendForm ? <Spin size="small" /> : "تجديد الاشتراك"}
            </button>
          </div>
        </div>
      </form>


{/* Show the renewal list only when showRenewalForm is true */}
      {showRenewalForm && (
        <div className="mt-4">
          <h3 className="font-bold">الأشخاص المضافون:</h3>
          <ul>
            {renewMembers.map((member, index) => (
              <li key={index} className="mb-4 p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2 text-lg font-semibold mb-2">
                  <span>الشخص {index + 1}:</span>
                  <span className="font-medium">{member.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">انتظار:</span>
                  <span
                    className={
                      member.waiting ? "text-green-500" : "text-red-500"
                    }
                  >
                    {member.waiting ? "نعم" : "لا"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">
                    عدم الاستفادة لهذا العام:
                  </span>
                  <span
                    className={
                      member.cardStatus ? "text-green-500" : "text-red-500"
                    }
                  >
                    {member.cardStatus ? "لا" : " نعم"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RenewPerson;