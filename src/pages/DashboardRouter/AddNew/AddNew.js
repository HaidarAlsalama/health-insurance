import axios from "axios";
import { Spinner } from "components";
import ActionModal from "components/ActionModal/ActionModal";
import { createAlert } from "components/Alert/Alert";
import { _md_size } from "config/layoutSizes";
import config from "Constants/environment";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { openHalf } from "store/reducers/layoutReducer";

const AddNew = () => {
  const token = useSelector((state) => state.auth?.token);

  const [formNum, setformNum] = useState("");

  // const [engNum, setEngNum] = useState("");
  const [onSend, setOnSend] = useState(false);
  const [onSearch, setOnSearch] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eng = queryParams.get("eng");

  useEffect(() => {
    if (eng) {
      handleSearchChange(eng);
    }
  }, [eng]);

  const [keyWord, setKeyWord] = useState("");
  const [engNum, setEngNum] = useState(""); // State for debounced search term
  // Function to update the search term when typing
  const handleSearchChange = (value) => {
    setKeyWord(value);
    debouncedSearchTermCallback(value); // Call the debounced function on search term update
  };
  // Create a debounced function to update the debounced search term
  const debouncedSearchTermCallback = useCallback(
    debounce((value) => {
      setEngNum(value);
      handleSearchEng(value);
    }, 600), // 600ms debounce delay
    []
  );

  const [toPrent, setToPrint] = useState({});

  const [year, setYear] = useState(localStorage.getItem("currentYear"));
  const [isDisabled, setIsDisabled] = useState(true);
  const [relations, setRelations] = useState({}); // حالة لتخزين الصلات
  const dispatch = useDispatch();

  const [specializations, setSpecializations] = useState({});
  const [allPayMethode, setAllPayMethode] = useState([]);
  const [payMethode, setPayMethode] = useState(0); // TODO for add to rest
  const [payMethodeName, setPayMethodeName] = useState(""); // TODO for add to rest

  const [totalAmount, setTotalAmount] = useState(0); // TODO for add to rest

  const [engId, setId] = useState(0); // TODO for add to rest
  const [engInfo, setEngInfo] = useState([]); // TODO for add to rest
  const [family, setFamily] = useState([]); // TODO for add to rest
  const [workPlace, setWorkPlace] = useState({});

  const [subscribers, setSubscribers] = useState([]); // TODO for add to rest

  const [waitingEng, setWaitingEng] = useState(false); // TODO for add to rest
  const [cardStatuseEng, setCardStatuseEng] = useState(false); // TODO for add to rest

  useEffect(() => {
    if (window.innerWidth > _md_size) dispatch(openHalf());
  }, []);

  useEffect(() => {
    const getYear = localStorage.getItem("currentYear");
    if (getYear) setYear(getYear);
  }, []);

  const handleSearchEng = async (value) => {
    restData();
    setOnSearch(true);
    if (value)
      await axios
        .get(
          `${config.baseUrl1}/Quiries/EngSub?EngNumber=${value}&Year=${year}`
          , {
            headers: {
              Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
            }
          }
        )
        // .get(`${config.baseUrl1}/Quiries/engSub?engNumber=${value}`)
        .then((response) => {
          setToPrint(response.data);
          setEngInfo([response.data.person]);
          setFamily(
            response.data.relations.map((item) => ({
              ...item, // نسخ جميع المفاتيح الحالية للكائن
              checked: false, // إضافة المفتاح الجديد
            }))
          );
          setWorkPlace(response.data.workPlace);
          setSpecializations(response.data.specialization);
          setTotalAmount(response.data.totalRelationsAmount);
        })
        .catch((e) => {
          console.error(e);
          restData();
        });
    setOnSearch(false);
  };

  const restData = () => {
    setPayMethodeName("");
    setEngInfo([]);
    setFamily([]);
    setToPrint({});
    setWorkPlace({});
    setSpecializations({});
    setTotalAmount(0);
    setPayMethode(0);
    setCardStatuseEng(false);
    setWaitingEng(false);
    setSubscribers([]);
    setId(0); setformNum('')
    setTemp([]);
  };

  const getDate = (value) => {
    const dateTimeString = value;
    const dateOnly = dateTimeString.split("T")[0];
    return dateOnly; // Output
  };

  useEffect(() => {
    // يتم تشغيل useEffect عند تغيير بيانات العائلة
    const fetchRelations = async () => {
      const newRelations = {};
      for (const member of family) {
        const relationName = await getRelations(member.relationTypeId);
        newRelations[member.relationTypeId] = relationName;
      }
      setRelations(newRelations);
    };

    if (family.length > 0) {
      fetchRelations();
    }
  }, [family]);

  useEffect(() => {
    axios
      .get(`${config.baseUrl1}/AnnualData/get-allPayMethode`, {
        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        }
      })
      .then((response) => {
        setAllPayMethode(response.data);
      })
      .catch((e) => console.error(e));
  }, []);

  const getRelations = async (value) => {
    try {
      const response = await axios.get(
        `${config.baseUrl1}/AnnualData/GetRelation/${value}`, {
        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        }
      }
      );
      return response.data.name; // إعادة الاسم مباشرة بعد حل الوعد
    } catch (error) {
      console.error(error);
      return "-"; // تعيين `-` في حال وجود خطأ
    }
  };

  const [temp, setTemp] = useState([]);

  useEffect(() => {
    if (temp.length > 0) {
      const body = {
        personIds: temp,
        year: year,
      };
      axios
        .post(`${config.baseUrl1}/Quiries/CalculateTotalAmount`, body, {
          headers: {
            Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
          }
        })
        .then((response) => {
          setTotalAmount(response.data.data.totalAmount);
          console.log(response.data);
        });
    } else {
      setTotalAmount(0);
    }
  }, [temp, engId]);

  const handleCheckboxChange = (item, isChecked) => {
    if (isChecked) {
      setTemp((prevTemp) => [...prevTemp, item.id]);
      item = {
        ...item,
        ...{
          personId: item.id,
          subscrib: true,
          affiliate: true,
          beneficiary: true,
          cardStatuse: false,
          exAmount: 0,
          year: 0,
          waiting: false,
        },
      };
      setSubscribers([...subscribers, item]);
    } else {
      setTemp((prevTemp) => prevTemp.filter((id) => id !== item.id));
      setSubscribers(subscribers.filter((i) => i.id !== item.id));
    }
  };

  const handleCheckboxChange2 = (id, isChecked) => {
    // العثور على الفهرس باستخدام findIndex
    const temp = family.findIndex((i) => i.id === id);
    console.log(temp, "++", family);

    if (temp !== -1) {
      // تأكد من أن العنصر موجود
      // تحديث المصفوفة بإنشاء نسخة جديدة من الكائن المعدل
      const updatedFamily = family.map((item) =>
        item.id === id ? { ...item, checked: isChecked } : item
      );
      setFamily(updatedFamily);
    }
  };

  const handleCheckboxChangeEngId = (id, isChecked) => {
    if (isChecked) {
      setId(id);
      setTemp((prevTemp) => [...prevTemp, id]);
    } else {
      setId(0);
      setTemp((prevTemp) => prevTemp.filter((id) => id !== id));
    }
  };

  useEffect(() => {
    console.log(subscribers);
  }, [subscribers]);

  const handleSubmit = async () => {
    if (onSend) return;
    setOnSend(true);

    if (payMethode == 0) {
      createAlert("Warning", "يجب تحديد طريقة الدفع");
      setOnSend(false);
      return;
    }

    if (formNum == "") {
      createAlert("Warning", "يجب تحديد رقم المعاملة");
      setOnSend(false);
      return;
    }

    const body = {
      engineerId: engId,
      persons: subscribers,
      year: year,
      payMethodId: payMethode,
      workPlaceId: workPlace?.id || 0,
      engineeringUnitsId: workPlace?.engineeringUnit?.id || 0,
      id: 0,
      engineerIsRegistered: true,
      exAmount: 0,
      hisDic: "2024-11-08T12:48:04.416Z",
      cardStatuse: cardStatuseEng,
      amount: 0,
      subscrib: true,
      affiliate: true,
      beneficiary: true,
      waiting: waitingEng,
      formNumber: formNum
    };

    // console.log(body);
    // return
    await axios
      .post(`${config.baseUrl1}/AnnualData`, body, {
        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        }
      })
      .then((response) => {
        console.log(response);
        createAlert("Success", "تم تجديد الاشتراك");
        restData();
      })
      .catch((error) => {
        console.log(error);
        createAlert("Error", "لم يتم تجديد الاشتراك");
      });

    setOnSend(false);
  };

  const handleWaiting = (id, isChecked) => {
    const temp = subscribers.findIndex(
      (subscriber) => subscriber.personId == id
    );
    if (temp >= 0) {
      setSubscribers((prev) =>
        prev.map((subscriber, index) =>
          index === temp ? { ...subscriber, waiting: isChecked } : subscriber
        )
      );
    }
  };

  const handleCardSatus = (id, isChecked) => {
    const temp = subscribers.findIndex(
      (subscriber) => subscriber.personId == id
    );
    if (temp >= 0) {
      setSubscribers((prev) =>
        prev.map((subscriber, index) =>
          index === temp
            ? { ...subscriber, cardStatuse: isChecked }
            : subscriber
        )
      );
    } else createAlert("Warning", "لم تقم بالاشتراك لهذا الشخص ");
  };

  const [benefit, setBenefit] = useState({});
  const getHistory = (engId, isEng) => {
    if (!engId) return createAlert("warning", "لا يوجد ID");
    axios
      .get(
        `${config.baseUrl1}/AnnualData/${isEng ? "GetEngineerStatus" : "GetFamilyMemberStatus"
        }/${engId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        }
      }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.status == 200)
          setBenefit({
            details: response.data.data,
            round: new Date().getTime(),
          });
        if (response.data.status == 204)
          createAlert("Warning", "لايوجد استفادات لهذا المؤمن");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      className={`bg-white w-full p-8 rounded-lg h-full flex flex-col gap-4 printoo`}
    >
      <div className="justify-between font-bold text-gray-800 hidden just-on-printoo">
        <div className="flex items-center flex-col w-52">
          <span>الجمهورية العربية السورية</span>
          <span>نقابة المهندسين السوريين</span>
          <span>فرع حمص</span>
        </div>
        <span className="my-auto">السيد رئيس فرع نقابة المهندسين بحمص</span>
        <div className="flex flex-col text-end">
          <span className="w-44">
            No: {formNum}/{year}
          </span>
          <span className="w-44">
            Date: {new Date().toLocaleDateString("en-US")}
          </span>
        </div>
      </div>

      <div className="justify-between flex-wrap gap-4 font-bold text-gray-800 flex_ hidden just-on-printoo  text-sm">
        <span className="text-nowrap">
          مقدمه المهندس/ة{" : "}&nbsp;&nbsp;
          {(engInfo[0]?.firstName || "") +
            " " +
            (engInfo[0]?.fatherName || "") +
            " " +
            (engInfo[0]?.lastName || "")}
        </span>
        <span className="text-nowrap">الرقم الهندسي: {toPrent?.engNumber}</span>
        <span className="text-nowrap">الرقم المركزي: {toPrent?.subNumber}</span>
        <span className="text-nowrap">
          الاختصاص: {specializations?.name || ""}
        </span>
        <span className="text-nowrap">مكان العمل: {workPlace?.name || ""}</span>
        <span className="text-nowrap">
          رقم الوحدة: {workPlace?.engineeringUnit?.number || ""}
        </span>
      </div>
      <div className="justify-between flex-wrap font-bold text-gray-800 flex_ hidden just-on-printoo  text-sm">
        <span className="text-nowrap">
          ارغب في الاشتراك بالتأمين الصحي (استشفاء) عن:
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 _bg-gray-200/75 rounded-md gap-4 pt-1 pb-3 no-print">
        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            الرقم الهندسي
          </label>
          <input
            type="text"
            value={keyWord}
            defaultValue={eng}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="text-sm border rounded-lg py-1 p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
            style={{
              direction: "ltr",
            }}
          />
        </div>
        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            رقم المعاملة{" "}
          </label>
          <input
            type="text"
            value={formNum}
            onChange={(e) => setformNum(e.target.value)}
            className="text-sm border rounded-lg py-1 p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
          />
        </div>
        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            الاسم{" "}
          </label>
          <input
            type="text"
            value={
              (engInfo[0]?.firstName || "") +
              " " +
              (engInfo[0]?.fatherName || "") +
              " " +
              (engInfo[0]?.lastName || "")
            }
            className="text-sm border rounded-lg py-1 p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
            disabled={isDisabled}
          />
        </div>

        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            الرقم المركزي
          </label>
          <input
            type="text"
            onChange={(e) => handleSearchEng(e.target.value)}
            className="text-sm border rounded-lg py-1 p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
            disabled
            defaultValue={toPrent?.subNumber || ""}
          />
        </div>
        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            الوحدة{" "}
          </label>
          <input
            type="text"
            className="text-sm border rounded-lg py-1 p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
            value={workPlace?.engineeringUnit?.number || ""}
            disabled={isDisabled}
          />
        </div>
        <div className="flex flex-col p-2_ no-print">
          <label className=" md:text-sm font-medium text-gray-800">
            طريقة الدفع{" "}
          </label>
          <select
            onChange={(e) => {
              setPayMethode(e.target.value);
              const it = allPayMethode.filter(
                (item) => item.id == e.target.value
              );
              setPayMethodeName(it[0]?.nameMethod || "");
            }}
            className="border rounded-lg p-2 text-sm  py-1 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 "
            defaultValue={payMethode}
            value={payMethode}
          >
            <option value="0">حدد طريقة الدفع</option>
            {allPayMethode &&
              allPayMethode.map((payMethod, index) => (
                <option key={index} value={payMethod.id}>
                  {payMethod.nameMethod}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            مكان العمل{" "}
          </label>
          <input
            type="text"
            className="text-sm border rounded-lg py-1 p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
            value={workPlace?.name || ""}
            disabled={isDisabled}
          />
        </div>
        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            الاختصاص{" "}
          </label>
          <input
            type="text"
            value={specializations?.name || ""}
            className="text-sm border rounded-lg py-1 p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
            disabled={isDisabled}
          />
        </div>
        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            المبلغ الاجمالي{" "}
          </label>
          <input
            type="text"
            value={totalAmount || ""}
            className="text-sm border rounded-lg py-1 p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
            disabled={isDisabled}
          />
        </div>
      </div>

      <div className="overflow-auto rounded-lg h-72_">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400 mx-auto !text-center shadow-md">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-2 py-2 text-nowrap border-on-print no-print"
              >
                #
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الاسم
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                اسم الاب
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الكنية
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                اسم الام
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-nowrap border-on-print no-print"
              >
                الجنس
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الصلة
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الحالة الاجتماعية
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الرقم التأميني
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الرقم الوطني
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                سنة الميلاد
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                المبلغ
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-nowrap border-on-print no-print"
              >
                الاستفادات
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-nowrap border-on-print no-print"
              >
                الاشتراك
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-nowrap border-on-print no-print"
              >
                عدم الاستفادة{" "}
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-nowrap border-on-print no-print"
              >
                إنتظار
              </th>
            </tr>
          </thead>
          <tbody>
            {engInfo.length > 0 &&
              engInfo?.map((item, index) => (
                <tr
                  className={`odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-slate-200
                    `}
                  key={index}
                >
                  <th
                    scope=""
                    className="px-2 py-1 border-on-print font-medium whitespace-nowrap no-print"
                  >
                    {index + 1}
                  </th>
                  <td className="px-2 py-1 border-on-print">
                    {item.firstName}
                  </td>
                  <td className="px-2 py-1 border-on-print">
                    {item.fatherName}
                  </td>
                  <td className="px-2 py-1 border-on-print">{item.lastName}</td>
                  <td className="px-2 py-1 border-on-print">
                    {item.motherName}
                  </td>
                  <td className="px-2 py-1 border-on-print no-print">
                    {item.genderId == 1 ? "ذكر" : "انثى"}
                  </td>
                  <td className="px-2 py-1 border-on-print">نفسه</td>
                  <td className="px-2 py-1 border-on-print">
                    {item.statusId == 1
                      ? "متزوج"
                      : item.statusId == 2
                        ? "عازب"
                        : item.statusId == 3
                          ? "منفصل"
                          : "-"}
                  </td>
                  <td className="px-2 py-1 border-on-print">
                    {item.ensuranceNumber != 0
                      ? item.ensuranceNumber
                      : "أول مرة"}
                  </td>
                  <td className="px-2 py-1 border-on-print">
                    {item.nationalId}
                  </td>
                  <td className="px-2 py-1 border-on-print">
                    {/* {getDate(item.birthDate)} */}
                    {getDate(item.birthDate).split("-")[0]}
                  </td>
                  <td className="px-2 py-1 border-on-print">{item.amount}</td>
                  <td className="px-2 py-1 border-on-print  no-print">
                    <button
                      type="checkbox"
                      class="btn btn-primary !py-1 !px-2 text-xs m-auto"
                      onClick={() => getHistory(item.id, true)}
                    >
                      عرض
                    </button>
                  </td>
                  <td className="px-2 py-1 border-on-print  no-print">
                    <input
                      type="checkbox"
                      class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) =>
                        handleCheckboxChangeEngId(item.id, e.target.checked)
                      }
                    />
                  </td>
                  <td className="px-2 py-1 border-on-print  no-print">
                    <input
                      type="checkbox"
                      class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => setWaitingEng(e.target.checked)}
                      disabled={!engId}
                    />
                  </td>
                  <td className="px-2 py-1 border-on-print  no-print">
                    <input
                      type="checkbox"
                      class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => setCardStatuseEng(e.target.checked)}
                      disabled={!engId}
                    />
                  </td>
                </tr>
              ))}
            {family.length > 0 &&
              family?.map((item, index) => {
                const isFirstChecked = item.person.isFirstChecked; // تخزين حالة مربع الاختيار الأول
                return (
                  <tr
                    className={`odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-slate-200
                      ${!item.checked && "no-print"}
                      `}
                    key={index}
                  >
                    <th
                      scope=""
                      className="px-2 py-1 border-on-print font-medium whitespace-nowrap no-print"
                    >
                      {index + 2}
                    </th>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.firstName}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.fatherName}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.lastName}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.motherName}
                    </td>
                    <td className="px-2 py-1 border-on-print no-print">
                      {item.person.genderId == 1 ? "ذكر" : "انثى"}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {relations[item.relationTypeId] || "-"}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.statusId == 1
                        ? "متزوج"
                        : item.person.statusId == 2
                          ? "عازب"
                          : item.person.statusId == 3
                            ? "منفصل"
                            : "-"}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.ensuranceNumber != 0
                        ? item.person.ensuranceNumber
                        : "أول مرة"}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.nationalId}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {getDate(item.person.birthDate).split("-")[0]}{" "}
                      {/* {getDate(item.person.birthDate)} */}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.amount}
                    </td>
                    <td className="px-2 py-1 border-on-print  no-print flex justify-center gap-1">
                      <button
                        type="checkbox"
                        class="btn btn-primary !py-1 !px-2 text-xs !m-0"
                        onClick={() => getHistory(item.person.id, false)}
                      >
                        عرض{" "}
                      </button>
                    </td>
                    <td className="px-2 py-1 border-on-print no-print">
                      <input
                        type="checkbox"
                        class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e) => {
                          handleCheckboxChange(
                            { id: item.person.id },
                            e.target.checked
                          );
                          handleCheckboxChange2(item.id, e.target.checked);
                          item.person.isFirstChecked = e.target.checked; // تحديث حالة الاختيار للمربع الأول
                        }}
                      />
                    </td>
                    <td className="px-2 py-1 border-on-print no-print">
                      <input
                        type="checkbox"
                        class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e) =>
                          handleCardSatus(item.person.id, e.target.checked)
                        }
                        disabled={!isFirstChecked} // تعطيل هذا المربع إذا لم يتم تحديد الأول
                      />
                    </td>
                    <td className="px-2 py-1 border-on-print no-print">
                      <input
                        type="checkbox"
                        class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e) =>
                          handleWaiting(item.person.id, e.target.checked)
                        }
                        disabled={!isFirstChecked} // تعطيل هذا المربع إذا لم يتم تحديد الأول
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {onSearch && <Spinner />}
      <button
        className="btn btn-info w-52 mx-auto mt-16 no-print"
        onClick={() => window.print()}
        disabled={!engId}
      >
        طباعة
      </button>
      <button
        className="btn btn-danger w-52 mx-auto mt-16_ no-print"
        onClick={handleSubmit}
        disabled={!engId}
      >
        {onSend ? <Spinner sm /> : "إشتراك"}
      </button>
      <div className="justify-between font-bold text-gray-800 flex_ hidden just-on-printoo text-sm ">
        <div className="flex flex-col ">
          <span>
            ومستعد للالتزام بكافة بنود العقد المنظم في فرع نقابة المهندسين بحمص
          </span>
          <span>
            ومستعد لدفع الرسوم وملتزم بالاستمرار في الاشتراك مادام العقد مستمر
            في فرع النقابة
          </span>
        </div>
        <div className="flex gap-20">
          <div className="flex flex-col ">
            <span>الاجمالي:{totalAmount || ""} ل.س</span>
            <span>طريقة الدفع: {payMethodeName}</span>
          </div>
          <span>توقيع وختم المحاسب</span>
        </div>
      </div>

      <div className="justify-between font-bold text-gray-800 flex_ hidden just-on-printoo text-sm h-20">
        <div className="flex flex-col">
          <span className="text-nowrap">
            المهندس/ة{" : "}&nbsp;&nbsp;
            {(engInfo[0]?.firstName || "") +
              " " +
              (engInfo[0]?.fatherName || "") +
              " " +
              (engInfo[0]?.lastName || "")}
          </span>
          <span>التوقيع: </span>
        </div>

        <span>موظف التأمين</span>
        <span></span>
      </div>

      <div className="justify-between mt-4 font-bold text-gray-800 flex_ hidden just-on-printoo  text-sm">
        <span>
          الموافقة على اشتراك الزميل{" : "}&nbsp;&nbsp;
          {(engInfo[0]?.firstName || "") +
            " " +
            (engInfo[0]?.fatherName || "") +
            " " +
            (engInfo[0]?.lastName || "")}
          &nbsp; &nbsp; &nbsp; &nbsp; بعقد التأمين الصحي استشفاء لعام {year}
        </span>
        <span>رئيس فرع نقابة المهندسين بحمص</span>
      </div>

      <ShowBenefit getter={benefit} setter={setBenefit} />
    </div>
  );
};

export default AddNew;

function ShowBenefit({ getter, setter }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen && getter.round) setIsOpen(true);
    // console.log("++++", getter);
  }, [getter]);

  return (
    <ActionModal title={"الاستفادات السابقة"} open={isOpen} close={setIsOpen}>
      <table className="w-full text-sm text-gray-500 dark:text-gray-400 mx-auto !text-center shadow-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-2 text-nowrap">
              العام
            </th>
            <th scope="col" className="px-2 py-2 text-nowrap">
              الحالة
            </th>
            <th scope="col" className="px-2 py-2 text-nowrap">
              قيمة الاستفادة
            </th>
          </tr>
        </thead>
        <tbody>
          {getter?.details?.length > 0 &&
            getter?.details?.map((item, index) => (
              <tr
                className={`odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-slate-200`}
                key={index}
              >
                <td className="px-2 py-1">{item.year}</td>
                <td className="px-2 py-1">{item.status}</td>
                <td className="px-2 py-1">{item.nonAddForPersonSum || "-"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </ActionModal>
  );
}
