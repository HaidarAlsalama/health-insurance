import React, { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { InputFieldZod } from "components/InputField/InputFieldZod";
import { useEngFromNakaba } from "API/eng";
import { type } from "@testing-library/user-event/dist/type";
import { useSpacilzations, useWorkplaces } from "API/engNotebook";

const registrationSchema = z.object({
  engNumber: z.string().nonempty("الرقم الهندسي مطلوب"),
  firstName: z.string().nonempty("اسم المهندس/ة مطلوب"),
  fatherName: z.string().nonempty("اسم الأب مطلوب"),
  lastName: z.string().nonempty("الكنية مطلوبة"),
  motherName: z.string().nonempty("اسم الأم مطلوب"),
  gender: z.enum(["1", "2"], { errorMap: () => ({ message: "اختر الجنس" }) }),
  socialStatus: z.enum(["1", "2"], {
    errorMap: () => ({ message: "اختر الجنس" }),
  }),
  address: z.string().nonempty("العنوان مطلوب"),
  nationalId: z.string().regex(/^\d+$/, "يرجى ادخال ارقام فقط"),
  subNumber: z.string().optional(),
  insuranceNumber: z.string().nonempty("رقم التأمين مطلوب"),
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
  mobile: z.string().regex(/^\d+$/, "يرجى ادخال ارقام فقط").optional(),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "يجب أن يكون التاريخ بصيغة YYYY-MM-DD"),
  workPlace: z.string(),
  specialization: z.string(),
});

export default function AddEngV2() {
  const [engNumberForSearch, setEngNumberForSearch] = useState(0);

  const [workPalceId, setWorkPalceId] = useState(0);
  const [workPalceName, setWorkPalceName] = useState("");

  const [spacilzationId, setSpacilzationId] = useState(0);
  const [spacilzationName, setSpacilzationName] = useState("");

  const {
    data: engFromNakaba,
    isLoading: isLoadingEngFromNakaba,
    isSuccess: isSuccessEngFromNakaba,
    isError: isErrorEngFromNakaba,
    error,
  } = useEngFromNakaba(engNumberForSearch);

  const { data: spacilzations, isSuccess: spacilzationsIsSuccess } =
    useSpacilzations();
  const { data: workplaces, isSuccess: workplacesIsSuccess } = useWorkplaces();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const engNumValue = watch("engNumber");
  const debouncedEngNum = useCallback(
    debounce((value) => setEngNumberForSearch(value), 500),
    []
  );
  useEffect(() => {
    if (engNumValue) {
      debouncedEngNum(engNumValue);
    }
  }, [engNumValue, debouncedEngNum]);

  useEffect(() => {
    if (isSuccessEngFromNakaba) {
      console.log(123);

      reset({
        firstName: engFromNakaba?.firstName || "",
        lastName: engFromNakaba?.lastName || "",
        fatherName: engFromNakaba?.fatherName || "",
        motherName: engFromNakaba?.motherName || "",
        gender: engFromNakaba?.gender || "",
      });
    } else if (isErrorEngFromNakaba) {
      reset({
        firstName: "",
        lastName: "",
        fatherName: "",
        motherName: "",
        gender: "",
      });
    }
  }, [isSuccessEngFromNakaba, isErrorEngFromNakaba]);

  const onSubmit = (data) => {
    data.spacilzationId = spacilzationId;
    data.workPalceId = workPalceId;
    console.log("بيانات المستخدم:", data);
    reset();
    // تنفيذ عملية الإضافة
  };

  const fieldsZod = [
    { label: "الرقم الهندسي", id: "engNumber", autoComplete: "off" },
    { label: "اسم المهندس/ة", id: "firstName", autoComplete: "name" },
    { label: "اسم الأب", id: "fatherName", autoComplete: "off" },
    { label: "الكنية", id: "lastName", autoComplete: "off" },
    { label: "اسم الام", id: "motherName", autoComplete: "off" },
    {
      label: "الجنس",
      id: "gender",
      autoComplete: "off",
      type: "select",
      options: [
        { id: 1, title: "ذكر" },
        { id: 2, title: "انثى" },
      ],
    },
    {
      label: "الحالة الاجتماعية",
      id: "socialStatus",
      autoComplete: "off",
      type: "select",
      options: [
        { id: 1, title: "متزوج" },
        { id: 2, title: "عازب" },
        { id: 3, title: "منفصل" },
      ],
    },
    { label: "العنوان", id: "address", autoComplete: "address" },
    { label: "الرقم الوطني", id: "nationalId", autoComplete: "off" },
    { label: "الرقم المركزي", id: "subNumber", autoComplete: "off" },
    { label: "رقم التأمين", id: "insuranceNumber", autoComplete: "off" },
    { label: "الإيميل", id: "email", autoComplete: "email" },
    { label: "الهاتف", id: "phone", autoComplete: "tel" },
    { label: "الموبايل", id: "mobile", autoComplete: "tel" },
    {
      label: "تاريخ الميلاد",
      id: "birthDate",
      autoComplete: "bday",
      type: "date",
    },
  ];

  const handleChange3 = (event) => {
    setWorkPalceId(event.target.value || 0);
    setWorkPalceName(workplaces.find((x) => x.id == event.target.value)?.name);
  };

  const handleChange6 = (event) => {
    setSpacilzationId(event.target.value);
    setSpacilzationName(
      spacilzations.find((y) => y.id == event.target.value)?.name
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex flex-col"
      >
        <div className="w-full  p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
            />
          ))}

          <div className="flex flex-col p-2">
            <label className=" md:text-sm">الاختصاص</label>
            <input
              type="text"
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300
           rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500
            dark:focus:border-blue-500 focus:outline-none focus:ring
            disabled:bg-gray-200`}
              value={spacilzationName}
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
        </div>

        <button
          type="submit"
          className="btn btn-primary md:col-span-2  mx-auto mt-4 w-40"
        >
          اضافة
        </button>
      </form>{" "}
      <button
        // type="submit"
        className="btn btn-info md:col-span-2  mx-auto mt-4 w-40"
        onClick={() => reset()}
      >
        اضافة فرد عائلة
      </button>
    </div>
  );
}
