import axios from "axios";
import { Spinner } from "components";
import ActionModal from "components/ActionModal/ActionModal";
import { createAlert } from "components/Alert/Alert";
import { _md_size } from "config/layoutSizes";
import config from "Constants/environment";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { openHalf } from "store/reducers/layoutReducer";

const AddNew = () => {
  const [engNum, setEngNum] = useState("");
  const [onSend, setOnSend] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eng = queryParams.get("eng");

  useEffect(() => {
    if (eng) {
      handleSearchEng(eng);
      setEngNum(eng);
    }
  }, [eng]);
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

  const handleSearchEng = (value) => {
    axios
      .get(`${config.baseUrl1}/Quiries/EngSub?EngNumber=${value}&Year=${year}`)
      // .get(`${config.baseUrl1}/Quiries/engSub?engNumber=${value}`)
      .then((response) => {
        setToPrint(response.data);
        setEngInfo([response.data.person]);
        setFamily(response.data.relations);
        setWorkPlace(response.data.workPlace);
        setSpecializations(response.data.specialization);
        setTotalAmount(response.data.totalRelationsAmount);
      })
      .catch((e) => {
        console.error(e);
        restData();
      });
  };

  const restData = () => {
    setEngInfo([]);
    setFamily([]);
    setToPrint({});
    setWorkPlace({});
    setSpecializations({});
    setTotalAmount(0);
    setPayMethode(0);
  };

  const getDate = (value) => {
    const dateTimeString = value;
    const dateOnly = dateTimeString.split("T")[0];
    return dateOnly; // Output
  };

  // const getWorkPlace = (value) => {
  //   const temp = workPlace.filter((item => {
  //     if (item.id == value) return item
  //   }))
  //   if (temp.length > 0) setWorkPlace(temp[0].name)
  // }

  // const getSpecialization = (value) => {
  //   const temp = workPlaces.filter((item => {
  //     if (item.id == value) return item
  //   }))
  //   if (temp.length > 0) setWorkPlace(temp[0].name)
  // }

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
      .get(`${config.baseUrl1}/AnnualData/get-allPayMethode`)
      .then((response) => {
        setAllPayMethode(response.data);
      })
      .catch((e) => console.error(e));
  }, []);

  const getRelations = async (value) => {
    try {
      const response = await axios.get(
        `${config.baseUrl1}/AnnualData/GetRelation/${value}`
      );
      return response.data.name; // إعادة الاسم مباشرة بعد حل الوعد
    } catch (error) {
      console.error(error);
      return "-"; // تعيين `-` في حال وجود خطأ
    }
  };

  const handleCheckboxChange = (item, isChecked) => {
    if (isChecked) {
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
      setSubscribers(subscribers.filter((i) => i.id !== item.id));
    }
  };

  const handleCheckboxChangeEngId = (id, isChecked) => {
    if (isChecked) {
      setId(id);
    } else {
      setId(0);
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
    };

    // console.log(body);
    // return
    await axios
      .post(`${config.baseUrl1}/AnnualData`, body)
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
        }/${engId}`
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
          <span className="w-44">:No</span>
          <span className="w-44">:Date</span>
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

      <div className="grid grid-cols-1 md:grid-cols-4 _bg-gray-200/75 rounded-md gap-4 pt-1 pb-3 no-print">
        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            الرقم الهندسي
          </label>
          <input
            type="text"
            value={engNum}
            onChange={(e) => handleSearchEng(e.target.value)}
            className="border rounded-2xl p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
            style={{
              direction: "ltr",
            }}
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
            className="border rounded-2xl p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
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
            className="border rounded-2xl p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
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
            className="border rounded-2xl p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
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
            className="border rounded-2xl p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 "
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
            className="border rounded-2xl p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
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
            className="border rounded-2xl p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
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
            className="border rounded-2xl p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
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
                className="px-2 py-2 text-nowrap border-on-print "
              >
                الجنس
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الصلة
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-wrap w-10 border-on-print"
              >
                الحالة الاجتماعية
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الرقم التأميني
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الرقم الوطني
              </th>
              <th
                scope="col"
                className="px-2 py-2 w-28 text-nowrap_ border-on-print"
              >
                تاريخ الميلاد
              </th>
              <th
                scope="col"
                className="px-2 py-2 w-32 text-nowrap border-on-print"
              >
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
                عدم الاستفادة
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

            {["", "", "", "", "", "", "", ""].map((item, index) => {
              // const isFirstChecked = item.person.isFirstChecked; // تخزين حالة مربع الاختيار الأول
              return (
                <tr
                  className={`odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-slate-200`}
                  key={index}
                >
                  <th
                    scope=""
                    className="px-2 py-1 border-on-print font-medium whitespace-nowrap no-print"
                  >
                    {index + 2}
                  </th>
                  <td className="px-2 py-1 border-on-print">
                    <span className="w-4 h-4 opacity-0"> -</span>
                  </td>
                  <td className="px-2 py-1 border-on-print">
                    <span className="w-4 h-4 opacity-0"> -</span>{" "}
                  </td>
                  <td className="px-2 py-1 border-on-print">
                    <span className="w-4 h-4 opacity-0"> -</span>{" "}
                  </td>
                  <td className="px-2 py-1 border-on-print">
                    <span className="w-4 h-4 opacity-0"> -</span>{" "}
                  </td>
                  <td className="px-2 py-1 border-on-print">
                    <span className="w-4 h-4 opacity-0"> -</span>{" "}
                  </td>
                  <td className="px-2 py-1 border-on-print no-print">
                    <span className="w-4 h-4 opacity-0"> -</span>{" "}
                  </td>
                  <td className="px-2 py-1 border-on-print">
                    <span className="w-4 h-4 opacity-0"> -</span>{" "}
                  </td>
                  <td className="px-2 py-1 border-on-print">
                    <span className="w-4 h-4 opacity-0"> -</span>
                  </td>
                  <td className="px-2 py-1 border-on-print">
                    <span className="w-4 h-4 opacity-0"> -</span>
                  </td>
                  <td className="px-2 py-1 border-on-print">
                    <span className="w-4 h-4 opacity-0"> -</span>{" "}
                  </td>
                  <td className="px-2 py-1 border-on-print">
                    <span className="w-4 h-4 opacity-0"> -</span>
                  </td>
                  <td className="px-2 py-1 border-on-print">
                    <span className="w-4 h-4 opacity-0"> -</span>{" "}
                  </td>
                  <td className="px-2 py-1 border-on-print  no-print">
                    <span className="w-4 h-4 opacity-0"> -</span>
                  </td>
                  <td className="px-2 py-1 border-on-print no-print">
                    <span className="w-4 h-4 opacity-0"> -</span>
                  </td>
                  <td className="px-2 py-1 border-on-print no-print">
                    <span className="w-4 h-4 opacity-0"> -</span>
                  </td>
                  <td className="px-2 py-1 border-on-print no-print">
                    <span className="w-4 h-4 opacity-0"> -</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* {!!totalAmount && (
        <div className="text-end text-xs">
          <span className="rounded-2xl py-1 px-2 font-medium text-gray-700 mt-2 ml-10 md:ml-1 shadow-md bg-slate-50 w-fit ">
            المبلغ الاجمالي
          </span>
          <span className="rounded-2xl py-1 px-2 font-medium text-gray-700 mt-2 ml-10 md:ml-1 shadow-md bg-slate-50 w-fit ">
            {totalAmount}
          </span>
          <span className="rounded-2xl py-1 px-2 font-medium text-gray-700 mt-2 ml-10 md:ml-1 shadow-md bg-slate-50 w-fit ">
            ل.س{" "}
          </span>
        </div>
      )} */}

      <button
        className="btn btn-info w-52 mx-auto mt-16 no-print"
        onClick={() => window.print()}
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
            <span>
              الاجمالي:
              {totalAmount || (
                <span className="opacity-0">lhjlfadskjflkjdsfhlkjsdh</span>
              )}{" "}
              ل.س
            </span>
            <span>طريقة الدفع: {payMethodeName}</span>
          </div>
          <span>توقيع وختم المحاسب</span>
        </div>
      </div>
      <div className=" font-bold text-gray-800 flex text-sm h-20 gap-4">
        <Table />
        <div className="flex flex-col ">
          <div className="justify-between mt-8  font-bold text-gray-800 flex_ hidden just-on-printoo text-sm h-20">
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

            <div className="flex flex-col justify-start">
              <span className="mr-12">رقم الهاتف:</span>
              <span className="mr-12">البريد:</span>
            </div>

            <span>موظف التأمين:</span>
            <span></span>
          </div>

          <div className="justify-between mt-8 font-bold text-gray-800 flex_ hidden just-on-printoo  text-sm">
            <span>
              الموافقة على اشتراك الزميل{" : "}&nbsp;&nbsp;
              {(engInfo[0]?.firstName || "") +
                " " +
                (engInfo[0]?.fatherName || "") +
                " " +
                (engInfo[0]?.lastName || "")}{" "}
              <span className="opacity-0">lhjlfadskjflkjdsfhlkjsdh</span>
              &nbsp; &nbsp; &nbsp; &nbsp; بعقد التأمين الصحي استشفاء لعام {year}
            </span>
            <span>رئيس فرع نقابة المهندسين بحمص</span>
          </div>
        </div>
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

export function Table() {
  const [ageSegments, setAgeSegments] = useState([]);
  const { token } = useSelector(state => state.auth)
  useEffect(() => {
    const year = localStorage.getItem("currentYear");
    const getAllDataForYear = async () => {
      try {
        const response = await axios.get(
          `${config.baseUrl1}/AnnualData/GetAllConfigData/${year}`
          , {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);

        setAgeSegments(response.data?.ageSegments);
      } catch (error) {
        console.error("Error fetching data", "error");
      }
    };
    if (year) {
      getAllDataForYear();
    }
  }, []);

  return (
    <div className=" border border-black rounded-md w-80 h-full">
      <h1 className="text-center bg-gray-100 w-full">
        رسوم اشتراك التأمين الصحي لعام {localStorage.getItem("currentYear")}
      </h1>

      <table className="w-80 text-xs text-gray-500 dark:text-gray-400 mx-auto !text-center">
        <tbody className=" border ">
          {ageSegments.length > 0 &&
            ageSegments.map((item, index) => (
              <tr
                className={`odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-slate-200 `}
                key={index}
              >
                <td className="px-2 py-1 border border-black border-r-0">
                  من عام {item.fromYear}
                </td>
                <td className="px-2 py-1  border border-black">
                  إلى عام {item.toYear}
                </td>
                <td className="px-2 py-1  border border-black border-l-0 ">
                  {item.theAmount}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <h1 className="text-center bg-gray-100 w-full">
        سعر البطاقة لأول مرة 10000{" "}
      </h1>
    </div>
  );
}
