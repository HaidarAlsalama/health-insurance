import { useEditPerson } from "API/eng";
import {
  useEditPersonWAS,
  useEngineerWAS,
  useSpacilzations,
  useWorkplaces,
} from "API/engNotebook";
import {
  useEditPayMethodAndFormNumber,
  usePayMethodAndFormNumber,
  usePayMethode,
} from "API/subscriber";
import { Spinner } from "components";
import ActionModal from "components/ActionModal/ActionModal";
import InputField from "components/InputField/InputField";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function EditPayMethodAndFormNumberModal({
  data = { id: 0, rand: 0 },
}) {
  const { role } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState();

  const [payMethod, setPayMethod] = useState(0);
  const [thisNum, setThisNum] = useState(0);

  const {
    data: payMethodAndFormNumber,
    isLoading: ayMethodAndFormNumberIsLoading,
    isSuccess: ayMethodAndFormNumberIsSuccess,
  } = usePayMethodAndFormNumber(data.id || 0, year);

  const {
    data: allPayMethod,
    isLoading: payMethodIsLoading,
    isSuccess: payMethodIsSuccess,
  } = usePayMethode();

  const {
    mutate: editEngineerPMN,
    isPending: editEngineerPMNIsPending,
    isSuccess: editEngineerPMNIsSuccess,
  } = useEditPayMethodAndFormNumber();

  // const [editedPerson, setEditedPerson] = useState({});

  useEffect(() => {
    if (data.id !== 0 && role == "Admin") setIsOpen(true);
  }, [data]);

  useEffect(() => {
    const getYear = localStorage.getItem("currentYear");
    if (getYear) setYear(getYear);
  }, []);

  useEffect(() => {
    if (ayMethodAndFormNumberIsSuccess) {
      setPayMethod(payMethodAndFormNumber.data.payMethod);
      setThisNum(payMethodAndFormNumber.data.formNumber);
    }
  }, [ayMethodAndFormNumberIsSuccess]);

  useEffect(() => {
    if (editEngineerPMNIsSuccess) setIsOpen(false);
  }, [editEngineerPMNIsSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    editEngineerPMN({
      engineerId: data.id,
      year,
      formNumber: thisNum,
      payMethodId: payMethod,
    });
  };

  return (
    <ActionModal
      title={"تعديل طريقة الدفع ورقم المعاملة"}
      open={isOpen}
      close={setIsOpen}
    >
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        {ayMethodAndFormNumberIsSuccess && (
          <>
            <div className="flex flex-col p-2_">
              <label className=" md:text-sm font-medium text-gray-800">
                رقم المعاملة{" "}
              </label>
              <input
                type="number"
                className="border rounded-lg p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
                value={thisNum}
                onChange={(e) => setThisNum(e.target.value)}
              />
            </div>
            <div className="flex flex-col p-2_ no-print">
              <label className=" md:text-sm font-medium text-gray-800">
                طريقة الدفع{" "}
              </label>
              <select
                onChange={(e) => {
                  setPayMethod(e.target.value);
                }}
                className="border rounded-lg p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 "
                value={payMethod}
              >
                {allPayMethod &&
                  allPayMethod.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.nameMethod}
                    </option>
                  ))}
              </select>
            </div>
            <button
              disabled={editEngineerPMNIsPending}
              className="btn btn-success w-24 md:col-span-2 mx-auto "
            >
              {editEngineerPMNIsPending ? <Spinner sm /> : "تعديل"}
            </button>
          </>
        )}
      </form>
      {ayMethodAndFormNumberIsLoading && <Spinner page />}
    </ActionModal>
  );
}
