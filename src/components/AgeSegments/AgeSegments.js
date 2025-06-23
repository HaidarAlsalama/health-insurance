import axios from "axios";
import { createAlert } from "components/Alert/Alert";
import config from "Constants/environment";
import { Spin, Table, Button } from 'antd'; // استيراد Spin وجدول وأزرار من ant design
import { DeleteOutlined } from '@ant-design/icons'; // استيراد أيقونة الحذف
import React, { useEffect, useRef, useState } from "react";
import ActionModal from "components/ActionModal/ActionModal";
import { Spinner } from "components";
import { useSelector } from "react-redux";

const AgeSegments = ({ cardPrice, year }) => {
  const [reloadPage, setReloadPage] = useState(0);
  const { token } = useSelector(state => state.auth)
  const [GetAllConfigData, setGetAllConfigData] = useState({});
  const [successGetAllConfigData, setSuccessGetAllConfigData] = useState(false);

  const [ageSegments, setAgeSegments] = useState([]);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const [message, setMessage] = useState();
  const [noteAgeSegment, setNoteAgeSegment] = useState("");
  const [newSegment, setNewSegment] = useState({
    fromYear: "",
    toYear: "",
    theAmount: "",
    enduranceRatio: 20,
    noteContent: "",
  });

  /** modal */
  const [mdAgeSegments, setMdAgeSegments] = useState({
    id: 0,
    year: 0,
    fromYear: 0,
    toYear: 0,
    theAmount: 0,
    enduranceRatio: 0,
  });
  const [idAgeSegment, setIdAgeSegment] = useState(0);


  useEffect(() => {
    const getAllDataForYear = async () => {
      setSuccessGetAllConfigData(false);
      try {
        const response = await axios.get(
          `${config.baseUrl1}/AnnualData/GetAllConfigData/${year}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
            }
          }
        );
        // console.log(response.data);

        setGetAllConfigData(response.data);
        setSuccessGetAllConfigData(true);
      } catch (error) {
        setSuccessGetAllConfigData(false);
        console.error("Error fetching data", "error");
      }

    };

    if (year) {
      getAllDataForYear();
    }
  }, [year, reloadPage]);

  const [onSendForm, setOnSendForm] = useState(false); // حالة الإرسال

  const addAgeSegment = () => {
    if (newSegment.fromYear && newSegment.toYear && newSegment.theAmount) {
      setAgeSegments([...ageSegments, newSegment]);
      setNewSegment({
        fromYear: "",
        toYear: "",
        theAmount: "",
        enduranceRatio: 20,
        noteContent: "",
      });
    } else {
      createAlert('Warning', "جميع الحقول مطلوبة");
    }
  };

  const handleNewSegmentChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setNewSegment({
        ...newSegment,
        [name]: value,
      });
      if (name === "fromYear") {
        inputRef1.current.placeholder = "";
      }
      if (name === "toYear") {
        inputRef2.current.placeholder = "";
      }
      if (name === "theAmount") {
        inputRef3.current.placeholder = "";
      }
    } else {
      if (name === "fromYear")
        inputRef1.current.placeholder = "الرجاء إدخال أرقام فقط";
      if (name === "toYear")
        inputRef2.current.placeholder = "الرجاء إدخال أرقام فقط";
      if (name === "theAmount")
        inputRef3.current.placeholder = "الرجاء إدخال أرقام فقط";
    }
  };

  const handleLabelClick = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleDelete = (record) => {
    setAgeSegments(ageSegments.filter(segment => segment.fromYear !== record.fromYear || segment.toYear !== record.toYear));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onSendForm) return
    setOnSendForm(true)

    if (!cardPrice) {
      createAlert("Error", "يرجى ادخال سعر البطاقة");
      setOnSendForm(false)
      return;
    }

    if (ageSegments.length === 0) {
      createAlert("Error", "يرجى إضافة شريحة عمرية واحدة على الأقل");
      setOnSendForm(false)
      return;
    }

    const allageSegments = ageSegments.map((item) => {
      return { ...item, noteContent: noteAgeSegment };
    });

    await axios
      .post(`${config.baseUrl1}/${config.annualSetting}/agesegment`, {
        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        }
        ,
        year: year || 0,
        cardPrice: cardPrice,
        ageSegments: allageSegments,
        relationTypes: [],
        hospitals: [],
        surgicals: [],
      })
      .then((res) => {
        console.log(res);
        setMessage(res.status);
        setReloadPage(Math.floor(Math.random() * 101));

        // تفريغ الشرائح العمرية والملاحظات بعد نجاح الإرسال
        setAgeSegments([]);
        setNoteAgeSegment("");

      })
      .catch((err) => {
        console.error(err);
        createAlert("Error", "فشل الارسال");
      });

    setOnSendForm(false)
  };

  useEffect(() => {
    if (message === 200) {
      setTimeout(() => {
        createAlert("Success", "نجاح الارسال");
        setMessage(null);
      }, 1000);
    }
  }, [message]);

  // الأعمدة الخاصة بالجدول
  const columns = [
    {
      title: "من عام",
      dataIndex: "fromYear",
      key: "fromYear",
      align: "center",
    },
    {
      title: "حتى عام",
      dataIndex: "toYear",
      key: "toYear",
      align: "center",
    },
    {
      title: "رسم التسجيل",
      dataIndex: "theAmount",
      key: "theAmount",
      align: "center",
    },
    {
      title: "الإجراء",
      align: "center",
      key: "delete",
      render: (text, record) => (
        <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
          حذف
        </Button>
      ),
    }
  ];

  return (
    <>
      <div className="bg-gray-200 rounded-3xl mt-4 p-3">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center">
            <h2 className="text-2xl mt-2">رسوم الاشتراك بالتأمين حسب الشرائح العمرية</h2>
          </div>

          <div className="flex justify-center items-center mt-4">
            <h3 className="text-lg mt-2 text-slate-600">شريحة جديدة</h3>
          </div>

          <div className="w-full mb-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex pt-3 flex-col gap-1">
              <label className="ml-10 mt-2 md:text-sm lg:ml-0 lg:mt-2 lg:text-lg" onClick={() => handleLabelClick(inputRef1)}>
                من عام
              </label>
              <input
                type="text"
                name="fromYear"
                className="rounded-2xl p-2 ml-2"
                value={newSegment.fromYear}
                onChange={handleNewSegmentChange}
                ref={inputRef1}
              />
            </div>

            <div className="flex pt-3 flex-col gap-1">
              <label className="ml-10 mt-2 md:text-sm lg:ml-0 lg:mt-2 lg:text-lg" onClick={() => handleLabelClick(inputRef2)}>
                حتى عام
              </label>
              <input
                type="text"
                className="rounded-2xl p-2 ml-2"
                name="toYear"
                value={newSegment.toYear}
                onChange={handleNewSegmentChange}
                ref={inputRef2}
              />
            </div>

            <div className="flex pt-3 flex-col gap-1">
              <label className="ml-10 mt-2 md:text-sm lg:ml-0 lg:mt-2 lg:text-lg" onClick={() => handleLabelClick(inputRef3)}>
                رسم التسجيل
              </label>
              <input
                type="text"
                name="theAmount"
                className="rounded-2xl p-2 ml-2"
                value={newSegment.theAmount}
                onChange={handleNewSegmentChange}
                ref={inputRef3}
              />
            </div>
          </div>

          <div className="flex justify-end items-center ml-5">
            <button
              type="button"
              onClick={addAgeSegment}
              className="mt-4 bg-slate-600 text-white rounded-full px-4 py-2 hover:bg-slate-500 lg:text-xs"
            >
              إضافة شريحة عمرية
            </button>
          </div>

          {/* عرض الجدول أسفل زر إضافة الشريحة */}
          {ageSegments.length > 0 && (
            <div style={{ marginTop: '20px', width: '100%' }}>
              <Table
                dataSource={ageSegments}
                columns={columns}
                rowKey={(record) => `${record.fromYear}-${record.toYear}`}
                pagination={false}
                size="small"
                style={{ width: '100%' }}
              />
            </div>
          )}

          {/* <div className="flex flex-col mt-6 p-5">
            <label onClick={() => handleLabelClick(inputRef4)}>الملاحظات:</label>
            <div className="flex relative">
              <textarea
                ref={inputRef4}
                name="noteContent"
                placeholder="إضافة ملاحظات"
                value={noteAgeSegment}
                rows={4}
                cols={200}
                className="p-4 bg-gray-100 border border-black rounded-2xl placeholder:p-4"
                onChange={(e) => setNoteAgeSegment(e.target.value)}
              />
            </div>
          </div> */}

          <div className="flex justify-center p-2 w-full">
            <button
              className="flex justify-center items-center shadow-md rounded-full w-1/3 py-0 mt-2 h-10 md:w-1/4 lg:w-1/6 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400"
              style={{ color: "white", fontSize: "18px" }}
              disabled={onSendForm} // تعطيل الزر أثناء الإرسال
            >
              {onSendForm ? (
                <Spin size="small" /> // عرض Spin عند الإرسال
              ) : (
                "إضافة"
              )}
            </button>
          </div>
        </form>

        {successGetAllConfigData && (
          <>
            <div>
              <h5 className="font-medium mb-2">الشرائح العمرية</h5>
              <table className="w-full text-sm text-gray-500 dark:text-gray-400 mx-auto !text-center">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      من عام
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      إلى عام
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      رسم التسجيل
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      الادوات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {GetAllConfigData.ageSegments.length > 0 &&
                    GetAllConfigData.ageSegments.map((item, index) => (
                      <tr
                        className={`odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-slate-200 ${item.isCancel && "!text-red-500"
                          }`}
                        key={index}
                      >
                        <th
                          scope=""
                          className="px-4 py-2 font-medium whitespace-nowrap "
                        >
                          {index + 1}
                        </th>
                        <td className="px-4 py-2">{item.fromYear}</td>
                        <td className="px-4 py-2">{item.toYear}</td>
                        <td className="px-4 py-2">{item.theAmount}</td>
                        <td className="px-4 py-2 flex justify-center gap-4">
                          <button
                            className="btn btn-danger !bg-red-500 hover:!bg-red-600 !py-1 "
                            onClick={() => setIdAgeSegment(item.id)}
                          >
                            حذف
                          </button>
                          <button
                            className="btn btn-info !py-1"
                            onClick={() => {
                              setMdAgeSegments(item);
                            }}
                          >
                            تعديل
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {GetAllConfigData.ageSegments.length == 0 && (
                <h5 className="w-full text-center bg-gray-200 p-2">
                  لا يوجد بيانات
                </h5>
              )}

            </div>

          </>
        )}


        <EditAgeSegment dataGeter={mdAgeSegments} reloadPage={setReloadPage} />
        <DeleteAgeSegment id={idAgeSegment} reloadPage={setReloadPage} />
      </div>
    </>
  );
};
export default AgeSegments;

export function EditAgeSegment({ dataGeter, reloadPage }) {
  const [isOpen, setIsOpen] = useState(dataGeter.id != 0 ? true : false);
  const [mdAgeSegments, setMdAgeSegments] = useState(dataGeter);
  const [onSend, setOnSend] = useState(false);
  const { token } = useSelector(state => state.auth)

  useEffect(() => {
    if (dataGeter?.id != 0) {
      setIsOpen(true);
      setMdAgeSegments(dataGeter);
    }
  }, [dataGeter]);

  const handleSubmit = async () => {
    try {
      setOnSend(true);
      const response = await axios.put(
        `${config.baseUrl1}/AnnualData/UpdateAgeSegments`,
        mdAgeSegments, {
        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        }
      }
      );
      reloadPage(Math.floor(Math.random() * 101));
      setIsOpen(false);
      setOnSend(false);
      createAlert("Success", "تم التحديث بنجاح");
    } catch (error) {
      setOnSend(false);
      console.error("حدث خطأ أثناء التحديث:", error);
    }
  };

  return (
    <ActionModal title={"تعديل شريحة عمرية"} open={isOpen} close={setIsOpen}>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col mr-2 w-full">
          <label
            className=" my-1 font-medium text-lg"
            style={{ cursor: "pointer" }}
          >
            من عام
          </label>
          <input
            className="shadow appearance-none border text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-2"
            type="text"
            maxLength="4"
            value={mdAgeSegments.fromYear}
            pattern="\d{4}" // التأكد من أن الإدخال أرقام فقط
            onChange={(e) =>
              setMdAgeSegments({ ...mdAgeSegments, fromYear: e.target.value })
            }
            style={{ direction: "ltr" }}
          />
        </div>

        <div className="flex flex-col mr-2 w-full">
          <label
            className=" my-1 font-medium text-lg"
            style={{ cursor: "pointer" }}
          >
            الى عام
          </label>
          <input
            className="shadow appearance-none border text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-2"
            type="text"
            maxLength="4"
            value={mdAgeSegments.toYear}
            pattern="\d{4}" // التأكد من أن الإدخال أرقام فقط
            onChange={(e) =>
              setMdAgeSegments({ ...mdAgeSegments, toYear: e.target.value })
            }
            style={{ direction: "ltr" }}
          />
        </div>

        <div className="flex flex-col mr-2 w-full">
          <label
            className=" my-1 font-medium text-lg"
            style={{ cursor: "pointer" }}
          >
            المبلغ
          </label>
          <input
            className="shadow appearance-none border text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-2"
            type="text"
            value={mdAgeSegments.theAmount}
            onChange={(e) =>
              setMdAgeSegments({
                ...mdAgeSegments,
                theAmount: e.target.value,
              })
            }
            style={{ direction: "ltr" }}
          />
        </div>
        {onSend ? (
          <Spinner />
        ) : (
          <button
            className="btn btn-success w-40 mx-auto"
            onClick={handleSubmit}
          >
            تعديل
          </button>
        )}
      </div>
    </ActionModal>
  );
}
export function DeleteAgeSegment({ id, reloadPage }) {
  const [isOpen, setIsOpen] = useState(id != 0 ? true : false);
  const [onSend, setOnSend] = useState(false);
  const { token } = useSelector(state => state.auth)


  useEffect(() => {
    if (id != 0) {
      setIsOpen(true);
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      setOnSend(true);
      const response = await axios.delete(
        `${config.baseUrl1}/AnnualData/DeleteAgeSegment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
          }
        }
      );
      reloadPage(Math.floor(Math.random() * 101));
      setIsOpen(false);
      setOnSend(false);
      createAlert("Success", "تم حذف شريحة عمرية بنجاح");
    } catch (error) {
      setOnSend(false);
      console.error("حدث خطأ أثناء الحذف:", error);
    }
  };

  return (
    <ActionModal title={"حذف شريحة عمرية"} open={isOpen} close={setIsOpen}>
      <div className="w-full flex flex-col gap-4">
        <h1 className="font-bold my-2 text-red-500">
          هل انت متأكد من حذف شريحة عمرية ؟
        </h1>
        {onSend ? (
          <Spinner />
        ) : (
          <button
            className="btn btn-success w-40 mx-auto"
            onClick={handleSubmit}
          >
            حذف
          </button>
        )}
      </div>
    </ActionModal>
  );
}

