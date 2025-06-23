import { useAllNewInsured, useDailyReport } from "API/report";
import { Spinner } from "components";
import Collapse from "components/Collapse/Collapse";
import ContainerInputs from "components/ContainerInputs/ContainerInputs";
import InputField from "components/InputField/InputField";
import config from "Constants/environment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllNewInsured() {
  const navigate = useNavigate();
  const {
    data: report,
    isLoading: reportIsLoading,
    isSuccess: reportIsSuccess,
    isError: reportIsError,
  } = useAllNewInsured();
  return (
    <div className="bg-gray-50 rounded-md h-full p-4">
      <button
        className="btn btn-success !p-1 !text-sm !px-2"
        disabled={!reportIsSuccess}
        onClick={() =>
          window.open(
            `${config.baseUrl1}/EXCEL/reportForNewPersons`,
            "_blank" // لفتح الرابط في علامة تبويب جديدة
          )
        }
      >
        تصدير Excel
      </button>

      <ContainerInputs
        className="bg-white dark:bg-gray-900  min-w-72 m-auto p-6 px-2  "
        title={"عدد الاشخاص  والمبالغ المالية"}
      >
        <div className="md:col-span-2 mt-4">
          {!reportIsError ? (
            <Collapse className="" title={"عرض"}>
              {reportIsSuccess && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                    <InputField
                      title={"العدد الكلي"}
                      value={report?.data?.summary?.totalCount}
                      direction="ltr"
                      classes="text-center !p-1"
                    />
                    <InputField
                      title={"المبلغ الاجمالي"}
                      value={report?.data?.summary?.totalAmount}
                      direction="ltr"
                      classes="text-center !p-1"
                    />
                  </div>
                  <hr className="md:col-span-2 mt-4" />
                </>
              )}
              {reportIsSuccess && (
                <Collapse className="" title={"عرض تفاصيل الايام"}>
                  {report?.data?.summary?.statistics.map((item) => (
                    <>
                      <h5 className="md:col-span-2 text-center text-green-500 font-bold ">
                        {item.date}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                        {" "}
                        <InputField
                          title={"العدد"}
                          value={item.count}
                          direction="ltr"
                          classes="text-center !p-1"
                        />
                        <InputField
                          title={"المبلغ الكلي"}
                          value={item.total}
                          direction="ltr"
                          classes="text-center !p-1"
                        />
                      </div>
                      <hr className="md:col-span-2 mt-4" />
                    </>
                  ))}
                </Collapse>
              )}
            </Collapse>
          ) : (
            <h1 className="text-center">لا يوجد بيانات</h1>
          )}
        </div>
      </ContainerInputs>

      <ContainerInputs
        className="bg-white dark:bg-gray-900  m-auto min-w-2/3 w-full "
        title={"نتائج البحث"}
      >
        <div className="w-full md:col-span-2 h-full">
          <div className="relative  mx-auto overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto_ h-full max-h-96_">
            <table className="w-full text-sm text-gray-500 dark:text-gray-400 mx-auto !text-center relative">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                <tr>
                  {/* <th scope="col" className="px-6 py-3 text-nowrap">
                      #
                    </th> */}
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    الاسم
                  </th>
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    رقم الوطني
                  </th>
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    رقم التأمين
                  </th>
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    الرقم الهندسي
                  </th>
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    المبلغ
                  </th>
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    التاريخ
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {reportIsSuccess &&
                  report?.data?.detailedData.map((rep) => {
                    return rep.details.map((item, index) => (
                      <tr
                        className={`
                        odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 
                        hover:dark:bg-gray-700 hover:bg-gray-200
                        `}
                        key={index}
                      >
                        {/* <td className="px-4 py-2 text-nowrap">{index + 1} </td> */}
                        <td className="px-4 py-2 text-nowrap">
                          {item.fullName}
                        </td>
                        <td className="px-4 py-2 text-nowrap">
                          {item.nationalNumber || "-"}
                        </td>
                        <td className="px-4 py-2 text-nowrap">
                          {item.insuranceNumber == 0
                            ? "جديد"
                            : item.insuranceNumber}
                        </td>
                        <td className="px-4 py-2 text-nowrap">
                          {item.engineeringNumber || "- - - "}
                        </td>
                        <td className="px-4 py-2 text-nowrap">
                          {item.amount || "- - - "}
                        </td>
                        <td className="px-4 py-2 text-nowrap">
                          {item.registrationDate || "- - - "}
                        </td>
                      </tr>
                    ));
                  })}
              </tbody>
            </table>

            {reportIsLoading ? (
              <div className="my-4">
                <Spinner />
              </div>
            ) : reportIsError ? (
              <div className="w-full text-center p-5 font-semibold dark:text-white">
                <h1>لا يوجد بيانات</h1>
              </div>
            ) : (
              false
            )}
          </div>
        </div>
      </ContainerInputs>
    </div>
  );
}
