
import { Spinner } from "components";
import { createAlert } from "components/Alert/Alert";
import config from "Constants/environment";
import useGet from "Custom Hooks/useGet";
import usePost from "Custom Hooks/usePost";
import { useEffect, useRef, useState } from "react";

const Specializatio = () => {
  const [depart, setDepart] = useState("");
  const [data4, loading44] = useGet(config.engineeringedepars);
  const [depId, setDepId] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [data5, loading5] = useGet(config.specializations);
  const inputRef3 = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (data4 && depart) {
      const selectedDept = data4.find((item) => item.name === depart);
      if (selectedDept) {
        setDepId(selectedDept.id);
        const filteredSpecializations = data5.filter(
          (item) => item.engineeringeDeparId === selectedDept.id
        );
        setSpecializations(filteredSpecializations);
      }
    }
  }, [depart, data4, data5]);

  const handleChange5b = (event) => {
    setDepart(event.target.value);
    setErrorMessage1("");
  };

  // const [loagindkk,message1, postFunc] = usePost(config.engineeringedepars, {
  //   name: depart,
  // });
  const [loadindjj, message, postFunc1] = usePost(config.specializations, {
    engineeringeDeparId: depId,
    name: specialization,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value.trim() === "") {
        e.target.focus();
      } else {
        if (nextRef.current) {
          nextRef.current.focus();
        }
      }
    }
  };
  const handleName = (event) => {
    setSpecialization(event.target.value);
    setErrorMessage("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;

    if (!specialization) {
      setErrorMessage("هذا الحقل مطلوب");
      hasError = true;
    } else {
      setErrorMessage("");
    }
    if (!depart) {
      setErrorMessage1("يرجى تحديد القسم الهندسي ");
      hasError = true;
    } else {
      setErrorMessage1("");
    }
    if (!hasError) {
      postFunc1();
      setSpecialization("");

      inputRef3.current.focus();
      setErrorMessage("");
    } else {
      createAlert("Error", "يرجى إدخال جميع الحقول المطلوبة");
    }
  };


  const handleLabelClick3 = () => {
    if (inputRef3.current) {
      inputRef3.current.focus();
    }
  };
  useEffect(() => {
    inputRef3.current.focus();
  }, []);
  return (
    <div className=" bg-gray-100 h-full w-full p-3">
      {/* <div className="w-full flex-col justify-center items-center p-2 md:flex md:flex-row md:justify-normal ">
        <div className=" relative w-full mt-3 flex justify-center items-center lg:px-6 ">
          <input
            type="search"
            placeholder="ابحث هنا"
            className=" bg-gray-300 w-full placeholder:text-black rounded-full p-3  pr-14"
          />
          <IoIosSearch className="absolute left-8 top-3  h-6 w-6  md:right-6 lg:right-10  " />
        </div>
      </div> */}
      {/* <div className="flex justify-between mb-3">

        <Quiries title="عرض جميع الاختصاصات الهندسية" link="/dashboard/allspecialization" />
        <Back />
      </div> */}
      <form onSubmit={handleSubmit} className="w-full max-w-4xl m-auto">

        <div className="flex flex-col p-2">
          <label
            className=" md:text-sm"
          >
            اختر قسم هندسي
          </label>
          <input
            type="text"
            className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
            value={depart}
            label=" اختر قسم هندسي"
            onChange={handleChange5b}
            style={{
              background: "white",
              // borderRadius: "40px",
              border: errorMessage1 != "" ? "1px solid red" : "none",
            }}
            list="round-name-156"  // ربط الـ input بـ datalist

          />
          <datalist id="round-name-156">
            {data4 &&
              data4.map((item) => (
                <option key={item.id}
                  value={item.name}> {item.name}</option>
              ))}
          </datalist>
        </div>

        <div className="flex flex-col p-2 ">
          <label
            className=" md:text-sm"
            onClick={handleLabelClick3}
            style={{ cursor: "pointer" }}
          >
            الاختصاص الهندسي
          </label>
          <input
            type="text"
            className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
            ref={inputRef3}
            value={specialization}
            onChange={handleName}
            onKeyDown={(e) => handleKeyDown(e, inputRef)}
            style={{
              border: errorMessage ? "1px solid red" : "none",
            }}
          />
          {errorMessage && (
            <div className="text-red-600 text-xs text-right mr-48  mt-2  ">
              {errorMessage}
            </div>
          )}
        </div>

        <div className="flex justify-end items-center w-full mt-32  ">
          <button
            className="flex justify-center items-center shadow-md rounded-lg h-10 w-48 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400"
            style={{ color: "white", fontSize: "18px" }}
            ref={inputRef}
            type="submit"
          // disabled={loading} // تعطيل الزر أثناء الإرسال
          >
            {false ? (
              <Spinner size="small" /> // عرض Spin عند الإرسال
            ) : (
              "إضافة"
            )}
          </button>

        </div >
      </form >

    </div >
  );
};

export default Specializatio;