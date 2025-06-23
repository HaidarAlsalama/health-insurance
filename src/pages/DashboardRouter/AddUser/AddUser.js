import { useEffect, useRef, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import config from "../../../Constants/environment";
import useGet from "../../../Custom Hooks/useGet";

import { usePaginatedQuery } from "Custom Hooks/useGetData";
import axios from "axios";
import { createAlert } from "components/Alert/Alert";
import Quiries from "components/Quiries/Quiries";
import moment from "moment";
import { NavLink, useNavigate } from "react-router-dom";

import { Spinner } from "components";
import { useSelector } from "react-redux";
import yy from './الاختصاصات.json';
import xx from './اماكن العمل.json';

const AddUser = () => {
  const [gender, setGender] = useState(0);

  const [work, setWork] = useState(0);
  const [workName, setWorkName] = useState('');

  const [socialStatus, setSocialStatus] = useState(0);

  const [option, setOption] = useState(0);
  const [optionName, setOptionName] = useState('');

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");
  const [error6, setError6] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(localStorage.getItem("currentYear") || null);
  const handleChange22 = (event) => {
    setGender(event.target.value);

    setErrorMessage10("");
  };

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
  const [errorMessage11, setErrorMessage11] = useState("");
  const [errorMessage12, setErrorMessage12] = useState("");
  const [errorMessage13, setErrorMessage13] = useState("");

  const [message, setMessage] = useState();
  const [isNumberFound, setIsNumberFound] = useState(false);
  const [isNumberFoundEng, setIsNumberFoundEng] = useState(false);
  const [isNumberFoundSub, setIsNumberFoundSub] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const getYear = localStorage.getItem("currentYear");
    if (!getYear) navigate('/dashboard/static')
    else setYear(getYear)
  }, []);

  const handleChange3 = (event) => {
    setWork(event.target.value || 0);
    // const selectedOption = options.find((option) => option.name === selectedName);
    setWorkName(dataw.find(x => x.id == event.target.value)?.name);
    setErrorMessage11("");
  };

  const handleChangeNational = (e) => {
    const newValue = e.target.value;
    if (/^\d{0,11}$/.test(newValue)) {
      // يسمح فقط بالأرقام من 0 إلى 11
      setNationalId(newValue);
      console.log(nationalId);
      setErrorMessage6("");
      setError("");
    } else {
      setError("الرجاء إدخال أرقام فقط وبحد أقصى 11 رقمًا");
    }
  };

  const handleChangeSub = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setSubNumber(newValue);
      setError2("");
      setErrorMessage7("");
    } else {
      setError2("الرجاء إدخال أرقام فقط");
    }
  };

  const handleChangeEnc = (e) => {
    const newValue = e.target.value;
    if (/^[\d-]*$/.test(newValue)) {
      setEnsuranceNumber(newValue);
      setError3("");
      setErrorMessage8("");
    } else {
      setError3("الرجاء إدخال أرقام فقط ");
    }
  };
  // const handleChangeEng = (e) => {
  //   const newValue = e.target.value;
  //   if (/^\d*$/.test(newValue)) {
  //     setEngNumber(newValue);
  //     setForSend(newValue);
  //     setError4("");
  //     setErrorMessage9("");
  //   } else {
  //     setError4("الرجاء إدخال أرقام فقط");
  //   }
  // };
  const handleChangePhone6 = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setMobile(newValue);
      setError6("");
    } else {
      setError6("الرجاء إدخال أرقام فقط");
    }
  };
  const handleChangePhone5 = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setPhone(newValue);
      setError5("");
    } else {
      setError5("الرجاء إدخال أرقام فقط");
    }
  };
  const handleChange5 = (event) => {
    setSocialStatus(event.target.value);
    setErrorMessage13("");
  };
  const handleChange6 = (event) => {
    setOption(event.target.value);
    setOptionName(specializatio.find(y => y.id == event.target.value)?.name);

    setErrorMessage12("");
  };
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const handleImages = (event) => {
    const selectedFiles = Array.from(event.target.files);

    setImages(selectedFiles);
    setFileName(selectedFiles.map((file) => file.name).join(", "));
  };

  const [open, setOpen] = useState(false);
  const [username3, setUserName3] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [lastName, setLastName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [nationalId, setNationalId] = useState("");
  const [ensuranceNumber, setEnsuranceNumber] = useState("");
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender2, setGender2] = useState();
  // const [engNumber, setEngNumber] = useState("");
  const [forSend, setForSend] = useState(0);
  const [subNumber, setSubNumber] = useState("");
  const [status3, setStatus3] = useState();
  const [specialization, setSpecialization] = useState();
  const [workPlace, setWorkPlace] = useState();
  const [images, setImages] = useState([]);
  const [wordF, setWordF] = useState([]);

  const [year, setYear] = useState();
  // const [pay, setPay] = useState();
  const [engName, setEngName] = useState("");
  const handleChangeGender = (id) => {
    setGender2(id);
    console.log(gender2);
  };

  const handeleChangeStatus = (id3) => {
    setStatus3(id3);

    console.log(status3);
  };
  const handleChangeSpec = (id4) => {
    setSpecialization(id4);
    console.log(id4);
  };
  const handleChangeWork = (id4) => {
    setWorkPlace(id4);
    console.log(id4);
  };

  const handleEngName = (e) => {
    setUserName3(e.target.value);
    setErrorMessage1("");
  };

  const [fileName2, setFileName2] = useState();
  const handleWord = (e) => {
    const selectedFiles = Array.from(e.target.files); // تحويل FileList إلى مصفوفة
    setWordF(selectedFiles); // تعيين الملفات كمصفوفة
    setFileName2(selectedFiles.map((file) => file.name).join(", ")); // عرض أسماء الملفات
  };
  const handleLastN = (e) => {
    setLastName(e.target.value);
    setErrorMessage2("");
  };
  const handleFatherN = (e) => {
    setFatherName(e.target.value);
    setErrorMessage3("");
  };
  const handleMotherN = (e) => {
    setMotherName(e.target.value);
    setErrorMessage4("");
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrorMessage5("");
  };
  const [loading, setLoading] = useState(false);

  const [dataw, loadingW] = useGet(config.workplaces);
  const [dataU, loadingU] = useGet(config.engineeringunits);
  const [page, setPage] = useState(1);
  // const [data8, loading8, setPage, setPageSize] = useGet2(config.persons);
  const {
    data: d1,
    isLoading,
    isError,
  } = usePaginatedQuery(
    page,
    "items",
    `${config.baseUrl1}/${config.engineers}`,
    10
  );

  const [data7, setData7] = useState(0);
  useEffect(() => {
    axios
      .get(`${config.baseUrl1}/${config.annualdata}`, {
        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        },
        params: {
          birthdate: selectedDate,
          year: selectedDate2,
        },
      })
      .then((res) => {
        setData7(res.data);
        console.log("this is annaul data aaaaa", res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [selectedDate, selectedDate2, data7]);

  const handleLabelClick13 = () => {
    if (inputRef13.current) {
      inputRef13.current.focus();
    }
  };

  useEffect(() => {
    const message1 = message; // Assuming you have another message state or prop
    // const message2 = 200; // For demonstration purposes, assuming second message is always 200

    if (message1 === 200) {
      setTimeout(() => {
        createAlert("Success", "نجاح الارسال");
        setMessage(null);
      }, 1000);
    }
  }, [message]);
  // console.log(birthDate);
  console.log("images" + images);
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const inputRef7 = useRef(null);
  const inputRef8 = useRef(null);
  const inputRef9 = useRef(null);
  const inputRef10 = useRef(null);
  const inputRef11 = useRef(null);
  const inputRef12 = useRef(null);
  const inputRef13 = useRef(null);
  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleLabelClick1 = () => {
    if (inputRef1.current) {
      inputRef1.current.focus();
    }
  };
  const handleLabelClick2 = () => {
    if (inputRef2.current) {
      inputRef2.current.focus();
    }
  };
  const handleLabelClick3 = () => {
    if (inputRef3.current) {
      inputRef3.current.focus();
    }
  };
  const handleLabelClick4 = () => {
    if (inputRef4.current) {
      inputRef4.current.focus();
    }
  };
  const handleLabelClick5 = () => {
    if (inputRef5.current) {
      inputRef5.current.focus();
    }
  };
  const handleLabelClick6 = () => {
    if (inputRef6.current) {
      inputRef6.current.focus();
    }
  };
  const handleLabelClick7 = () => {
    if (inputRef7.current) {
      inputRef7.current.focus();
    }
  };
  const handleLabelClick8 = () => {
    if (inputRef8.current) {
      inputRef8.current.focus();
    }
  };
  const handleLabelClick9 = () => {
    if (inputRef9.current) {
      inputRef9.current.focus();
    }
  };
  const handleLabelClick10 = () => {
    if (inputRef10.current) {
      inputRef10.current.focus();
    }
  };
  const handleLabelClick11 = () => {
    if (inputRef11.current) {
      inputRef11.current.focus();
    }
  };
  const handleLabelClick12 = () => {
    if (inputRef12.current) {
      inputRef12.current.focus();
    }
  };

  const [specializatio] = useGet(config.specializations);
  useEffect(() => {
    inputRef8.current.focus();
  }, []);

  const checkNumber = async (nationalId) => {
    // تحقق من طول الرقم الوطني
    if (nationalId && nationalId.length < 11) {
      createAlert("Error", "الرقم الوطني يجب أن يكون 11 رقماً ");
      setIsNumberFound(false);
      return; // الخروج من الدالة إذا كان الطول أقل من 11
    }

    // إذا كان الطول صحيحاً، نرسل الطلب
    await axios
      .get(`${config.baseUrl1}/${config.searchByNational}`, {
        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        },
        params: {
          nationalId: nationalId,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          createAlert("Error", "هذا الرقم الوطني موجود");
          setIsNumberFound(true);
        } else {
          setIsNumberFound(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const checkNumberEng = () => {
  //   axios
  //     .get(`${config.baseUrl1}/${config.searchByEng}/${engNumber}`)
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status === 200) {
  //         createAlert("Error", "هذا الرقم الهندسي موجود");
  //         setIsNumberFoundEng(true);
  //       } else {
  //         setIsNumberFoundEng(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const checkNumberSub = () => {
    axios
      .get(`${config.baseUrl1}/${config.searchBySub}/${subNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        }
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          createAlert("Error", "هذا الرقم الفرعي موجود");
          setIsNumberFoundSub(true);
        } else {
          setIsNumberFoundSub(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [noteContent, setNoteContent] = useState("");
  // const [personsId, setPersonsId] = useState();
  const [nePersonId, setNePersonId] = useState(null); // State to hold the person ID
  const handleNoteChange = (event) => {
    setNoteContent(event.target.value); // تحديث حالة noteContent بناءً على إدخال المستخدم
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;
    // await checkNumber(); // الانتظار حتى يتم فحص الرقم الوطني

    // إذا كان الرقم الوطني موجودًا، إيقاف العملية وعرض رسالة الخطأ
    // if (isNumberFound) {
    //   return;
    //   // إيقاف العملية ومنع إرسال النموذج
    // }
    if (!username3) {
      setErrorMessage1(null);
      hasError = true;
    } else {
      setErrorMessage1("");
    }

    if (!selectedDate) {
      createAlert('Warning', 'جميع الحقول مطلوبة')
      return
    }

    if (!lastName) {
      setErrorMessage2(null);
      hasError = true;
    } else {
      setErrorMessage2("");
    }

    if (!fatherName) {
      setErrorMessage3(null);
      hasError = true;
    } else {
      setErrorMessage3("");
    }

    if (!motherName) {
      setErrorMessage4(null);
      hasError = true;
    } else {
      setErrorMessage4("");
    }

    // if (!address) {
    //   setErrorMessage5(null);
    //   hasError = true;
    // } else {
    //   setErrorMessage5("");
    // }

    if (!nationalId) {
      setErrorMessage6(null);
      hasError = true;
    } else {
      setErrorMessage6("");
    }

    // if (!subNumber) {
    //   setErrorMessage7(null);
    //   hasError = true;
    // } else {
    //   setErrorMessage7("");
    // }

    if (!ensuranceNumber) {
      setErrorMessage8(null);
      hasError = true;
    } else {
      setErrorMessage8("");
    }

    if (!engNumber) {
      setErrorMessage9(null);
      hasError = true;
    } else {
      setErrorMessage9("");
    }

    if (!gender) {
      setErrorMessage10(null);
      hasError = true;
    } else {
      setErrorMessage10("");
    }

    if (!work) {
      setErrorMessage11(null);
      hasError = true;
    } else {
      setErrorMessage11("");
    }

    if (!option) {
      setErrorMessage12(null);
      hasError = true;
    } else {
      setErrorMessage12("");
    }

    if (!socialStatus) {
      setErrorMessage13(null);
      hasError = true;
    } else {
      setErrorMessage13("");
    }

    if (!hasError) {
      const formData = new FormData();

      formData.append("firstName", username3);
      formData.append("fatherName", fatherName);
      formData.append("lastName", lastName);
      formData.append("motherName", motherName);
      formData.append(
        "birthDate",
        selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : ""
      );

      formData.append("nationalId", nationalId);
      formData.append("ensuranceNumber", ensuranceNumber);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("genderId", gender);
      formData.append("engNumber", engNumber);
      formData.append("subNumber", subNumber);
      formData.append("statusId", socialStatus);
      formData.append("specializationId", option);
      formData.append("workPlaceId", work);

      if (Array.isArray(images)) {
        images.forEach((image) => {
          formData.append("contentImage", image); // هنا نضيف الصور بشكل مباشر
        });
      } else {
        console.error('The variable "images" is not an array.');
      }

      // Assuming you have other files to upload
      if (Array.isArray(wordF)) {
        wordF.forEach((file) => {
          formData.append("contentFile", file); // هنا نضيف الصور بشكل مباشر
        });
      } else {
        console.error('The variable "images" is not an array.');
      }
      setLoading(true);
      try {
        const response = await axios.post(
          `${config.baseUrl1}/${config.engineers}?year=${year}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
            },
          }
        );

        const insertedId = response.data.insertedId;
        if (insertedId) {
          axios
            .get(`${config.baseUrl1}/${config.engineers}/${insertedId}`, {
              headers: {
                Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
              }
            })
            .then((res) => {
              console.log(res.data);
              const fullName = `${res.data.firstName || ""} ${res.data.fatherName || ""
                } ${res.data.lastName || ""}`.trim();
              setEngName(fullName);
            })
            .catch((err) => {
              console.log(err);
            });
          setShow(true);
        }
        // احصل على insertedId من استجابة الطلب الأول
        console.log("person id", insertedId);
        setNePersonId(insertedId); // Store the new person ID in state
        await handleAddNote(insertedId); // Call the note addition directly if you want

        setMessage(response.status);
      } catch (error) {
        console.error("Error uploading data:", error);
        createAlert("Error", "فشل الارسال");
      } finally {
        setLoading(false);
      }
      // Reset fields
      setUserName3("");
      setFatherName("");
      setLastName("");
      setMotherName("");
      setAddress("");
      setEmail("");
      inputRef.current.focus();
      setEnsuranceNumber("");
      setMobile("");
      setPhone("");
      setSelectedDate(null);
      setOption(0)
      setOptionName('')
      setWork(0)
      setWorkName('')
      setGender(0)
      // setSelectedDate2(null); // Reset date to null
      setNationalId("");
      setGender(""); // Reset gender select
      setEngNumber("");
      setSubNumber("");
      setSocialStatus(""); // Reset status select
      setOption(""); // Reset option select
      setFileName("");
      setFileName2("");
      // Reset work select
    } else {
      createAlert("Error", "يرجى إدخال جميع الحقول المطلوبة");
    }
  };

  const handleAddNote = async (nePersonId) => {
    if (!nePersonId) {
      createAlert("Error", "يجب إضافة مهندس أولًا قبل إرسال الملاحظات");
      return;
    }

    const noteData = {
      content: noteContent, // الملاحظات التي أدخلها المستخدم
      personId: nePersonId, // استخدام newPersonId بدلاً من personsId
      relationId: 0,
      hospitalId: 0,
      surgicalProcedureId: 0,
      yearConfigId: 0,
    };

    console.log("Note data being sent:", noteData);

    try {
      const response2 = await axios.post(
        `${config.baseUrl1}/${config.notes}`,
        noteData, {
        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        }
      }
      );
      console.log("Note added:", response2.data);

      setMessage("تم إضافة الملاحظات بنجاح!");
      // createAlert("Success", "تمت اضافه الملاحظه");
    } catch (error) {
      console.error("Error adding note:", error);
      createAlert("Error", "فشل في إضافة الملاحظات");
    }
  };

  const handleNoteSubmit = () => {
    if (nePersonId) {
      handleAddNote(nePersonId); // Pass the correct person ID
      createAlert("Success", "تمت اضافه الملاحظه");
      setShow(false);
    } else {
      createAlert("Error", "يجب إضافة مهندس أولًا قبل إرسال الملاحظات");
    }
  };

  const [query, setQuery] = useState('');    // قيمة المدخل
  const [engNumber, setEngNumber] = useState('');  // القيمة النهائية للبحث

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setEngNumber(query)
      setForSend(query)
    }, 800)
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    if (engNumber != "") {
      axios
        .get(`${config.baseUrl1}/Engineers/GetByEngNumber/${engNumber}`, {
          headers: {
            Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
          }
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setUserName3(res.data.firstName)
            setFatherName(res.data.fatherName)
            setLastName(res.data.lastName)
            setMotherName(res.data.motherName)
            setGender(res.data.gender == 'ذكر' ? 1 : 0)
            setAddress(res.data.placeBirth)
          } else if (res.status == 204) {
            createAlert("Error", "هذا الرقم الهندسي غير موجود");
            setUserName3('')
            setFatherName('')
            setLastName('')
            setMotherName('')
            setGender(0)
            setAddress('')
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUserName3('')
      setFatherName('')
      setLastName('')
      setMotherName('')
      setGender(0)
      setAddress('')
    }
  }, [engNumber]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // التحقق من أن المدخل هو رقم فقط
    // if (/^\d*$/.test(value)) {
    setQuery(value);
    // }
  };

  const handleSearchForThis = () => {
    axios.get(`${config.baseUrl1}/Persons/CheckInsuranceStatus?insuranceNumber=${ensuranceNumber}&year=${year}`, {
      headers: {
        Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
      }
    }).then(
      res => {
        if (res.data.status == 200) {
          createAlert(res.data.type, res.data.message)
        }
      }
    ).catch(err => {
      createAlert(err.response.data.type, err.response.data.message)
    })
  }


  return (
    <div className="bg-gray-100 w-full p-1 rounded-lg">
      <div className="flex justify-between">
        <Quiries title="عرض ذاتية المشتركين" link="/dashboard/alleng" />
        {/* <Back /> */}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="w-full ">
          <div className="w-full  p-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
            <div className="flex flex-col p-2">
              <label
                className=" md:text-sm"
                onClick={handleLabelClick8}
              >
                الرقم الهندسي
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef8}
                value={query}
                onChange={handleInputChange}
                // onChange={handleChangeEng}
                // value={engNumber}
                placeholder={error4} // Navigate to next field
                style={{
                  border: errorMessage9 == null ? "1px solid red" : "none",
                }}
              // onBlur={checkNumberEng}
              />
            </div>
            <div className=" flex flex-col p-2 ">
              <label
                className=" md:text-sm md:mt-1"
                onClick={handleLabelClick}

              >
                اسم المهندس/ة
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef}
                onChange={handleEngName}
                value={username3}
                style={{
                  border: errorMessage1 == null ? "1px solid red" : "none",
                }}
              />
            </div>

            <div className=" flex flex-col p-2">
              <label
                className=" md:text-sm"
                onClick={handleLabelClick2}

              >
                اسم الأب
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef2}
                onChange={handleFatherN}
                value={fatherName}
                style={{
                  border: errorMessage3 == null ? "1px solid red" : "none",
                }}
              />
            </div>

            <div className="  flex flex-col p-2 ">
              <label
                className=""
                onClick={handleLabelClick1}

              >
                الكنية
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef1}
                onChange={handleLastN}
                value={lastName}
                style={{
                  border: errorMessage2 == null ? "1px solid red" : "none",
                }}
              />
            </div>
            <div className="flex flex-col p-2">
              <label
                className=" md:text-sm md:ml-4"
                onClick={handleLabelClick3}

              >
                اسم الأم
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef3}
                onChange={handleMotherN}
                value={motherName}
                style={{
                  border: errorMessage4 == null ? "1px solid red" : "none",
                }} // Navigate to next field
              />
            </div>

            <div className="flex flex-col p-2 ">
              <label
                className=" md:text-sm"
                onClick={handleLabelClick12}

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
                onClick={handleLabelClick12}

              >
                الحالة الاجتماعية
              </label>
              <select
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                defaultValue={socialStatus}
                value={socialStatus}
                label="الحالة الاجتماعية"
                onChange={handleChange5}
                style={{
                  background: "white",
                  // borderRadius: "40px",
                  border: errorMessage13 == null ? "1px solid red" : "none",
                }}
              >
                <option value="0" > الحالة الاجتماعية</option>
                <option value="1" >متزوج</option>
                <option value="2" >عازب</option>
                <option value="3" >منفصل</option>

              </select>
            </div>

            <div className="flex flex-col p-2">
              <label
                className=" md:text-sm"
                onClick={handleLabelClick4}

              >
                العنوان
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef4}
                onChange={handleAddress}
                value={address}
                style={{
                  border: errorMessage5 == null ? "1px solid red" : "none",
                }} // Navigate to next field
              />
            </div>
            <div className="flex flex-col p-2">
              <label
                className=" md:text-sm"
                onClick={handleLabelClick5}

              >
                الرقم الوطني
              </label>
              <input
                type="text"
                ref={inputRef5}
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                onChange={handleChangeNational}
                value={nationalId}
                onBlur={() => checkNumber(nationalId)}
                // Navigate to next field
                placeholder={error}
                style={{
                  border: errorMessage6 == null ? "1px solid red" : "none",
                }}
              />
            </div>

            <div className="flex flex-col p-2">
              <label
                className=" md:text-sm md:ml-4"
                onClick={handleLabelClick6}

              >
                الرقم المركزي
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef6}
                onChange={handleChangeSub}
                value={subNumber}
                onBlur={checkNumberSub}
                placeholder={error2} // Navigate to next field
                style={{
                  border: errorMessage7 == null ? "1px solid red" : "none",
                }}
              />
            </div>

            <div className="flex flex-col p-2">
              <label
                className=" md:text-sm"
                onClick={handleLabelClick7}

              >
                رقم التأمين
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef7}
                onChange={handleChangeEnc}
                value={ensuranceNumber}
                onBlur={handleSearchForThis}
                // Navigate to next field
                maxLength="13"
                placeholder={error3}
                style={{
                  border: errorMessage8 == null ? "1px solid red" : "none",
                }}
              />
            </div>
            <div className="flex flex-col p-2">
              <label
                onClick={handleLabelClick10}
                className=" text-sm"

              >
                الإيميل
              </label>
              <input
                type="email"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef9}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="flex flex-col p-2">
              <label
                className=" text-sm"
                onClick={handleLabelClick11}

              >
                الهاتف
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef10}
                onChange={handleChangePhone5}
                value={phone}
                placeholder={error5} // Navigate to next field
              />
            </div>

            <div className="flex flex-col p-2 ">
              <label
                className=" md:text-sm"
                onClick={handleLabelClick12}

              >
                الموبايل
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                ref={inputRef11}
                onChange={handleChangePhone6}
                value={mobile}
                placeholder={error6}
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
                onChange={(e) => setSelectedDate(e.target.value)}
                placeholder="اضغط لاختيار التاريخ"
                className="shadow appearance-none border text-gray-700 leading-tight outline-none focus:ring-1 ring-blue-400 rounded-lg p-2 "
              />
            </div>
            {/* 
            <div className="flex flex-col p-2 ">
              <label
                className=" md:text-sm"
                onClick={handleLabelClick12}

              >
                مكان العمل
              </label>
              <select
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                defaultValue={work}
                value={work}
                label=" مكان العمل"
                onChange={handleChange3}
                style={{
                  background: "white",
                  // borderRadius: "40px",
                  border: errorMessage11 == null ? "1px solid red" : "none",
                }}
              >
                <option value="0" > مكان العمل</option>
                {dataw &&
                  dataw.map((item) => (
                    <option key={item.id}
                      value={item.id}> {item.name}</option>
                  ))}
              </select>
            </div> */}

            <div className="flex flex-col p-2">
              <label
                className=" md:text-sm"
                onClick={handleLabelClick7}

              >
                مكان العمل
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                defaultValue={workName}
                value={workName}
                label=" مكان العمل"
                onChange={handleChange3}
                style={{
                  background: "white",
                  // borderRadius: "40px",
                  border: errorMessage11 == null ? "1px solid red" : "none",
                }}
                list="workPalce"  // ربط الـ input بـ datalist

              />
              <datalist id="workPalce">
                {dataw &&
                  dataw.map((item) => (
                    <option key={item.id}
                      value={item.id}> {item.name}</option>
                  ))}
              </datalist>
            </div>

            {/* <div className="flex flex-col p-2 ">
              <div>
                <label htmlFor="fruitInput">اختر فاكهة:</label>
                <input
                  list="fruits"  // ربط الـ input بـ datalist
                  id="fruitInput"
                  defaultValue={work}
                  className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"

                  value={work} onChange={handleChange3}  // تحديث القيمة المختارة
                  placeholder="ابحث عن فاكهة..."
                />
                <datalist id="fruits">
                  {dataw &&
                    dataw.map((item) => (
                      <option key={item.id}
                        value={item.id}> {item.name}</option>
                    ))}
                </datalist>
                <p>القيمة المختارة: {work}</p>
              </div>



            </div> */}

            {/* <div className="flex flex-col p-2 ">
              <label
                className=" md:text-sm"
                onClick={handleLabelClick12}

              >
                الاختصاص
              </label>
              <select
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                defaultValue={option}
                value={option}
                label="الاختصاص"
                onChange={handleChange6}
                style={{
                  background: "white",
                  // borderRadius: "40px",
                  border: errorMessage12 == null ? "1px solid red" : "none",
                }}
              >
                <option value="0" > الاختصاص</option>
                {specializatio &&
                  specializatio.map((item) => (
                    <option key={item.id}
                      value={item.id}> {item.name}</option>
                  ))}
              </select>
            </div> */}

            <div className="flex flex-col p-2">
              <label
                className=" md:text-sm"
                onClick={handleLabelClick12}

              >
                الاختصاص
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mt-2 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 ring-blue-400"
                defaultValue={optionName}
                value={optionName}
                label=" الاختصاص"
                onChange={handleChange6}
                style={{
                  background: "white",
                  // borderRadius: "40px",
                  border: errorMessage12 == null ? "1px solid red" : "none",
                }}
                list="spacilzation"  // ربط الـ input بـ datalist

              />
              <datalist id="spacilzation">
                {specializatio &&
                  specializatio.map((item) => (
                    <option key={item.id}
                      value={item.id}> {item.name}</option>
                  ))}
              </datalist>
            </div>

            <div className="flex flex-col p-2">
              <p className="md:text-sm lg:ml-7 ">القسط السنوي</p>
              <input
                type="text"
                readOnly
                disabled
                value={selectedDate ? data7 : 0}
                className="rounded-lg p-2 mt-2 ml-10 w-full bg-white md:ml-1 shadow-md"
              />
            </div>

          </div>
          <div className="w-full p-4 ">
            <div className="flex gap-4 justify-start items-center mb-4 ">

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

            </div>

          </div>

          {/* {show == true ? (
            <>
              <div className="flex flex-col mt-6 p-5">
                <label
                  onClick={handleLabelClick13}

                >
                  اضافة ملاحظة
                </label>

                <div className="flex relative">
                  <textarea
                    ref={inputRef13}
                    name="postContent"
                    placeholder={
                      engName
                        ? `إضافة ملاحظة للمهندس ${engName}`
                        : "إضافة ملاحظة"
                    }
                    rows={4}
                    cols={200}
                    className="  p-4 bg-gray-100 border border-black rounded-lg placeholder:p-4"
                    value={noteContent} // ربط حالة noteContent بالمحتوى
                    onChange={handleNoteChange}
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

          <div className="flex justify-between p-2  w-full">
            <div className="flex justify-center items-center bg-slate-600 shadow-md rounded-lg py-2 w-48  h-10 ">
              <NavLink to={`/dashboard/addmember?eng=${forSend}`} className="text-white">
                إضافة فرد عائلة جديد
              </NavLink>
            </div>

            <button
              className="flex justify-center items-center shadow-md rounded-lg h-10 w-48 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400"
              style={{ color: "white", fontSize: "18px" }}
              disabled={loading} // تعطيل الزر أثناء الإرسال
            >
              {loading ? (
                <Spinner size="small" /> // عرض Spin عند الإرسال
              ) : (
                "إضافة"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
