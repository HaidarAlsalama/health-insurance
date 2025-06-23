
import config from "Constants/environment";
import useGet from "Custom Hooks/useGet";
import usePost from "Custom Hooks/usePost";
import { createAlert } from "components/Alert/Alert";
import Quiries from "components/Quiries/Quiries";
import { useEffect, useRef, useState } from "react";

const EngineeringeDepars = () => {
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  const [depart, setDepart] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleName = (event) => {
    setName(event.target.value);
    setErrorMessage("");
  };
  const handleChange5b = (event) => {
    setDepart(event.target.value);
  };
  const handleLabelClick1 = () => {
    if (inputRef1.current) {
      inputRef1.current.focus();
    }
  };
  const [data4, loading44] = useGet(config.engineeringedepars);
  const [loagindkk, message, postFunc] = usePost(config.engineeringedepars, {
    name: name,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;

    if (!name) {
      setErrorMessage("هذا الحقل مطلوب");
      hasError = true;
    } else {
      setErrorMessage("");
    }

    if (!hasError) {
      postFunc();
      setName("");

      inputRef.current.focus();
      setErrorMessage("");
    } else {
      createAlert("Error", "يرجى إدخال جميع الحقول المطلوبة");
    }
  };
  return (
    <div className=" bg-gray-100  w-full h-full p-1 ">
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
      {/* <div className="flex pt-3 md:w-full md:ml-3">
        <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 160 }}>
          <InputLabel label id="demo-simple-select-label">
            الأقسام الهندسية
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={depart}
            label="الأقسام الهندسية"
            onChange={handleChange5b}
            required
            style={{
              background: "white",
              borderRadius: "40px",
            }}
          >
            {data4 &&
              data4.map((item3, index3) => (
                <MenuItem value={item3.name} key={index3}>
                  {item3.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div> */}
      <div className="flex justify-between mb-3">

        <Quiries title="عرض جميع الأقسام الهندسية" link="/dashboard/engdepars" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap pt-10 md:w-full md:ml-3 mb-5">
          <label
            className="w-full text-lg md:w-2/5  mb-4 pr-10  md:mt-1 md:text-xl lg:w-1/3"
            onClick={handleLabelClick}
            style={{ cursor: "pointer" }}
          >
            اسم القسم الهندسي
          </label>
          <input
            type="text"
            className="rounded-2xl p-2  mr-5 w-3/4 md:w-1/2 md:ml-1"
            ref={inputRef}
            onChange={handleName}
            value={name}


            onKeyDown={(e) => handleKeyDown(e, inputRef1)}
            style={{
              border: errorMessage ? "1px solid red" : "none",
            }}
          />
          {errorMessage && (
            <div className="text-red-600 text-xs text-right mr-96 mb-2  ">
              {errorMessage}
            </div>
          )}
        </div>
        <div className="flex justify-end items-center w-full mt-80  ">
          <div className="flex justify-end p-2 w-full">
            <div
              className="flex justify-center items-center bg-slate-600 shadow-md rounded-full w-1/3 py-0 mt-2 h-10 md:w-1/4 lg:w-1/6"
              tabIndex={0}
              ref={inputRef1}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              onClick={handleSubmit}
              id="submitButton"
            >
              {/* <PiPlusCircle color="white" className="w-5 h-5 ml-2" /> */}
              <span style={{ color: "white" }}>إضافة</span>
            </div>
          </div>
        </div>
      </form>

    </div>
  );
};

export default EngineeringeDepars;