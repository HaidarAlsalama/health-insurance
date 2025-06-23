import { useEditPerson, usePerson } from "API/eng";
import { Spinner } from "components";
import ActionModal from "components/ActionModal/ActionModal";
import InputField from "components/InputField/InputField";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function EditPersonModal({ data = { id: 0, rand: 0 } }) {
  const { role } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: person,
    isLoading: isLoadingPerson,
    isSuccess: personIsSuccess,
  } = usePerson(data.id);

  const {
    mutate: editPerson,
    isPending: editPersonIsPending,
    isSuccess: editPersonIsSuccess,
  } = useEditPerson(data.id, localStorage.getItem("currentYear"));

  const [editedPerson, setEditedPerson] = useState({});

  useEffect(() => {
    if (data.id !== 0 && role == "Admin") setIsOpen(true);
  }, [data]);

  useEffect(() => {
    if (personIsSuccess) setEditedPerson(person);
  }, [person]);

  useEffect(() => {
    if (editPersonIsSuccess) setIsOpen(false);
  }, [editPersonIsSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(editedPerson);
    // return;

    editPerson(editedPerson);
  };

  return (
    <ActionModal
      title={"تعديل البيانات الشخصية"}
      open={isOpen}
      close={setIsOpen}
    >
      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        onSubmit={handleSubmit}
      >
        {person && personIsSuccess && (
          <>
            <InputField
              title={"الاسم الاول"}
              id={"firstName"}
              value={editedPerson.firstName || ""}
              onChange={(e) => {
                setEditedPerson({ ...editedPerson, firstName: e.value });
              }}
            />
            <InputField
              title={"اسم الاب"}
              id={"fatherName"}
              onChange={(e) => {
                setEditedPerson({ ...editedPerson, fatherName: e.value });
              }}
              value={editedPerson.fatherName || ""}
            />
            <InputField
              title={"الكنية"}
              id={"lastName"}
              onChange={(e) => {
                setEditedPerson({ ...editedPerson, lastName: e.value });
              }}
              value={editedPerson.lastName || ""}
            />
            <InputField
              title={"اسم الام"}
              id={"motherName"}
              onChange={(e) => {
                setEditedPerson({ ...editedPerson, motherName: e.value });
              }}
              value={editedPerson.motherName || ""}
            />
            <div className="">
              <label className="text-sm font-medium dark:text-white text-gray-700">
                الجنس
              </label>
              <select
                className={`block disabled:bg-gray-200 w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring `}
                value={editedPerson.genderId}
                label="الجنس"
                onChange={(e) => {
                  setEditedPerson({
                    ...editedPerson,
                    genderId: e.target.value,
                  });
                }}
              >
                <option value="1">ذكر</option>
                <option value="2">انثى</option>
              </select>
            </div>
            <InputField
              title={"تاريخ الميلاد"}
              type="date"
              id={"birthDate"}
              onChange={(e) => {
                setEditedPerson({ ...editedPerson, birthDate: e.value });
              }}
              value={editedPerson.birthDate?.split("T")[0] || ""}
            />
            <InputField
              title={"الرقم التأميني"}
              id={"ensuranceNumber"}
              onChange={(e) => {
                setEditedPerson({ ...editedPerson, ensuranceNumber: e.value });
              }}
              value={editedPerson.ensuranceNumber || ""}
              direction="ltr"
            />
            <InputField
              title={"الرقم الوطني"}
              id={"nationalId"}
              onChange={(e) => {
                setEditedPerson({ ...editedPerson, nationalId: e.value });
              }}
              value={editedPerson.nationalId || ""}
              direction="ltr"
            />
            <InputField
              title={"العنوان"}
              id={"address"}
              onChange={(e) => {
                setEditedPerson({ ...editedPerson, address: e.value });
              }}
              value={editedPerson.address || ""}
            />
            <InputField
              title={"رقم الجوال"}
              id={"mobile"}
              onChange={(e) => {
                setEditedPerson({ ...editedPerson, mobile: e.value });
              }}
              value={editedPerson.mobile || ""}
              direction="ltr"
            />
            <InputField
              title={"البريد الإلكتروني"}
              id={"email"}
              onChange={(e) => {
                setEditedPerson({ ...editedPerson, email: e.value });
              }}
              value={editedPerson.email || ""}
            />
            <div className="">
              <label className="text-sm font-medium dark:text-white text-gray-700">
                الحالة الاجتماعية
              </label>
              <select
                className={`block disabled:bg-gray-200 w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring `}
                value={editedPerson.statusId}
                label="الحالة الاجتماعية"
                onChange={(e) => {
                  setEditedPerson({
                    ...editedPerson,
                    statusId: e.target.value,
                  });
                }}
              >
                <option value="0"> الحالة الاجتماعية</option>
                <option value="1">متزوج</option>
                <option value="2">عازب</option>
                <option value="3">منفصل</option>
              </select>
            </div>
            <button
              disabled={editPersonIsPending}
              className="btn btn-success w-24 md:col-span-3 mx-auto "
            >
              {editPersonIsPending ? <Spinner sm /> : "تعديل"}
            </button>{" "}
          </>
        )}
      </form>
      {isLoadingPerson && <Spinner page />}
    </ActionModal>
  );
}
