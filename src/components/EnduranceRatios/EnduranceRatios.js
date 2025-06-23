import { Button, Spin, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePercentage } from "react-icons/ai";
import { DeleteOutlined } from "@ant-design/icons";
import { createAlert } from "components/Alert/Alert";
import axios from "axios";
import config from "Constants/environment";
import ActionModal from "components/ActionModal/ActionModal";
import { Spinner } from "components";
import { useSelector } from "react-redux";
const EnduranceRatios = ({ year, cardPrice }) => {
  const [reloadPage, setReloadPage] = useState(0);

  const [GetSurgicals, setGetSurgicals] = useState([]);
  const [loadingGetSurgicals, setLoadingGetSurgicals] = useState(false);
  const [successGetSurgicals, setSuccessGetSurgicals] = useState(false);
  const [idSurgical, setIdSurgical] = useState(0);
  const { token } = useSelector(state => state.auth)

  useEffect(() => {
    const getAllDataForYear = async () => {
      setSuccessGetSurgicals(false);

      try {
        setLoadingGetSurgicals(true);
        const response = await axios.get(
          `${config.baseUrl1}/SurgicalProcedures/GetSurgicals-With-Year/${year}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
            }
          }
        );
        console.log(response.data);

        setGetSurgicals(response.data);
        setSuccessGetSurgicals(true);
        setLoadingGetSurgicals(false);
      } catch (error) {
        setLoadingGetSurgicals(false);
        setSuccessGetSurgicals(false);
        console.error("Error fetching data", "error");
      }
    };

    if (year) {
      getAllDataForYear();
    }
  }, [year, reloadPage]);


  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();
  const inputRef6 = useRef();
  const [enduranceRatios, setEnduranceRatios] = useState([]);
  const [onSendForm, setOnSendForm] = useState(false);
  const [message, setMessage] = useState();
  const handleLabelClick = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  const [newenduranceRatio, setNewEnduranceRatio] = useState({
    name: "",
    pathological_specialization: "",
    price: "",
    ceiling: "",
    in: "",
    out: "",
    noteContent: "",
    year: 0
  });
  const handleNewEndurance = (e) => {
    const { name, value } = e.target;
    setNewEnduranceRatio({
      ...newenduranceRatio,
      [name]: value,
    });
  };
  const handleNumber = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setNewEnduranceRatio({
        ...newenduranceRatio,
        [name]: value,
      });
      if (name === "price") {
        inputRef2.current.placeholder = "";
      }
      if (name === "ceiling") {
        inputRef5.current.placeholder = ""
      }
      if (name === "in") {
        inputRef3.current.placeholder = ""
      }
      if (name === "out") {
        inputRef4.current.placeholder = ""
      }
    } else {
      if (name == "price")
        inputRef2.current.placeholder = "الرجاء ادخال أرقام فقط";

      if (name == "ceiling")
        inputRef5.current.placeholder = "الرجاء ادخال أرقام فقط";

      if (name === "in")
        inputRef3.current.placeholder = "الرجاء ادخال أرقام فقط";

      if (name === "out")
        inputRef4.current.placeholder = "الرجاء ادخال أرقام فقط";

    }
  };
  const addEndurance = () => {
    if (newenduranceRatio.name && newenduranceRatio.price && newenduranceRatio.ceiling && newenduranceRatio.in && newenduranceRatio.out) {
      setEnduranceRatios([...enduranceRatios, newenduranceRatio]);
      setNewEnduranceRatio({
        name: "",
        ceiling: "",
        pathological_specialization: "",
        price: "",
        in: "",
        out: "",
        noteContent: "",
        year: 0,
      });
    } else createAlert("Warning", "جميع الحقول مطلوبة");
  };
  const handleDelete = (record) => {
    setEnduranceRatios(
      EnduranceRatios.filter(
        (endurance) => endurance.name !== record.name || endurance.price
      )
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (onSendForm) return
    setOnSendForm(true)

    if (!cardPrice) {
      createAlert("Error", "يرجى ادخال سعر البطاقة");
      setOnSendForm(false)
      return;
    }

    const hasError = false
    if (enduranceRatios.length === 0) {
      createAlert("Error", "يرجى إضافة نسبة تحمل واحدة على الأقل");
      setOnSendForm(false)
      return;
    }
    if (!hasError) {
      await axios.post(`${config.baseUrl1}/${config.annualSetting}/surgicals`, {

        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        }
        ,
        year: year || 0,
        cardPrice: cardPrice,
        ageSegments: [],
        relationTypes: [

        ],
        hospitals: [],
        surgicals: enduranceRatios.map(enduracne => ({
          name: enduracne.name,
          pathological_specialization: "",
          price: enduracne.price,
          ceiling: enduracne.ceiling,
          in: enduracne.in,
          out: enduracne.out,
          noteContent: enduracne.noteContent,
          year: 0
        })),
      })
        .then(res => {
          setReloadPage(Math.floor(Math.random() * 101));
          setMessage(res.status);
          setEnduranceRatios([])
        })
        .catch(err => {
          console.error(err)
          createAlert("Error", "فشل الارسال")
        })
    }
    setOnSendForm(false)
  }
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
  const columns = [
    {
      title: "اسم الاجراء",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "القيمة",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "داخل الشبكة",
      dataIndex: "in",
      key: "in",
      align: "center",
    },
    {
      title: "خارج الشبكة",
      dataIndex: "out",
      key: "out",
      align: "center",
    },
    {
      title: "السقف العام",
      dataIndex: "ceiling",
      key: "ceiling",
      align: "center",
    },
    {
      title: "الملاحظات",
      dataIndex: "noteContent",
      key: "noteContent",
      align: "center",
    },
    {
      title: "الاجراء",
      key: "delete",
      align: "center",
      render: (text, record) => (
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
        >
          حذف
        </Button>
      ),
    },
  ];
  return (
    <>
      <div className="bg-gray-200 rounded-3xl mt-4 p-3">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center">
            <h2 className="text-2xl mt-2">نسب التحمل</h2>
          </div>
          <div className="flex justify-center items-center mt-4">
            <h3 className="text-lg mt-2 text-slate-600">إضافة نسبة تحمل</h3>
          </div>

          <div className="w-full mb-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="md:text-sm lg:text-lg"
                onClick={() => handleLabelClick(inputRef1)}
              >
                اسم الإجراء الطبي
              </label>
              <input
                name="name"
                type="text"
                value={newenduranceRatio.name}
                className="rounded-2xl p-2 ml-2 w-full "
                ref={inputRef1}
                onChange={handleNewEndurance}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="md:text-sm lg:text-lg"
                onClick={() => handleLabelClick(inputRef2)}
              >
                القيمة
              </label>
              <input
                name="price"
                value={newenduranceRatio.price}
                type="text"
                className="rounded-2xl p-2 ml-2 w-full "
                ref={inputRef2}
                onChange={handleNumber}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="md:text-sm lg:text-lg"
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef3)}
              >
                داخل الشبكة
              </label>
              <input
                name="in"
                type="text"
                className="rounded-2xl p-2 ml-2 w-full "
                ref={inputRef3}
                onChange={handleNumber}
                value={newenduranceRatio.in}
                placeholder="%"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="md:text-sm lg:text-lg"
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef4)}
              >
                خارج الشبكة
              </label>
              <input
                name="out"
                type="text"
                className="rounded-2xl p-2 ml-2 w-full "
                ref={inputRef4}
                onChange={handleNumber}
                value={newenduranceRatio.out}
                placeholder="%"
              />

            </div>

            <div className="flex flex-col gap-2">
              <label
                className="md:text-sm lg:text-lg"
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef5)}
              >
                السقف العام
              </label>
              <input
                name="ceiling"
                type="text"
                className="rounded-2xl p-2 ml-2 w-full "
                ref={inputRef5}
                onChange={handleNumber}
                value={newenduranceRatio.ceiling}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="md:text-sm lg:text-lg"
                style={{ cursor: "pointer" }}
                onClick={() => handleLabelClick(inputRef6)}
              >
                الملاحظات
              </label>
              <input
                name="noteContent"
                type="text"
                className="rounded-2xl p-2 ml-2 w-full "
                ref={inputRef6}
                onChange={handleNewEndurance}
                value={newenduranceRatio.noteContent}
              />
            </div>
          </div>

          <div className="flex justify-end items-center ml-6">
            <button
              type="button"
              className="mt-4 bg-slate-600 text-white rounded-full px-4 py-2 hover:bg-slate-500 lg:text-xs "
              onClick={addEndurance}
            >
              إضافة نسبة التحمل
            </button>
          </div>
          {enduranceRatios.length > 0 && (
            <div style={{ marginTop: "20px", width: "100%" }}>
              {" "}
              {/* عرض الجدول ممتد بالكامل */}
              <Table
                dataSource={enduranceRatios}
                columns={columns}
                rowKey={(record) => `${record.name}-${record.price}`} // مفتاح لكل صف في الجدول
                pagination={false}
                size="small" // لجعل الجدول أصغر
                style={{ width: "100%" }}
              />
            </div>
          )}
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
        {successGetSurgicals && (
          <div>
            <h5 className="font-medium mb-2">نسب التحمل</h5>
            <table className="w-full text-sm text-gray-500 dark:text-gray-400 mx-auto !text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    الإجراء الطبي
                  </th>
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    القيمة
                  </th>
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    داخل الشبكة
                  </th>
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    خارج الشبكة
                  </th>
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    السقف العام
                  </th>
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    الملاحظات
                  </th>
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    الادوات
                  </th>
                </tr>
              </thead>
              <tbody>
                {GetSurgicals.length > 0 &&
                  GetSurgicals.map((item, index) => (
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
                      <td className="px-4 py-2">{item.surgicalName}</td>
                      <td className="px-4 py-2">{item.price}</td>
                      <td className="px-4 py-2">{item.in}</td>
                      <td className="px-4 py-2">{item.out}</td>
                      <td className="px-4 py-2">{item.ceiling}</td>
                      <td className="px-4 py-2">
                        {item?.notes[0]?.content || "----"}
                      </td>

                      <td className="px-4 py-2 flex justify-center gap-4">
                        <button
                          className="btn btn-danger !bg-red-500 hover:!bg-red-600 !py-1 "
                          onClick={() => {
                            setIdSurgical(item.surgicalId);
                          }}
                        >
                          حذف
                        </button>
                        <button className="btn btn-info !py-1">تعديل</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        <DeleteSurgical id={idSurgical} reloadPage={setReloadPage} />

      </div>
    </>
  );
};
export default EnduranceRatios;


export function DeleteSurgical({ id, reloadPage }) {
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
        `${config.baseUrl1}/SurgicalProcedures/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
        }
      }
      );
      reloadPage(Math.floor(Math.random() * 101));
      setIsOpen(false);
      setOnSend(false);
      createAlert("Success", "تم حذف نسبة تحمل بنجاح");
    } catch (error) {
      setOnSend(false);
      console.error("حدث خطأ أثناء الحذف:", error);
    }
  };

  return (
    <ActionModal title={"حذف نسبة تحمل"} open={isOpen} close={setIsOpen}>
      <div className="w-full flex flex-col gap-4">
        <h1 className="font-bold my-2 text-red-500">
          هل انت متأكد من حذف نسبة تحمل ؟
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