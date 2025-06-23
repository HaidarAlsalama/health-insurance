import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAddHospital,
  useDeleteHospital,
  useEditHospital,
  useEditHospitalStatus,
  useHospital,
} from "API/hospital";
import { useCity } from "API/static";
import { Spinner } from "components";
import ActionModal from "components/ActionModal/ActionModal";
import { InputFieldZod } from "components/InputField/InputFieldZod";
import RoleChecker from "components/RoleChecker/RoleChecker";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsBuildingAdd } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { HiOutlineTrash } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid"; // استيراد uuidv4

export default function Hospitals() {
  const { role } = useSelector((state) => state.auth);
  const [isOpenModalAddHospital, setIsOpenModalAddHospital] = useState(false);

  const [dataSendToModal, setDataSendToModal] = useState({});
  const [sendIdToModal, setSendIdToModal] = useState({});

  const {
    data: hospitals,
    isLoading: hospitalsIsLoading,
    isSuccess: hospitalsIsSuccess,
    isError: hospitalsIsError,
  } = useHospital();

  const {
    mutate: changeHospitalStatus,
    isPending: hospitalStatusIsPending,
    // isSuccess: hospitalStatusIsSuccess,
  } = useEditHospitalStatus();

  return (
    <div className="bg-gray-50 rounded-md h-full p-4">
      <button
        className="btn btn-primary text-sm w-24"
        onClick={() => {
          setIsOpenModalAddHospital(true);
        }}
      >
        اضافة
        <BsBuildingAdd />
      </button>
      <div className="flex gap-4 flex-wrap justify-center w-full mt-4">
        <div className="relative  mx-auto overflow-x-auto shadow-md sm:rounded-lg h-full w-full max-w-6xl">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400 mx-auto !text-center relative">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
              <tr>
                <th scope="col" className="px-2 py-2 text-nowrap">
                  #
                </th>
                <th scope="col" className="px-4 py-2 text-nowrap">
                  الاسم
                </th>
                <th scope="col" className="px-4 py-2 text-nowrap">
                  المدينة{" "}
                </th>
                <th scope="col" className="px-4 py-2 text-nowrap">
                  الموقع{" "}
                </th>
                <th scope="col" className="px-4 py-2 text-nowrap">
                  هاتف{" "}
                </th>

                {(role == "Admin" || role == "SuperAdmin") && (
                  <>
                    <th scope="col" className="px-4 py-2 text-nowrap">
                      الحالة
                    </th>
                    <th scope="col" className="px-4 py-2 text-nowrap w-fit">
                      الادوات
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="">
              {hospitalsIsSuccess &&
                hospitals?.data?.map((item, index) => (
                  <tr
                    className={`
                        odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 
                        hover:dark:bg-gray-700 hover:bg-gray-200 
                        `}
                    key={index}
                  >
                    <td className="p-2 text-nowrap">{index + 1} </td>
                    <td className="px-4 py-2 text-nowrap">{item.name}</td>
                    <td className="px-4 py-2 text-nowrap">
                      {item.cityName || "- - -"}
                    </td>
                    <td className="px-4 py-2 text-nowrap">
                      {item.address || "- - -"}
                    </td>
                    <td className="px-4 py-2 text-nowrap">
                      {item.phone || "- - - "}
                    </td>
                    <RoleChecker provider={["Admin", "SuperAdmin"]}>
                      <td className="px-4 py-2 text-nowrap">
                        <input
                          type="checkbox"
                          className="w-6 h-6 text-blue-600 disabled:!cursor-not-allowed cursor-pointer bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          checked={item.enabled || false}
                          disabled={hospitalStatusIsPending}
                          onChange={(e) => {
                            changeHospitalStatus({
                              id: item.id,
                              status: e.target.checked,
                            });
                          }}
                        />
                      </td>
                      <td className="p-1">
                        <div className="p-1 text-nowrap gap-1 flex justify-center m-auto items-center">
                          <RoleChecker provider={["SuperAdmin"]}>
                            <button
                              className="btn btn-danger text-xs_ !p-2  !bg-red-500 hover:!bg-red-600"
                              onClick={() => {
                                setSendIdToModal({
                                  id: item.id,
                                  uuid: uuidv4(),
                                });
                              }}
                            >
                              <HiOutlineTrash />
                            </button>
                          </RoleChecker>
                          <button
                            className="btn btn-success text-xs_ !p-2"
                            onClick={() => {
                              setDataSendToModal({
                                ...item,
                                uuid: uuidv4(),
                              });
                            }}
                          >
                            <GoPencil />
                          </button>
                        </div>
                      </td>
                    </RoleChecker>
                  </tr>
                ))}
            </tbody>
          </table>

          {hospitalsIsLoading ? (
            <div className="my-4">
              <Spinner />
            </div>
          ) : hospitalsIsError ? (
            <div className="w-full text-center p-5 font-semibold dark:text-white">
              <h1>لا يوجد بيانات</h1>
            </div>
          ) : (
            false
          )}
        </div>
        <AddHospital
          open={isOpenModalAddHospital}
          close={setIsOpenModalAddHospital}
        />

        <RoleChecker provider={["SuperAdmin"]}>
          <DeleteHospital getter={sendIdToModal} setter={setSendIdToModal} />
        </RoleChecker>

        <RoleChecker provider={["Admin", "SuperAdmin"]}>
          <EditHospital getter={dataSendToModal} setter={setDataSendToModal} />
        </RoleChecker>
      </div>
    </div>
  );
}

const registrationSchema = z.object({
  name: z.string().nonempty("اسم المشفى مطلوب"),
  email: z
    .string()
    .email("صيغة الإيميل غير صحيحة")
    .optional()
    .or(z.literal("").transform(() => "")), // for not required
  phone: z
    .string()
    .regex(/^\d+$/, "يرجى ادخال ارقام فقط")
    .optional()
    .or(z.literal("").transform(() => "")), // for not required
  address: z
    .string()
    .optional()
    .or(z.literal("").transform(() => "")), // for not required
  cityId: z.coerce.number().min(1, "حدد المدينة").optional(),
  enabled: z.boolean().optional().default(false),
  inside: z.boolean().optional().default(true),
});

function EditHospital({ getter }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen && getter?.uuid) {
      setIsOpen(true);
      reset({
        name: getter.name,
        email: getter.email || "",
        phone: getter.phone || "",
        address: getter.address || "",
        inside: getter.inside,
        enabled: getter.enabled,
        cityId: getter.cityId,
      });
    }
  }, [getter]);

  const {
    data: cities,
    isSuccess: citiesIsSuccess,
    isError: citiesIsError,
  } = useCity(isOpen);

  const {
    mutate: editHospital,
    isPending: editHospitalPending,
    isSuccess: editHospitalSuccess,
  } = useEditHospital(getter.id || 0);

  useEffect(() => {
    if (editHospitalSuccess) setIsOpen(false);
  }, [editHospitalSuccess]);

  const onSubmit = (data) => {
    // console.log("بيانات المستخدم:", data);
    editHospital(data);
  };

  const fieldsZod = [
    { label: "اسم المشفى", id: "name", autoComplete: "off" },
    {
      label: "المدينة",
      id: "cityId",
      type: "select",
      options: cities || [],
    },
    { label: "العنوان", id: "address", autoComplete: "off" },
    { label: "الهاتف", id: "phone", autoComplete: "off" },
    { label: "البريد الإلكتروني", id: "email", autoComplete: "off" },
    {
      label: "متعاقد لهذه السنة",
      id: "enabled",
      type: "checkbox",
      value: getter.enabled || false,
    },
  ];

  return (
    <ActionModal title={"اضافة مشفى"} open={isOpen} close={setIsOpen}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" grid grid-cols-1 md:grid-cols-2 gap-4"
        autoComplete="off"
      >
        {fieldsZod.map((field, index) => (
          <InputFieldZod
            type={field.type || "text"}
            options={field?.options}
            key={index}
            label={field.label}
            name={field.id}
            autoComplete={field.id}
            register={register}
            errors={errors}
            value={field.value || null}
            className={`${index == 0 && "md:col-span-2"}`}
          />
        ))}
        <button
          type="submit"
          className="btn btn-primary md:col-span-2  mx-auto mt-4 w-40"
          disabled={editHospitalPending}
        >
          {editHospitalPending ? <Spinner sm /> : "تعديل"}
        </button>
      </form>
    </ActionModal>
  );
}
function AddHospital({ open, close }) {
  const {
    data: cities,
    isSuccess: citiesIsSuccess,
    isError: citiesIsError,
  } = useCity(open);

  const {
    mutate: addHospital,
    isPending: addHospitalPending,
    isSuccess: addHospitalSuccess,
  } = useAddHospital();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  useEffect(() => {
    if (addHospitalSuccess) {
      reset();
      close(false);
    }
  }, [addHospitalSuccess]);

  const onSubmit = (data) => {
    // console.log("بيانات المستخدم:", data);
    addHospital(data);
    // تنفيذ عملية الإضافة
  };

  const fieldsZod = [
    { label: "اسم المشفى", id: "name", autoComplete: "off" },
    {
      label: "المدينة",
      id: "cityId",
      type: "select",
      options: cities || [],
    },
    { label: "العنوان", id: "address", autoComplete: "off" },
    { label: "الهاتف", id: "phone", autoComplete: "off" },
    { label: "البريد الإلكتروني", id: "email", autoComplete: "off" },
    { label: "متعاقد لهذه السنة", id: "enabled", type: "checkbox" },
  ];

  return (
    <ActionModal title={"اضافة مشفى"} open={open} close={close}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" grid grid-cols-1 md:grid-cols-2 gap-4"
        autoComplete="off"
      >
        {fieldsZod.map((field, index) => (
          <InputFieldZod
            type={field.type || "text"}
            options={field?.options}
            key={index}
            label={field.label}
            name={field.id}
            autoComplete={field.id}
            register={register}
            errors={errors}
            className={`${index == 0 && "md:col-span-2"}`}
          />
        ))}
        <button
          type="submit"
          className="btn btn-primary md:col-span-2  mx-auto mt-4 w-40"
          disabled={addHospitalPending}
        >
          {addHospitalPending ? <Spinner sm /> : "اضافة"}
        </button>
      </form>
    </ActionModal>
  );
}
function DeleteHospital({ getter }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen && getter.uuid) setIsOpen(true);
  }, [getter]);

  const {
    mutate: deleteHospital,
    isPending: deleteHospitalPending,
    isSuccess: deleteHospitalSuccess,
  } = useDeleteHospital();

  useEffect(() => {
    if (deleteHospitalSuccess) setIsOpen(false);
  }, [deleteHospitalSuccess]);

  return (
    <ActionModal title={"حذف مشفى"} open={isOpen} close={setIsOpen}>
      <h1 className="font-bold my-2 text-red-500">
        هل انت متأكد من حذف المشفى
      </h1>
      <button
        type="submit"
        className="btn btn-primary md:col-span-2  mx-auto mt-4 w-40"
        onClick={() => {
          deleteHospital(getter.id);
        }}
        disabled={deleteHospitalPending}
      >
        {deleteHospitalPending ? <Spinner sm /> : "حذف"}
      </button>
    </ActionModal>
  );
}
