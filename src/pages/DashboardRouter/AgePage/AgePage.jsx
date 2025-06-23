import { Spinner } from "components";
import AgeSegments from "components/AgeSegments/AgeSegments";
import { createAlert } from "components/Alert/Alert";
import Collapse from "components/Collapse/Collapse";
import EnduranceRatios from "components/EnduranceRatios/EnduranceRatios";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AgePage = () => {
  const [cardPrice, setCardPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "Admin" && role !== "SuperAdmin") {
      createAlert("Warning", "غير مصرح لك بالدخول لاعدادات السنة");
      navigate("/dashboard");
    }
  }, [role]);

  const handlCardprice = (e) => {
    setCardPrice(e.target.value);
  };

  useEffect(() => {
    const getYear = localStorage.getItem("currentYear");
    if (getYear) setSelectedDate(getYear);
  }, []);

  if (role == "User") return <Spinner page />;

  return (
    <div className="bg-gray-100 w-full p-3 rounded-md h-full">
      <div className="flex justify-end mb-4"></div>
      <div>
        <div className=" p-2">
          <div className=" flex justify-start">
            <div className="w-full mb-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col w-full">
                <label
                  className=" text-sm my-1 md:text-sm lg:ml-0 lg:mt-1 lg:text-lg_"
                  style={{ cursor: "pointer" }}
                >
                  العام
                </label>
                <input
                  className="shadow appearance-none border text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-2 w-full"
                  type="text"
                  maxLength="4"
                  pattern="\d{4}" // التأكد من أن الإدخال أرقام فقط
                  onChange={(e) => setSelectedDate(e.target.value)}
                  placeholder="أدخل العام"
                  defaultValue={selectedDate}
                  style={{ direction: "ltr" }}
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  className=" text-sm my-1 md:text-sm lg:ml-0 lg:mt-1 lg:text-lg_"
                  style={{ cursor: "pointer" }}
                >
                  سعر البطاقة
                </label>
                <input
                  className="shadow appearance-none border text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl p-2 w-full"
                  type="text"
                  value={cardPrice}
                  onChange={handlCardprice}
                  placeholder="سعر البطاقة"
                  style={{ direction: "ltr" }}
                />
              </div>
            </div>
          </div>
        </div>

        <Collapse title={"رسوم الاشتراك بالتأمين حسب الشرائح العمرية"}>
          <AgeSegments year={selectedDate} cardPrice={cardPrice} />
        </Collapse>

        <Collapse title={"نسب التحمل"}>
          <EnduranceRatios year={selectedDate} cardPrice={cardPrice} />
        </Collapse>
      </div>
    </div>
  );
};

export default AgePage;
