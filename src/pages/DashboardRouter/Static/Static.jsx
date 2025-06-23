import { createAlert } from "components/Alert/Alert";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [currentYear, setCurrentYear] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getYear = localStorage.getItem("currentYear");
    if (!getYear) createAlert("Warning", "يجب تحديد العام");
    else setCurrentYear(getYear);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("currentYear", currentYear);
    createAlert("Success", "تم اضافة العام الى ثوابت البرنامج");
    navigate("/dashboard");
  };

  return (
    <>
      <div className="flex gap-6 flex-wrap justify-center md:justify-start rounded-lg bg-white h-full w-full p-4">
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 flex-col border h-fit p-2 rounded-lg shadow-md"
        >
          <div className="flex flex-col">
            <label className="md:text-sm font-bold text-gray-700">العام</label>
            <input
              type="text"
              className="rounded-2xl p-2 mt-2 ml-10 w-full  md:ml-1 bg-slate-200"
              defaultValue={currentYear}
              maxLength="4"
              pattern="\d{4}"
              onChange={(e) => setCurrentYear(e.target.value)}
            />
          </div>
          <button className="btn btn-success">ارسال</button>
        </form>
      </div>
    </>
  );
}
