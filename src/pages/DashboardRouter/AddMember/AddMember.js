import axios from "axios";
import { createAlert } from "components/Alert/Alert";
import ContainerInputs from "components/ContainerInputs/ContainerInputs";
import Quiries from "components/Quiries/Quiries";
import { usePaginatedQuery } from "Custom Hooks/useGetData";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import config from "../../../Constants/environment";
const AddMember = () => {
  const token = useSelector((state) => state.auth?.token);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eng = queryParams.get("eng");

  useEffect(() => {
    if (eng)
      setNumber(eng);
  }, [eng])

  const [statusb, setStatusb] = useState("");
  const [familyb, setFamilyb] = useState("");
  const [statusReb, setStatusReb] = useState();
  const [relativeeb, setRelativeeb] = useState("");
  const [relativeY, setRelativeY] = useState("");
  const [firstNameb, setFirstNameb] = useState();
  const [lastNameb, setLastNameb] = useState();
  const [fatherNameb, setFatherNameb] = useState();
  const [motherNameb, setMotherNameb] = useState();
  const [emailb, setEmailb] = useState("");
  const [ensuranceNumberb, setEnsuranceNumberb] = useState("");
  const [addressb, setAddressb] = useState("");
  const [mobileb, setMobileb] = useState("");
  const [phoneb, setPhoneb] = useState("");
  const [birthDate, setBirthDate] = useState();
  const [gender2, setGender2] = useState();
  const [gender, setGender] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [fileName, setFileName] = useState("");
  const [engData, setEngData] = useState("");

  const [relationYear, loadingYear] = useState();
  const [file, setFile] = useState();
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");
  const [engId, setEngId] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage3, setErrorMessage3] = useState("");
  const [errorMessage4, setErrorMessage4] = useState("");
  const [errorMessage5, setErrorMessage5] = useState("");
  const [errorMessage6, setErrorMessage6] = useState("");
  const [errorMessage7, setErrorMessage7] = useState("");
  const [errorMessage8, setErrorMessage8] = useState("");
  const [errorMessage9, setErrorMessage9] = useState("");
  const [errorMessage10, setErrorMessage10] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [personId, setPersonsId] = useState("");
  const [personName, setPersonName] = useState("");
  const inputRef13 = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(localStorage.getItem("currentYear") || null);
  const inputRef9 = useRef(null);

  const [nationalIdb, setNationalIdb] = useState("");
  const [engRelateions, setEngRelateions] = useState([]);
  // const [data3b, loading6b, setPage, setPageSize] = useGet2(config.persons);

  // const [data4b, loading7b, setPage2, setPageSize2] = useGet2(config.engineers);

  // console.log(data4b);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getYear = localStorage.getItem("currentYear");
    if (getYear) setYear(getYear)
  }, []);

  const {
    data: d2,
    isLoading,
    isError,
  } = usePaginatedQuery(
    page,
    "items",
    `${config.baseUrl1}/${config.persons}`,
    10
  );
  const [data7, setData7] = useState(0);
  const [number, setNumber] = useState("");
  const [year, setYear] = useState();
  const [isEditable, setIsEditable] = useState(true);
  const [isNumberFound, setIsNumberFound] = useState(null);
  const checkNumber = () => {
    axios
      .get(`${config.baseUrl1}/${config.searchByNational}`, {

        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        }
        ,
        params: {
          nationalId: nationalIdb,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          createAlert("Error", "هذا الرقم الوطني موجود");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [images, setImages] = useState([]);
  const [wordF, setWordF] = useState([]);
  const [fileName2, setFileName2] = useState();
  const handleImages = (event) => {
    const selectedFiles = Array.from(event.target.files); // تحويل FileList إلى مصفوفة
    setImages(selectedFiles); // تعيين الملفات كمصفوفة
    setFileName(selectedFiles.map((file) => file.name).join(", ")); // عرض أسماء الملفات
  };
  const handleWord = (e) => {
    const selectedFiles = Array.from(e.target.files); // تحويل FileList إلى مصفوفة
    setWordF(selectedFiles); // تعيين الملفات كمصفوفة
    setFileName2(selectedFiles.map((file) => file.name).join(", ")); // عرض أسماء الملفات
  };
  const handleLabelClick13 = () => {
    if (inputRef13.current) {
      inputRef13.current.focus();
    }
  };
  useEffect(() => {
    if (number.length > 0) {
      axios
        .get(`${config.baseUrl1}/${config.searchByEng}/${number}`, {
          headers: {
            Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
          }
        })
        .then((res) => {
          console.log(res.data);
          setEngData(res.data);
          setEngId(res.data.personId);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [number]);

  // useEffect(() => {
  //   axios
  //     .get(`${config.baseUrl1}/Quiries/engineer with HisFamily/${number}`)
  //     .then((res) => {
  //       setEngRelateions('++++', res.data.relations);
  //       console.log('++++', res.data.relations);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [number]);

  useEffect(() => {
    axios
      .get(`${config.baseUrl1}/${config.annualdata}`, {
        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        },
        params: {
          birthdate: selectedDate,
          year: selectedDate2 || 0,
        },
      })
      .then((res) => {
        setData7(res.data);
        console.log("this is annaul data" + data7);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [selectedDate, selectedDate2, data7]);
  useEffect(() => {
    axios
      .get(
        `${config.baseUrl1}/${config.relationYear}`

        , {
          headers: {
            Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
          }
        }
      )
      .then((res) => {
        setRelativeY(res.data);
        console.log("reeeeeeeeeees", res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [selectedDate2]);
  // const handleChangeRelativeb = (id2) => {
  //   setRelativeeb(id2);
  //   console.log(relativeeb);
  // };


  const handleChangeRelativeb = (id2) => {
    setRelativeeb(id2);
    console.log(relativeeb);
  };
  const handleChangeGender = (id) => {
    setGender2(id);
    console.log(gender2);
  };

  useEffect(() => {
    if (statusb === "متزوج" && (familyb === "ابن" || familyb === "ابنة")) {
      setIsEditable(false);
      createAlert("Warning", "لا يمكن تأمين شخص متزوج");
    } else {
      setIsEditable(true);
    }
  }, [statusb, familyb]);
  const handleChangeStatusRb = (id3) => {
    setStatusReb(id3);
    console.log(statusReb);
  };
  const handleChange5b = (event) => {
    setStatusb(event.target.value);
    setErrorMessage3("");
  };
  const handleChange4b = (event) => {
    setFamilyb(event.target.value);
    setErrorMessage2("");
  };
  const [openb, setOpenb] = React.useState(false);

  const handleClickOpenb = () => {
    setOpenb(true);
  };

  const handleChange22 = (event) => {
    setGender(event.target.value);
    setErrorMessage4("");
  };

  const inputRefb = useRef(null);
  const inputRef1b = useRef(null);
  const inputRef2bb = useRef(null);
  const inputRef3b = useRef(null);
  const inputRef44b = useRef(null);
  const inputRef5b = useRef(null);
  const inputRef6b = useRef(null);
  const inputRef7b = useRef(null);
  const inputRef8b = useRef(null);
  const inputRef9b = useRef(null);
  const inputRef10b = useRef(null);
  const inputRef11b = useRef(null);
  const inputRef6b4 = useRef(null);
  const [message, setMessage] = useState();
  const handleLabelClickb = () => {
    if (inputRefb.current) {
      inputRefb.current.focus();
    }
  };
  const handleLabelClick1b = () => {
    if (inputRef1b.current) {
      inputRef1b.current.focus();
    }
  };

  const handleLabelClick2bb = () => {
    if (inputRef2bb.current) {
      inputRef2bb.current.focus();
    }
  };
  const handleLabelClick3b = () => {
    if (inputRef3b.current) {
      inputRef3b.current.focus();
    }
  };
  const handleLabelClick44b = () => {
    if (inputRef44b.current) {
      inputRef44b.current.focus();
    }
  };
  const handleLabelClick5b = () => {
    if (inputRef5b.current) {
      inputRef5b.current.focus();
    }
  };

  const handleLabelClick6b = () => {
    if (inputRef6b.current) {
      inputRef6b.current.focus();
    }
  };
  const handleLabelClick7b = () => {
    if (inputRef7b.current) {
      inputRef7b.current.focus();
    }
  };
  const handleLabelClick8b = () => {
    if (inputRef8b.current) {
      inputRef8b.current.focus();
    }
  };
  const handleLabelClick9b = () => {
    if (inputRef9b.current) {
      inputRef9b.current.focus();
    }
  };
  const handleLabelClick10b = () => {
    if (inputRef10b.current) {
      inputRef10b.current.focus();
    }
  };
  const handleLabelClick11b = () => {
    if (inputRef11b.current) {
      inputRef11b.current.focus();
    }
  };
  const handleChangeEng = (e) => {
    const newValue = e.target.value;
    // if (/^\d*$/.test(newValue)) {
    setNumber(newValue);
    setError1("");
    setErrorMessage1("");
    // } else {
    //   setError1("الرجاء إدخال أرقام فقط");
    // }
  };
  const handleChangeEnc = (e) => {
    const newValue = e.target.value;
    if (/^[\d-]*$/.test(newValue)) {
      setEnsuranceNumberb(newValue);
      setError3("");
      setErrorMessage8("");
    } else {
      setError3("الرجاء إدخال أرقام فقط ");
    }
  };
  const handleChangeNational = (e) => {
    const newValue = e.target.value;
    if (/^\d{0,11}$/.test(newValue)) {
      setNationalIdb(newValue);
      setError5("");
      setErrorMessage10("");
    } else {
      setError5("الرجاء إدخال أرقام فقط");
    }
  };
  const handleChangePhone = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setPhoneb(newValue);
      setError4("");
      // setErrorMessage8("")
    } else {
      setError4("الرجاء إدخال أرقام فقط");
    }
  };
  const handleChangeMobile = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setMobileb(newValue);
      setError2("");
      // setErrorMessage8("")
    } else {
      setError2("الرجاء إدخال أرقام فقط");
    }
  };

  const handleName = (e) => {
    setFirstNameb(e.target.value);
    setErrorMessage5("");
  };
  const handleLastName = (e) => {
    setLastNameb(e.target.value);
    setErrorMessage6("");
  };
  const handleFatherName = (e) => {
    setFatherNameb(e.target.value);
    setErrorMessage7("");
  };
  const handleMotherName = (e) => {
    setMotherNameb(e.target.value);
    setErrorMessage8("");
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        e.target.value.trim() === "" &&
        e.target !== inputRef6b.current &&
        e.target !== inputRef7b.current &&
        e.target != inputRef8b.current &&
        e.target != inputRef44b.current
      ) {
        e.target.focus();
      } else {
        if (nextRef.current) {
          nextRef.current.focus();
        }
      }
    }
  };
  const handleSubmitb = async (event) => {
    event.preventDefault();
    let hasError = false;
    if (!selectedDate) {
      createAlert('Warning', 'جميع الحقول مطلوبة')
      return
    }
    if (!number) {
      setErrorMessage1(null);
      hasError = true;
    } else {
      setErrorMessage1("");
    }
    if (!familyb) {
      setErrorMessage2(null);
      hasError = true;
    } else {
      setErrorMessage2("");
    }
    if (!statusb) {
      setErrorMessage3(null);
      hasError = true;
    } else {
      setErrorMessage3("");
    }
    if (!gender) {
      setErrorMessage4(null);
      hasError = true;
    } else {
      setErrorMessage4("");
    }
    if (!firstNameb) {
      setErrorMessage5(null);
      hasError = true;
    } else {
      setErrorMessage5("");
    }
    if (!lastNameb) {
      setErrorMessage6(null);
      hasError = true;
    } else {
      setErrorMessage6("");
    }
    if (!fatherNameb) {
      setErrorMessage7(null);
      hasError = true;
    } else {
      setErrorMessage7("");
    }
    if (!motherNameb) {
      setErrorMessage8(null);
      hasError = true;
    } else {
      setErrorMessage8("");
    }
    if (!ensuranceNumberb) {
      setErrorMessage9(null);
      hasError = true;
    } else {
      setErrorMessage9("");
    }
    if (!nationalIdb) {
      setErrorMessage10(null);
      hasError = true;
    } else {
      setErrorMessage10("");
    }
    if (!hasError) {
      const formData = new FormData();
      formData.append("firstName", firstNameb);
      formData.append("fatherName", fatherNameb);
      formData.append("lastName", lastNameb);
      formData.append("motherName", motherNameb);
      formData.append("nationalId", nationalIdb);
      formData.append("ensuranceNumber", ensuranceNumberb);
      formData.append("address", addressb);
      formData.append("phone", phoneb);
      formData.append(
        "birthDate",
        selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : ""
      ); // null value
      formData.append("subscrib", false); // boolean value
      formData.append("affiliate", false); // boolean value
      formData.append("beneficiary", false); // boolean value
      formData.append("mobile", mobileb); // null value
      formData.append("email", emailb);
      formData.append("genderId", gender); // numeric value
      formData.append("statusId", statusb); // numeric value
      formData.append("amount", 0);
      formData.append("engineereId", engId);
      formData.append("personId", 0);
      formData.append("relationTypeId", familyb);

      if (Array.isArray(images)) {
        images.forEach((image) => {
          formData.append("imageFiles", image); // هنا نضيف الصور بشكل مباشر
        });
      } else {
        console.error('The variable "images" is not an array.');
      }

      if (Array.isArray(wordF)) {
        wordF.forEach((file) => {
          formData.append("wordFiles", file); // هنا نضيف الصور بشكل مباشر
        });
      } else {
        console.error('The variable "images" is not an array.');
      }
      try {
        const response = await axios.post(
          `${config.baseUrl1}/${config.persons}?year=${year}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
            },
          }
        );


        // console.log("person id", insertedId);
        console.log(response);
        const insertedId = response.data.id;
        if (insertedId) {
          axios
            .get(`${config.baseUrl1}/${config.persons}/${insertedId}`, {
              headers: {
                Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
              }
            })
            .then((res) => {
              console.log(res.data);
              const fullName = `${res.data.firstName || ""} ${res.data.fatherName || ""
                } ${res.data.lastName || ""}`.trim();
              setPersonName(fullName);
            })
            .catch((err) => {
              console.log(err);
            });
          setIsShow(true);
        }
        console.log("person id ", insertedId);
        setPersonsId(insertedId);
        setMessage(response.status);
      } catch (error) {
        console.error("Error uploading data:", error);
        createAlert("Error", "فشل الارسال");
      }
      setFirstNameb("");
      setLastNameb("");
      setFatherNameb("");
      setMotherNameb("");
      setAddressb("");
      setEmailb("");
      setEnsuranceNumberb("");
      setNationalIdb("");
      // setNumber("");
      setMobileb("");
      setPhoneb("");
      setBirthDate("");
      setGender(0);
      setFamilyb(0);
      setStatusb(0);
      setSelectedDate("");
      // setEngData("null");
      setFileName("");
      setFileName2("");
      setImages([])
      setWordF([])


    } else {
      createAlert("Error", "يرجى إدخال جميع الحقول المطلوبة");
    }
  };
  useEffect(() => {
    const message1 = message; // Assuming you have another message state or prop

    if (message1 === 200) {
      setTimeout(() => {
        createAlert("Success", "نجاح الارسال");
        setMessage(null);
      }, 1000);
    }
  }, [message]);
  const [noteContent, setNoteContent] = useState("");
  const handleNoteChange = (event) => {
    setNoteContent(event.target.value); // تحديث حالة noteContent بناءً على إدخال المستخدم
  };
  const handleNoteSubmit = () => {
    if (!personId) {
      createAlert("Error", "يجب إضافة القريب أولًا قبل إرسال الملاحظات");
      return;
    } else {
      axios
        .post(`${config.baseUrl1}/${config.notes}`, {
          content: noteContent,
          personId: personId,
          relationId: 0,
          hospitalId: 0,
          surgicalProcedureId: 0,
          yearConfigId: 0,
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
          }
        })
        .then((res) => {
          if (res.status === 200) {
            createAlert("Success", "تمت إضافة الملاحظة بنجاح");
            setIsShow(false);
          }
        })
        .catch((err) => {
          console.log(err);
          createAlert("Error", "فشل الارسال");
          setIsShow(true);
        });
    }
  };
  useEffect(() => {
    inputRef5b.current.focus();
  }, []);

  const handleSearchForThis = () => {
    if (ensuranceNumberb.length > 10) {
      axios.get(`${config.baseUrl1}/Persons/CheckInsuranceStatus?insuranceNumber=${ensuranceNumberb}&year=${year}`, {
        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        }
      }

      ).then(
        res => {
          if (res.data.status == 200) {
            createAlert(res.data.type, res.data.message)
            setFirstNameb(res.data.data.firstName)
            setLastNameb(res.data.data.lastName)
            setFatherNameb(res.data.data.fatherName)
            setGender(res.data.data.gender)
            setNationalIdb(res.data.data.nationalId)
            setMobileb(res.data.data.phone)
          }
        }
      ).catch(err => {
        createAlert(err.response.data.type, err.response.data.message)
      })
    }
  }

  return (
    <div className="bg-gray-100 w-full p-1 rounded-lg">
      <div className="flex justify-between mb-3">
        <Quiries
          title="عرض معلومات أقارب المهندس"
          link={`/dashboard/allmember?eng=${number}`}
        />
        {/* <Back /> */}
      </div>

      <div className="flex  flex-col p-1">
        <form onSubmit={handleSubmitb}>
          <ContainerInputs title={'معلومات المهندس'} className="w-full  mb-2  p-3 md:grid !gap-4 md:grid-cols-2 ">
            <div className="flex flex-col gap-2">
              <label
                className=" md:w-2/5   md:text-sm md:mt-1 flex items-center lg:ml-5"
                onClick={handleLabelClick11b}
                style={{ cursor: "pointer" }}
              >
                الرقم الهندسي
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400" ref={inputRef11b}
                onChange={handleChangeEng}
                disabled={!isEditable}
                placeholder={error1}
                value={number}
                style={{
                  border: errorMessage1 == null ? "1px solid red" : "none",
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className=""
                onClick={handleLabelClick1b}
                style={{ cursor: "pointer" }}
              >
                اسم المهندس
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                // ref={inputRef1b}
                disabled={!isEditable}
                value={
                  engData
                    ? `${engData.firstName} ${engData.fatherName} ${engData.lastName}`
                    : ""
                }
                onKeyDown={(e) => handleKeyDown(e, inputRefb)}
                style={{
                  border: errorMessage6 == null ? "1px solid red" : "none",
                }}
              />
            </div>

          </ContainerInputs>

          {/* <div className="w-full gap-4 p-3 grid grid-cols-1 md:grid-cols-3">

         

            {/* 
              <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 160 }}>
                <InputLabel label id="demo-simple-select-label">
                  درجة القرابة
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={familyb}
                  label="درجة القرابة "
                  onChange={handleChange4b}
                  style={{
                    background: "white",
                    // borderRadius: "40px",
                    border: errorMessage2 == null ? "1px solid red" : "none",
                  }}
                >
                  {relativeY &&
                    relativeY.map((item2) => (
                      <MenuItem
                        value={item2.relationName}
                        key={item2.relationId}
                        onClick={() => handleChangeRelativeb(item2.relationId)}
                      >
                        {item2.relationName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl> */}

          {/* <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 160 }}>
                <InputLabel label id="demo-simple-select-label">
                  الحالة الاجتماعية
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={statusb}
                  label=" الحالة الاجتماعية"
                  onChange={handleChange5b}
                  style={{
                    background: "white",
                    // borderRadius: "40px",
                    border: errorMessage3 == null ? "1px solid red" : "none",
                  }}
                >
                  {statusR &&
                    statusR.map((item3, index3) => (
                      <MenuItem
                        value={item3}
                        key={index3}
                        onClick={() => handleChangeStatusRb(index3 + 1)}
                      >
                        {item3}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl> */}

          {/* <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 160 }}>
                <InputLabel label id="demo-simple-select-label">
                  الجنس
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="الجنس"
                  onChange={handleChange22}
                  style={{
                    background: "white",
                    // borderRadius: "40px",
                    border: errorMessage4 == null ? "1px solid red" : "none",
                  }}
                >
                  {gender3 &&
                    gender3.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item}
                        onClick={() => {
                          handleChangeGender(index + 1);
                        }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl> */}
          {/* </div> * */}

          <ContainerInputs title={'معلومات قريب المهندسي'} className="w-full !gap-4 p-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">

            <div className="flex flex-col gap-2">
              <label
                className=" md:text-sm flex items-center"
                onClick={handleLabelClick5b}
                style={{ cursor: "pointer" }}
              >
                رقم التأمين
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef5b}
                onChange={handleChangeEnc}
                disabled={!isEditable}
                onBlur={handleSearchForThis}
                maxLength="13"
                value={ensuranceNumberb}
                placeholder={error3}
                onKeyDown={(e) => handleKeyDown(e, inputRef10b)}
                style={{
                  border: errorMessage9 == null ? "1px solid red" : "none",
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="  md:text-sm md:mt-1 flex items-center "
                onClick={handleLabelClickb}
                style={{ cursor: "pointer" }}
              >
                الاسم              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRefb}
                onChange={handleName}
                disabled={!isEditable}
                value={firstNameb}
                onKeyDown={(e) => handleKeyDown(e, inputRef1b)}
                style={{
                  border: errorMessage5 == null ? "1px solid red" : "none",
                }}
              />
            </div>


            <div className="flex flex-col gap-2">
              <label
                className=" md:text-sm flex items-center"
                onClick={handleLabelClick2bb}
                style={{ cursor: "pointer" }}
              >
                اسم الأب
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400" ref={inputRef2bb}
                onChange={handleFatherName}
                disabled={!isEditable}
                value={fatherNameb}
                onKeyDown={(e) => handleKeyDown(e, inputRef3b)}
                style={{
                  border: errorMessage7 == null ? "1px solid red" : "none",
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className=""
                onClick={handleLabelClick1b}
                style={{ cursor: "pointer" }}
              >
                الكنية
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef1b}
                onChange={handleLastName}
                disabled={!isEditable}
                value={lastNameb}
                onKeyDown={(e) => handleKeyDown(e, inputRef2bb)}
                style={{
                  border: errorMessage6 == null ? "1px solid red" : "none",
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className=" md:text-sm md:ml-4 flex items-center"
                onClick={handleLabelClick3b}
                style={{ cursor: "pointer" }}
              >
                اسم الأم
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef3b}
                onChange={handleMotherName}
                disabled={!isEditable}
                value={motherNameb}
                onKeyDown={(e) => handleKeyDown(e, inputRef44b)}
                style={{
                  border: errorMessage8 == null ? "1px solid red" : "none",
                }}
              />
            </div>

            <div className="flex flex-col p-2 ">
              <label
                className=" md:text-sm"
              >
                الجنس
              </label>
              <select
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"

                defaultValue={gender}
                value={gender}
                label="الجنس"
                onChange={handleChange22}
              >
                <option value="0" > الجنس</option>
                <option value="1">ذكر</option>
                <option value="2">انثى</option>
              </select>
            </div>

            <div className="flex flex-col p-2 ">
              <label
                className=" md:text-sm"
              >
                درجة القرابة
              </label>
              <select
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                defaultValue={familyb}
                value={familyb}
                label=" درجة القرابة"
                onChange={handleChange4b}
                style={{
                  background: "white",
                  // borderRadius: "40px",
                  border: errorMessage2 == null ? "1px solid red" : "none",
                }}
              >
                <option value="0" >يرجى تحديد درجة القرابة</option>
                {relativeY &&
                  relativeY.map((item) => (
                    <option key={item.relationId}
                      value={item.relationId}
                      onClick={() => handleChangeRelativeb(item.relationId)}
                    > {item.relationName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-col p-2 ">
              <label
                className=" md:text-sm"

              >
                الحالة الاجتماعية
              </label>
              <select
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                defaultValue={statusb}
                value={statusb}
                label="الحالة الاجتماعية"
                onChange={handleChange5b}
                style={{
                  background: "white",
                  // borderRadius: "40px",
                  border: errorMessage3 == null ? "1px solid red" : "none",
                }}
              >
                <option value="0" > الحالة الاجتماعية</option>
                <option value="1" >متزوج</option>
                <option value="2" >عازب</option>
                <option value="3" >منفصل</option>

              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className=" md:text-sm flex items-center"
                onClick={handleLabelClick44b}
                style={{ cursor: "pointer" }}
              >
                العنوان
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400" ref={inputRef44b}
                onChange={(e) => setAddressb(e.target.value)}
                disabled={!isEditable}
                value={addressb}
                onKeyDown={(e) => handleKeyDown(e, inputRef5b)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className=" md:text-sm md:ml-4 flex items-center "
                onClick={handleLabelClick10b}
                style={{ cursor: "pointer" }}
              >
                الرقم الوطني
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400" ref={inputRef10b}
                onChange={handleChangeNational}
                onBlur={checkNumber}
                disabled={!isEditable}
                value={nationalIdb}
                placeholder={error5}
                onKeyDown={(e) => handleKeyDown(e, inputRef7b)}
                style={{
                  border: errorMessage10 == null ? "1px solid red" : "none",
                }}
              />
            </div>

            <div className="flex flex-col p-2">
              <label
                className=" md:text-sm mb-2 "

              >
                تاريخ الميلاد
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setBirthDate(e.target.value);
                }}
                placeholder="اضغط لاختيار التاريخ"
                className="shadow appearance-none border text-gray-700 leading-tight outline-none focus:ring-1 ring-blue-400 rounded-lg p-2 " />
            </div>


            <div className="flex flex-col gap-2">
              <label
                className=" text-sm flex items-center lg:ml-3"
                onClick={handleLabelClick7b}
                style={{ cursor: "pointer" }}
              >
                الهاتف
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef7b}
                onChange={handleChangePhone}
                disabled={!isEditable}
                placeholder={error4}
                value={phoneb}
                onKeyDown={(e) => handleKeyDown(e, inputRef6b)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className=" md:text-sm flex items-center"
                onClick={handleLabelClick6b}
                style={{ cursor: "pointer" }}
              >
                البريد الالكتروني
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400" ref={inputRef6b}
                onChange={(e) => setEmailb(e.target.value)}
                disabled={!isEditable}
                value={emailb}
                onKeyDown={(e) => handleKeyDown(e, inputRef8b)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className=" md:text-sm flex items-center"
                onClick={handleLabelClick8b}
                style={{ cursor: "pointer" }}
              >
                الموبايل
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400" ref={inputRef8b}
                onChange={handleChangeMobile}
                disabled={!isEditable}
                placeholder={error2}
                value={mobileb}
                onKeyDown={(e) => handleKeyDown(e, inputRef6b4)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className=" md:text-sm     ">
                القسط السنوي
              </p>
              <p className="rounded-lg p-2 mt-2 ml-10 w-full bg-white  md:ml-1 shadow-md">
                {selectedDate ? data7 : 0}
              </p>
            </div>
          </ContainerInputs>

          <ContainerInputs title={'المرفقات'} className="w-full mb-2 justify-start flex flex-col gap-2  items-center p-3 md:flex md:flex-row ">
            {/* <div className=" flex justify-start items-center mb-5 md:mb-0 ">
              <label
                htmlFor="file-upload"
                className="text-center ml-8 bg-slate-600 rounded-full text-xs p-2 md:text-sm text-white "
              >
                استعراض صورة
              </label>
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleImages}
                accept="image/*"
              />
              <input
                type="text"
                value={fileName}
                readOnly
                placeholder="رابط الملف"
                className="w-2/4 bg-white rounded-full p-2 md:p-3    lg:-mr-2"
              />
            </div>
            <div className=" flex justify-start items-center  ">
              <label
                htmlFor="file-upload1"
                className="text-center ml-8 bg-slate-600 rounded-full text-xs p-2 md:text-sm text-white "
              >
                استعراض ملف وورد
              </label>
              <input
                type="file"
                id="file-upload1"
                style={{ display: "none" }}
                onChange={handleWord}
                multiple
                accept=".doc,.docx"
              />

              <input
                type="text"
                value={fileName2}
                readOnly
                placeholder="رابط الملف"
                className="w-2/4 bg-white rounded-full p-2 md:p-3 lg:-mr-2  "
              />
            </div> */}
            <div className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400">
              <label
                htmlFor="file-upload"
                className=" md:text-sm"                >
                استعراض صورة
              </label>
              <input
                type="file"
                id="file-upload"
                className=" w-full mt-2 file:outline-none file:border-0 file:dark:bg-gray-800 file:bg-gray-50  file:py-1 file:px-2 file:rounded-full file:dark:text-white file:text-gray-700 file:mr-3 file:shadow-none file:cursor-pointer bg-gray-200 dark:bg-gray-600 px-5 py-3 rounded-lg  cursor-pointer hover:bg-slate-300 hover:dark:bg-slate-500 "

                // style={{ display: "none" }}
                onChange={handleImages}
                multiple
                accept="image/*"
              />
            </div>


            <div className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400">
              <label
                htmlFor="file-upload1"
                className=" md:text-sm"              >
                استعراض ملف وورد
              </label>
              <input
                type="file"
                className=" w-full mt-2 file:outline-none file:border-0 file:dark:bg-gray-800 file:bg-gray-50  file:py-1 file:px-2 file:rounded-full file:dark:text-white file:text-gray-700 file:mr-3 file:shadow-none file:cursor-pointer bg-gray-200 dark:bg-gray-600 px-5 py-3 rounded-lg  cursor-pointer hover:bg-slate-300 hover:dark:bg-slate-500 "
                id="file-upload1"
                onChange={handleWord}
                multiple
                accept=".doc,.docx"
              />


            </div>
          </ContainerInputs>

          {/* {isShow == true ? (
            <>
              <div className="flex flex-col gap-2 mt-6 p-5">
                <label
                  onClick={handleLabelClick13}
                  style={{ cursor: "pointer" }}
                >
                  اضافة ملاحظات
                </label>
                <div className="flex relative">
                  <textarea
                    ref={inputRef13}
                    name="postContent"
                    placeholder={
                      personName
                        ? `إضافة ملاحظة للقريب ${personName}`
                        : "إضافة ملاحظة"
                    }
                    rows={4}
                    cols={200}
                    onChange={handleNoteChange}
                    value={noteContent}
                    className="  p-4 bg-gray-100 border border-black rounded-lg placeholder:p-4"
                  ></textarea>
                  <BsFillSendFill
                    className=" absolute bottom-2 left-10 "
                    size={25}
                    onClick={handleNoteSubmit}
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )} */}

          <div className="flex  justify-end p-2 w-full">
            <input
              onClick={handleClickOpenb}
              className="flex justify-center items-center bg-slate-600 shadow-md rounded-lg w-1/3 py-0  mt-2  h-10 md:w-1/4  lg:w-1/6 cursor-pointer"
              style={{ color: "white" }}
              value="إضافة"
              type="submit"
              ref={inputRef6b4}
            />
          </div>
        </form>
      </div >
    </div >
  );
};

export default AddMember;
