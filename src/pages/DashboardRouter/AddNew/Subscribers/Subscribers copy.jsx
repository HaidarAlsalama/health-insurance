import axios from "axios";
import { Spinner } from "components";
import ActionModal from "components/ActionModal/ActionModal";
import { createAlert } from "components/Alert/Alert";
import EditPersonModal from "components/AppModals/EditPersonModal/EditPersonModal";
import { _md_size } from "config/layoutSizes";
import config from "Constants/environment";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { openHalf } from "store/reducers/layoutReducer";

const Subscribers = () => {
  const { token, role } = useSelector((state) => state.auth);
  const [dataSendToModal, setDataSendToModal] = useState({ id: 0, rand: 0 });

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
  // const [relations, setRelations] = useState({}); // حالة لتخزين الصلات
  const dispatch = useDispatch();

  const [totalAmount, setTotalAmount] = useState(0); // TODO for add to rest

  const [engId, setId] = useState(0); // TODO for add to rest
  const [engInfo, setEngInfo] = useState([]); // TODO for add to rest
  const [family, setFamily] = useState([]); // TODO for add to rest

  const [cardsStatus, setCardStatus] = useState([]); // TODO for add to rest

  const [subscribers, setSubscribers] = useState([]); // TODO for add to rest

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
        .get(`${config.baseUrl1}/AnnualData/${value}/GetAllInfo/${year}`, {
          headers: {
            Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
          },
        })
        // .get(`${config.baseUrl1}/Quiries/engSub?engNumber=${value}`)
        .then((response) => {
          setToPrint(response.data.data.engineer);
          setEngInfo([response.data.data.engineer.person]);
          setFamily(
            response.data.data.engineer.relations.map((item) => ({
              ...item, // نسخ جميع المفاتيح الحالية للكائن
              checked: false, // إضافة المفتاح الجديد
            }))
          );
          setCardStatus(response.data.data.cardStatuses);
          setTotalAmount(response.data.data.totalAmount);
        })
        .catch((e) => {
          console.error(e);
          restData();
        });
    setOnSearch(false);
  };

  const getCardStatus = (id) => {
    console.log("+6+6+6+6+6", id);

    if (!id) return "-";
    const res = cardsStatus.find((item) => item.personId == id);
    console.log("+6+6+6+6+6", res);

    if (res) {
      return res.cardStatuse;
    }
  };

  const restData = () => {
    setEngInfo([]);
    setFamily([]);
    setToPrint({});
    setTotalAmount(0);
    setSubscribers([]);
    setId(0);
    setformNum("");
  };

  const getDate = (value) => {
    const dateTimeString = value;
    const dateOnly = dateTimeString.split("T")[0];
    return dateOnly; // Output
  };

  // useEffect(() => {
  //   // يتم تشغيل useEffect عند تغيير بيانات العائلة
  //   const fetchRelations = async () => {
  //     const newRelations = {};
  //     for (const member of family) {
  //       const relationName = await getRelations(member.relationTypeId);
  //       newRelations[member.relationTypeId] = relationName;
  //     }
  //     setRelations(newRelations);
  //   };

  //   if (family.length > 0) {
  //     fetchRelations();
  //   }
  // }, [family]);

  const getRelations = async (value) => {
    try {
      const response = await axios.get(
        `${config.baseUrl1}/AnnualData/GetRelation/${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
          },
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
    console.log(subscribers);
  }, [subscribers]);

  const [benefit, setBenefit] = useState({});
  const getHistory = (engId, isEng) => {
    if (!engId) return createAlert("warning", "لا يوجد ID");
    axios
      .get(
        `${config.baseUrl1}/AnnualData/${
          isEng ? "GetEngineerStatus" : "GetFamilyMemberStatus"
        }/${engId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
          },
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
      <div className="grid grid-cols-1 md:grid-cols-4 _bg-gray-200/75 rounded-md gap-4 pt-1 pb-3 no-print">
        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            الرقم الهندسي
          </label>
          <input
            type="text"
            value={keyWord}
            defaultValue={eng}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="border text-center rounded-lg py-1 text-sm p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
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
            className="border text-center rounded-lg py-1 text-sm p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
            disabled={true}
          />
        </div>

        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            الرقم المركزي
          </label>
          <input
            type="text"
            onChange={(e) => handleSearchEng(e.target.value)}
            className="border text-center rounded-lg py-1 text-sm p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
            disabled
            defaultValue={toPrent?.subNumber || ""}
          />
        </div>

        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            طريقة الدفع
          </label>
          <input
            type="text"
            value={toPrent?.person?.paymentMethod || ""}
            className="border text-center rounded-lg py-1 text-sm p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
            disabled={true}
          />
        </div>

        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            الاختصاص{" "}
          </label>
          <input
            type="text"
            value={toPrent?.specializationName || ""}
            className="border text-center rounded-lg py-1 text-sm p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
            disabled={true}
          />
        </div>

        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            مكان العمل{" "}
          </label>
          <input
            type="text"
            value={toPrent?.workPlaceName || ""}
            className="border text-center rounded-lg py-1 text-sm p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
            disabled={true}
          />
        </div>

        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            رقم المعاملة{" "}
          </label>
          <input
            type="text"
            value={toPrent?.person?.formNumber || ""}
            className="border text-center rounded-lg py-1 text-sm p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
            disabled={true}
          />
        </div>

        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            المبلغ
          </label>
          <input
            type="text"
            value={totalAmount || ""}
            className="border text-center rounded-lg py-1 text-sm p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
            disabled={true}
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
                حالة البطاقة
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
                  onDoubleClick={() => {
                    setDataSendToModal({
                      id: item?.id,
                      rand: Math.floor(Math.random() * 101),
                    });
                  }}
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
                    {item.cardStatus ? (
                      <span class="btn btn-success !py-1 !px-2 text-xs m-auto w-20">
                        مفعلة
                      </span>
                    ) : (
                      <span class="btn btn-danger !bg-red-500 hover:!bg-red-600 !py-1 !px-2 text-xs m-auto w-20">
                        غير مفعلة
                      </span>
                    )}
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
                    onDoubleClick={() => {
                      setDataSendToModal({
                        id: item?.person?.id,
                        rand: Math.floor(Math.random() * 101),
                      });
                    }}
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
                      {item.relationTypeName || "-"}
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
                    <td className="px-2 py-1 border-on-print  no-print">
                      <button
                        type="checkbox"
                        class="btn btn-primary !py-1 !px-2 text-xs m-auto"
                        onClick={() => getHistory(item.person.id, false)}
                      >
                        عرض{" "}
                      </button>
                    </td>
                    <td className="px-2 py-1 border-on-print   no-print">
                      {item.person.cardStatus ? (
                        <span class="btn btn-success !py-1 !px-2 text-xs m-auto w-20">
                          مفعلة
                        </span>
                      ) : (
                        <span class="btn btn-danger !bg-red-500 hover:!bg-red-600 !py-1 !px-2 text-xs m-auto w-20">
                          غير مفعلة
                        </span>
                      )}{" "}
                    </td>{" "}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {onSearch && <Spinner />}
      <ShowBenefit getter={benefit} setter={setBenefit} />
      {role == "Admin" && <EditPersonModal data={dataSendToModal} />}
    </div>
  );
};

export default Subscribers;

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
