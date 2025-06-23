import { useAllEngs } from "API/eng";
import { Spinner } from "components";
import ActionModal from "components/ActionModal/ActionModal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllEngV2() {
  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);

  const [dataSenderToModal, setDataSenderToModal] = useState({});

  const {
    data: allResult,
    isLoading: isLoadingResult,
    isSuccess: isSuccessResult,
    isError: isErrorResult,
  } = useAllEngs(limit, pageNumber);

  return (
    <div className="flex flex-col p-4 justify-between bg-gray-50 h-full rounded-lg">
      <div className="overflow-x-auto mx-auto  w-full">
        <div className="relative mx-auto sm:rounded-lg w-full select-none">
          <table className="text-sm text-gray-500 dark:text-gray-400 text-center w-full">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
              <tr>
                <th scope="col" className="px-4 py-2 text-nowrap">
                  #
                </th>
                <th scope="col" className="px-4 py-2 text-nowrap">
                  الاسم
                </th>
                <th scope="col" className="px-4 py-2 text-nowrap">
                  اسم الام
                </th>
                <th scope="col" className="px-4 py-2 text-nowrap max-w-14">
                  الجنس
                </th>
                <th scope="col" className="px-4 py-2 text-nowrap">
                  الحالة
                </th>
                <th scope="col" className="px-4 py-2 text-nowrap">
                  الرقم الوطني
                </th>
                <th scope="col" className="px-4 py-2 text-nowrap">
                  رقم التأمين
                </th>
                <th scope="col" className="px-4 py-2 text-nowrap">
                  الهندسي
                </th>
                <th scope="col" className="px-4 py-2 text-nowrap">
                  المركزي
                </th>
                <th scope="col" className="px-4 py-2 text-nowrap  max-w-20">
                  المهام
                </th>
              </tr>
            </thead>
            <tbody className="">
              {isSuccessResult &&
                allResult.data.items.map((item, index) => (
                  <tr
                    className={`
                        odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 
                        hover:dark:bg-gray-700 hover:bg-gray-200 cursor-pointer
                        `}
                    onDoubleClick={() =>
                      setDataSenderToModal({
                        ...item,
                        rand: Math.floor(Math.random() * 101),
                      })
                    }
                    key={index}
                  >
                    <td className="px-4 py-2 text-nowrap">{index + 1} </td>
                    <td className="px-4 py-2 text-nowrap">
                      {(item.firstName || "") +
                        " " +
                        (item.fatherName || "") +
                        " " +
                        (item.lastName || "")}
                    </td>
                    <td className="px-4 py-2 text-nowrap">
                      {item.motherName || "- - -"}
                    </td>
                    <td className="px-4_ py-2_ text-nowrap">
                      {item.genderId == 1 ? "ذكر" : "انثى"}
                    </td>
                    <td className="px-2_ py-1_ border-on-print">
                      {item.statusId == 1
                        ? "متزوج"
                        : item.statusId == 2
                          ? "عازب"
                          : item.statusId == 3
                            ? "منفصل"
                            : "-"}
                    </td>

                    <td className="px-4 py-2 text-nowrap">
                      {item.nationalId || "-"}
                    </td>
                    <td className="px-4 py-2 text-nowrap">
                      {item.ensuranceNumber != 0
                        ? item.ensuranceNumber
                        : "- - - "}
                    </td>
                    <td className="px-4 py-2 text-nowrap">
                      {item.engNumber || "- - -"}
                    </td>
                    <td className="px-4 py-2 text-nowrap">
                      {item.subNumber || "- - -"}
                    </td>
                    <td className="p-1 text-nowrap gap-1 grid max-w-20">
                      <button
                        className="btn btn-primary text-xs !p-1"
                        onClick={() => {
                          navigate(
                            `/dashboard/insurance-card?eng=${item?.engNumber || item?.perEngDTO?.engNumber
                            }`
                          );
                        }}
                      >
                        العائلة
                      </button>
                      <button
                        className="btn btn-info text-xs !p-1"
                        onClick={() => {
                          navigate(
                            `/dashboard/subscribers/add?eng=${item?.engNumber}`
                          );
                        }}
                      >
                        اشتراك
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {isLoadingResult ? (
            <div className="my-4">
              <Spinner />
            </div>
          ) : !allResult || allResult?.data.items.length == 0 ? (
            <div className="w-full text-center p-5 font-semibold dark:text-white">
              <h1>لا يوجد بيانات</h1>
            </div>
          ) : (
            false
          )}
        </div>
      </div>
      {/* {!isLoadingResult && ( */}
      <div className="flex flex-col items-center my-4 w-full">
        <span className="text-sm text-gray-700 dark:text-gray-400 flex gap-1">
          <span className="font-semibold text-gray-900 dark:text-white">
            {allResult?.data.currentPage || 0}
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            من اصل
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {allResult?.data.totalPages || 0}
          </span>{" "}
        </span>
        <div className="flex gap-4 mt-2">
          <button
            onClick={() => setPageNumber((prev) => prev - 1)}
            disabled={pageNumber == 1 || isLoadingResult}
            className="btn btn-info text-sm !p-1 w-20 "
          >
            السابق
          </button>
          <button
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={
              pageNumber == allResult?.data.totalPages ||
              allResult?.data.totalPages == 0 ||
              isLoadingResult
            }
            className="btn btn-primary text-sm !p-1 w-20 "
          >
            التالي
          </button>
        </div>
      </div>
      {/* )} */}
      <ModalShowMoreInfoAboutEng engInfo={dataSenderToModal} />
    </div>
  );
}

function ModalShowMoreInfoAboutEng({ engInfo = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (Object.keys(engInfo).length > 0) {
      setIsOpen(true);
    }
  }, [engInfo]);

  const fields = [
    {
      label: "الاسم",
      value: `${engInfo.firstName || ""} ${engInfo.fatherName || ""} ${engInfo.lastName || ""
        }`,
    },
    { label: "اسم الأم", value: engInfo.motherName || "- - -" },
    { label: "الرقم الوطني", value: engInfo.nationalId || "- - -" },
    { label: "رقم التأمين", value: engInfo.ensuranceNumber || "- - -" },
    {
      label: "تاريخ الميلاد",
      value: new Date(engInfo.birthDate).toLocaleDateString("ar-SY") || "- - -",
    },
    { label: "العنوان", value: engInfo.address || "- - -" },
    { label: "الجوال", value: engInfo.mobile || "- - -" },
    { label: "البريد الإلكتروني", value: engInfo.email || "- - -" },
    { label: "الرقم الهندسي", value: engInfo.engNumber || "- - -" },
    { label: "الرقم المركزي", value: engInfo.subNumber || "- - -" },
    {
      label: "المبلغ",
      value: engInfo.amount ? engInfo.amount.toLocaleString() : "- - -",
    },
  ];

  return (
    <ActionModal
      title={`كافة التفاصيل لـ ${(engInfo?.firstName || "") +
        " " +
        (engInfo?.fatherName || "") +
        " " +
        (engInfo?.lastName || "")
        }`}
      open={isOpen}
      close={setIsOpen}
    >
      <table className="text-sm text-gray-500 dark:text-gray-400 w-full">
        <tbody>
          {fields.map((field, index) => (
            <tr
              key={index}
              className={`
              ${index % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
                } 
              border-b dark:border-gray-700 hover:dark:bg-gray-700 hover:bg-gray-200
            `}
            >
              <td className="px-4 py-2 text-nowrap font-bold text-right">
                {field.label}
              </td>
              <td className="px-4 py-2 text-nowrap">{field.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ActionModal>
  );
}
