import { useEditPerson } from "API/eng";
import {
  useEditPersonWAS,
  useEngineerWAS,
  useSpacilzations,
  useWorkplaces,
} from "API/engNotebook";
import { Spinner } from "components";
import ActionModal from "components/ActionModal/ActionModal";
import InputField from "components/InputField/InputField";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function EditEngWorkAndSpecModal({ data = { id: 0, rand: 0 } }) {
  const { role } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const [workPalceId, setWorkPalceId] = useState(0);
  const [workPalceName, setWorkPalceName] = useState("");

  const [specializationId, setSpecializationId] = useState(0);
  const [specializationName, setSpecializationIdName] = useState("");

  const { data: spacilzations, isSuccess: spacilzationsIsSuccess } =
    useSpacilzations();
  const { data: workplaces, isSuccess: workplacesIsSuccess } = useWorkplaces();

  const {
    data: engineerWAS,
    isLoading: engineerWASIsLoading,
    isSuccess: engineerWASIsSuccess,
  } = useEngineerWAS(data.id || 0);

  const {
    mutate: editEngineerWAS,
    isPending: editEngineerWASIsPending,
    isSuccess: editEngineerWASIsSuccess,
  } = useEditPersonWAS();

  // const [editedPerson, setEditedPerson] = useState({});

  useEffect(() => {
    if (data.id !== 0 && role == "Admin") setIsOpen(true);
  }, [data]);

  useEffect(() => {
    if (engineerWASIsSuccess) {
      setWorkPalceId(engineerWAS?.data.workplaceId);
      setWorkPalceName(engineerWAS?.data.workplaceName);
      setSpecializationId(engineerWAS?.data.specializationId);
      setSpecializationIdName(engineerWAS?.data.specializationName);
    }
  }, [engineerWASIsSuccess]);

  // useEffect(() => {
  //   if (personIsSuccess) setEditedPerson(person);
  // }, [person]);

  useEffect(() => {
    if (editEngineerWASIsSuccess) setIsOpen(false);
  }, [editEngineerWASIsSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editEngineerWAS({
      engineerId: data.id,
      workplaceId: workPalceId,
      specializationId,
    });
  };

  const handleChange3 = (event) => {
    setWorkPalceId(event.target.value || 0);
    setWorkPalceName(workplaces.find((x) => x.id == event.target.value)?.name);
  };

  const handleChange6 = (event) => {
    setSpecializationId(event.target.value);
    setSpecializationIdName(
      spacilzations.find((y) => y.id == event.target.value)?.name
    );
  };

  return (
    <ActionModal
      title={"تعديل الاختصاص ومكان العمل"}
      open={isOpen}
      close={setIsOpen}
    >
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        {engineerWASIsSuccess && (
          <>
            <div className="flex flex-col p-2">
              <label className=" md:text-sm">الاختصاص</label>
              <input
                type="text"
                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300
           rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500
            dark:focus:border-blue-500 focus:outline-none focus:ring
            disabled:bg-gray-200`}
                value={specializationName}
                label=" الاختصاص"
                onChange={handleChange6}
                list="spacilzation" // ربط الـ input بـ datalist
              />
              <datalist id="spacilzation">
                {spacilzationsIsSuccess &&
                  spacilzations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {" "}
                      {item.name}
                    </option>
                  ))}
              </datalist>
            </div>
            <div className="flex flex-col p-2">
              <label className=" md:text-sm">مكان العمل</label>
              <input
                type="text"
                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300
           rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500
            dark:focus:border-blue-500 focus:outline-none focus:ring
            disabled:bg-gray-200`}
                value={workPalceName}
                label=" مكان العمل"
                onChange={handleChange3}
                list="workPalce" // ربط الـ input بـ datalist
              />
              <datalist id="workPalce">
                {workplacesIsSuccess &&
                  workplaces.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </datalist>
            </div>
            <button
              disabled={editEngineerWASIsPending}
              className="btn btn-success w-24 md:col-span-2 mx-auto "
            >
              {editEngineerWASIsPending ? <Spinner sm /> : "تعديل"}
            </button>{" "}
          </>
        )}
      </form>
      {engineerWASIsLoading && <Spinner page />}
    </ActionModal>
  );
}
