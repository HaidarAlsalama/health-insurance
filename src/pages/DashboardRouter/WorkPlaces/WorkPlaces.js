
import { Spin } from "antd";
import { createAlert } from "components/Alert/Alert";
import config from "Constants/environment";
import useGet from "Custom Hooks/useGet";
import usePost from "Custom Hooks/usePost";
import { useEffect, useRef, useState } from "react";

const WorkPlaces = () => {
  const [nameW, setNameW] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [work, setWork] = useState("");
  const [workId, setWorkId] = useState("");
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage3, setErrorMessage3] = useState("");
  const handleLabelClick = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const [dataW, loading4hh4] = useGet(config.engineeringunits);
  const [dataWw, loading4hh44] = useGet(config.workplaces);

  const idWork =
    dataW &&
    dataW.reduce((acc, item) => {
      if (item.name === work) {
        return item.id;
      }
      return acc;
    }, null);

  const [loading, message, postFunc1] = usePost(config.workplaces, {
    name: nameW,
    location: location,
    phone: phone,
    engineeringUnitsId: idWork,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;

    if (!work) {
      setErrorMessage("يرجى تحديد الوحدة الهندسية ");
      hasError = true;
    } else {
      setErrorMessage("");
    }

    if (!nameW) {
      setErrorMessage2("هذا الحقل مطلوب");
      hasError = true;
    } else {
      setErrorMessage2("");
    }

    if (!location) {
      setErrorMessage3("هذا الحقل مطلوب");
      hasError = true;
    } else {
      setErrorMessage3("");
    }

    if (!hasError) {
      postFunc1();
      setNameW("");
      setLocation("");
      inputRef4.current.focus();
      setErrorMessage("");
      setErrorMessage2("");
      setErrorMessage3(""); // إعادة تعيين رسالة الخطأ عند الإرسال الناجح
      // createAlert("Success", تمت إضافة ${nameW} في ${work} بنجاح);
    } else {
      createAlert("Error", "يرجى إدخال جميع الحقول المطلوبة");
    }
  };

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

  const handleChange5b = (event) => {
    setWork(event.target.value);
    setErrorMessage("");
  };
  const handleNamew = (event) => {
    setNameW(event.target.value);
    setErrorMessage2("");
  };
  const handleLocation = (event) => {
    setLocation(event.target.value);
    setErrorMessage3("");
  };
  const handleChangeWork = (id3) => {
    setWorkId(id3);
  };


  useEffect(() => {
    inputRef3.current.focus();
  }, []); return (
    <div className="h-full bg-gray-100 p-3">
      {/* <div className="w-full flex-col justify-center items-center p-2 md:flex md:flex-row md:justify-normal">
        <div className="relative w-full mt-3 flex justify-center items-center lg:px-6">
          <input
            type="search"
            placeholder="ابحث هنا"
            className="bg-gray-300 w-full placeholder:text-black rounded-full p-3 pr-14"
          />
          <IoIosSearch className="absolute left-8 top-3 h-6 w-6 md:right-6 lg:right-10" />
        </div>
      </div> */}
      <div className="w-full">
        {/* <div className="flex justify-between mb-3">

          <Quiries title="عرض جميع أماكن العمل" link="/dashboard/allworks" />
          <Back />
        </div> */}

        <form onSubmit={handleSubmit} className="flex flex-col max-w-4xl m-auto">
          <div className="flex flex-col p-2">
            <label
              className=" md:text-sm"
            >
              الوحدة الهندسية
            </label>
            <input
              type="text"
              className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
              defaultValue={work}
              // work
              value={work}
              label=" الوحدة الهندسية"
              ref={inputRef3}
              onChange={handleChange5b}
              style={{
                background: "white",
                border: errorMessage ? "1px solid red" : "none",
              }}
              list="unite"  // ربط الـ input بـ datalist

            />
            <datalist id="unite">
              {dataW &&
                dataW.map((item) => (
                  <option key={item.id}
                    value={item.name}> {item.name}</option>
                ))}
            </datalist>
          </div>

          {/* <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 160 }}>
              <InputLabel id="demo-simple-select-label">
                اختر الوحدة الهندسية
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={work}
                onChange={handleChange5b}
                required
                style={{
                  background: "white",
                  borderRadius: "40px",
                  border: errorMessage ? "1px solid red" : "none",
                }}
              >
                {dataW &&
                  dataW.map((item3, index3) => (
                    <MenuItem
                      value={item3.name}
                      key={index3}
                      onClick={() => handleChangeWork(index3 + 1)}
                    >
                      {item3.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl> */}
          {/* {errorMessage && (
              <div className="text-red-600 text-xs text-right mr-3 mb-2  ">
                {errorMessage}
              </div>
            )} */}
          <div className="flex flex-col p-2">
            <label
              className=" md:text-sm mb-2 "
              onClick={() => handleLabelClick(inputRef4)}
              style={{ cursor: "pointer" }}
            >
              الاسم
            </label>
            <input
              ref={inputRef4}
              type="text"
              className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
              onChange={handleNamew}
              value={nameW}
              onKeyDown={(e) => handleKeyDown(e, inputRef5)}
              style={{
                border: errorMessage2 ? "1px solid red" : "none",
              }}
            />
            {errorMessage2 && (
              <div className="text-red-600 text-xs text-right mr-24 mb-2  ">
                {errorMessage2}
              </div>
            )}
          </div>
          <div className="flex flex-col p-2">
            <label
              className=" md:text-sm mb-2 "
              onClick={() => handleLabelClick(inputRef5)}
              style={{ cursor: "pointer" }}
            >
              الموقع
            </label>
            <input
              ref={inputRef5}
              type="text"
              className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
              onChange={handleLocation}
              value={location}
              onKeyDown={(e) => handleKeyDown(e, inputRef6)}
              style={{
                border: errorMessage3 ? "1px solid red" : "none",
              }}
            />
            {errorMessage3 && (
              <div className="text-red-600 text-xs text-right mr-24 mb-2  ">
                {errorMessage3}
              </div>
            )}
          </div>
          <div className="flex justify-end p-2 w-full"></div>
          <div className="flex justify-end p-2 w-full">
            <button
              className="flex justify-center items-center shadow-md rounded-full w-1/3 py-0 mt-2 h-10 md:w-1/4 lg:w-1/6 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400"
              style={{ color: "white", fontSize: "18px" }}
              disabled={loading} // تعطيل الزر أثناء الإرسال
            >
              {loading ? (
                <Spin size="small" /> // عرض Spin عند الإرسال
              ) : (
                "إضافة"
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default WorkPlaces;