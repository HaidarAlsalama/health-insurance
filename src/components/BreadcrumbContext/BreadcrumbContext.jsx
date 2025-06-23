import ActionModal from "components/ActionModal/ActionModal";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowDropLeftFill, RiArrowDropRightFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import sitemap from "./../../config/siteMap.json";
import { Spinner } from "components";
import ContainerInputs from "components/ContainerInputs/ContainerInputs";
import InputField from "components/InputField/InputField";
import { useSearchPerson } from "API/eng";

export default function BreadcrumbContext() {
  const { t } = useTranslation();
  const location = useLocation();
  const [locationLine, setLocationLine] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLocationLine(findMatchingObjects(location.pathname));
  }, [location]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "f") {
        event.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="md:mb-2 flex justify-between items-center gap-2 no-print">
      <div className="flex gap-1  flex-wrap">
        {locationLine.length > 0
          ? locationLine.map((item, index) => (
              <div className="flex items-center" key={index}>
                <span className="text-xl font-bold text-gray-600 dark:text-gray-400">
                  {document.documentElement.lang == "ar" ? (
                    <RiArrowDropLeftFill />
                  ) : (
                    <RiArrowDropRightFill />
                  )}
                </span>

                <Link
                  to={item.url}
                  className="text-xs font-bold text-nowrap text-gray-600 hover:text-red-600 dark:text-gray-400 hover:dark:text-blue-600 duration-700 "
                >
                  {item.title}
                </Link>
              </div>
            ))
          : null}
      </div>
      <button
        className="btn btn-info !px-2 !py-1 text-sm"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        البحث{" "}
      </button>
      <DeepSearchModal open={isOpen} close={setIsOpen} />
    </div>
  );
}

function removeParts(textUrl) {
  const resultArray = [];
  resultArray.push(textUrl);
  let remainingText = textUrl;
  while (remainingText.includes("/")) {
    const index = remainingText.lastIndexOf("/");
    remainingText = remainingText.substring(0, index);
    resultArray.push(remainingText);
  }
  return resultArray.reverse();
}

function findMatchingObjects(mainLocation) {
  let afterRemoveParts = removeParts(mainLocation);
  const resultArray = [];
  for (let part of afterRemoveParts) {
    sitemap.forEach((obj) => {
      if (obj.url === part) {
        resultArray.push(obj);
      }
    });
  }
  return resultArray;
}

const DeepSearchModal = ({ open, close }) => {
  const [keyWord, setKeyWord] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // State for debounced search term

  const [searchMethod, setSearchMethod] = useState("engineer");
  const [source, setSource] = useState("main");

  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);

  const navigate = useNavigate();

  // Function to update the state when the radio button selection changes
  const handleOptionChange = (event) => {
    setSearchMethod(event.target.value);
  };

  const {
    data: allResult,
    isLoading: isLoadingResult,
    isSuccess: isSuccessResult,
    isError: isErrorResult,
  } = useSearchPerson(
    limit,
    pageNumber,
    debouncedSearchTerm,
    searchMethod,
    source
  );

  // Function to update the search term when typing
  const handleSearchChange = (event) => {
    const value = event.value;
    setKeyWord(value);
    debouncedSearchTermCallback(value); // Call the debounced function on search term update
  };

  // Create a debounced function to update the debounced search term
  const debouncedSearchTermCallback = useCallback(
    debounce((value) => {
      setDebouncedSearchTerm(value);
      setPageNumber(1);
    }, 600), // 600ms debounce delay
    []
  );

  return (
    <ActionModal
      title={"البحث العميق"}
      open={open}
      close={close}
      className={"!max-w-7xl !p-0_"}
    >
      <div className="mb-8 md:flex md:flex-row-reverse gap-4">
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
                      معلومات المهندس
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
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
                        hover:dark:bg-gray-700 hover:bg-gray-200
                        `}
                        key={index}
                      >
                        {/* <td className="px-4 py-2 text-nowrap">{index + 1} </td> */}
                        <td className="px-4 py-2 text-nowrap">
                          {(item.firstName || "") +
                            " " +
                            (item.fatherName || "") +
                            " " +
                            (item.lastName || "")}
                        </td>
                        <td className="px-4 py-2 text-nowrap">
                          {item.nationalId || "-"}
                        </td>
                        <td className="px-4 py-2 text-nowrap">
                          {item.ensuranceNumber || "-"}
                        </td>
                        <td className="px-4 py-2 text-nowrap">
                          {item.engNumber || "قريب مهندس/ة "}
                        </td>
                        <td className="px-4 py-2 text-wrap">
                          {item.perEngDTO ? (
                            <div className="grid">
                              <span>
                                الاسم:
                                {(item.perEngDTO.firstName || "") +
                                  " " +
                                  (item.perEngDTO.lastName || "")}
                              </span>
                              <span>
                                {" رقمه الهندسي: "}
                                <span className="text-green-600 font-bold">
                                  {item.perEngDTO.engNumber || ""}
                                </span>
                              </span>
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="p-1.5 flex flex-col_ items-center gap-1 text-nowrap">
                          <button
                            className="btn btn-primary text-xs !p-1"
                            onClick={() => {
                              navigate(
                                `/dashboard/insurance-card?eng=${
                                  item?.engNumber || item?.perEngDTO?.engNumber
                                }`
                              );
                              close(false);
                            }}
                          >
                            البطاقة
                          </button>
                          <button
                            className="btn btn-info text-xs !p-1"
                            onClick={() => {
                              navigate(
                                `/dashboard/subscribers?eng=${
                                  item?.engNumber || item?.perEngDTO?.engNumber
                                }`
                              );
                              close(false);
                            }}
                          >
                            الاشتراك
                          </button>
                          <button
                            className="btn btn-warning text-xs !p-1"
                            onClick={() => {
                              navigate(
                                `/dashboard/subscribers/add?eng=${
                                  item?.engNumber || item?.perEngDTO?.engNumber
                                }`
                              );
                              close(false);
                            }}
                          >
                            تجديد
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
                    disabled={pageNumber == 1 || !!!keyWord || isLoadingResult}
                    className="btn btn-info text-sm !p-1 w-20 "
                  >
                    السابق
                  </button>
                  <button
                    onClick={() => setPageNumber((prev) => prev + 1)}
                    disabled={
                      pageNumber == allResult?.data.totalPages ||
                      allResult?.data.totalPages == 0 ||
                      !!!keyWord ||
                      isLoadingResult
                    }
                    className="btn btn-primary text-sm !p-1 w-20 "
                  >
                    التالي
                  </button>
                </div>
              </div>
            </div>

            {/* {!isLoadingResult && ( */}

            {/* )} */}
          </div>
        </ContainerInputs>

        <ContainerInputs
          className="bg-white dark:bg-gray-900 md:max-w-80 min-w-72 m-auto p-6 px-2 md:w-1/3"
          title={"البحث و الفلترة"}
        >
          <InputField
            pull
            title={"البحث"}
            value={keyWord}
            onChange={handleSearchChange}
            classes="text-center"
            direction="ltr"
          />
          <InputField
            pull
            title={"مكان البحث"}
            type={"select"}
            value={[
              { id: "main", title: "ذاتية البرنامج" },
              { id: "enginformation", title: "ذاتية النقابة" },
            ]}
            onChange={setSource}
            classes=""
          />
          <div className="md:col-span-2 mt-2_">
            <h3 className="text-sm mb-2 font-medium text-gray-700 dark:text-gray-200">
              البحث باستخدام
            </h3>

            {source == "main" ? (
              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex flex-col md:flex-row_ dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 md:border-r_ _md:border-b-0 dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-engineer"
                      type="radio"
                      value="engineer"
                      name="list-radio"
                      checked={searchMethod === "engineer"}
                      onChange={handleOptionChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-engineer"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      الرقم الهندسي
                    </label>
                  </div>
                </li>

                <li className="w-full border-b border-gray-200 md:border-b-0_ _md:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-fullname"
                      type="radio"
                      value="fullname"
                      name="list-radio"
                      checked={searchMethod === "fullname"}
                      onChange={handleOptionChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-fullname"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      الاسم
                    </label>
                  </div>
                </li>

                <li className="w-full border-b border-gray-200 md:border-b-0_ _md:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-subnumber"
                      type="radio"
                      value="subnumber"
                      name="list-radio"
                      checked={searchMethod === "subnumber"}
                      onChange={handleOptionChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-subnumber"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      الرقم المركزي
                    </label>
                  </div>
                </li>

                <li className="w-full border-b border-gray-200 md:border-b-0_ _md:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-national"
                      type="radio"
                      value="national"
                      name="list-radio"
                      checked={searchMethod === "national"}
                      onChange={handleOptionChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-national"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      الرقم الوطني
                    </label>
                  </div>
                </li>

                <li className="w-full border-b border-gray-200 md:border-b-0_ _md:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-insurance"
                      type="radio"
                      value="insurance"
                      name="list-radio"
                      checked={searchMethod === "insurance"}
                      onChange={handleOptionChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-insurance"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      الرقم التأميني
                    </label>
                  </div>
                </li>

                <li className="w-full border-gray-200 dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-address"
                      type="radio"
                      value="address"
                      name="list-radio"
                      checked={searchMethod === "address"}
                      onChange={handleOptionChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-address"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      مكان الاقامة
                    </label>
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex flex-col md:flex-row_ dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 md:border-r_ _md:border-b-0 dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-license"
                      type="radio"
                      value="engineer"
                      name="list-radio"
                      checked={searchMethod === "engineer"}
                      onChange={handleOptionChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-license"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      الرقم الهندسي
                    </label>
                  </div>
                </li>

                <li className="w-full border-b border-gray-200 md:border-b-0_ _md:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-fullname"
                      type="radio"
                      value="fullname"
                      name="list-radio"
                      checked={searchMethod === "fullname"}
                      onChange={handleOptionChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-fullname"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      الاسم
                    </label>
                  </div>
                </li>

                <li className="w-full border-gray-200 dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-address"
                      type="radio"
                      value="address"
                      name="list-radio"
                      checked={searchMethod === "address"}
                      onChange={handleOptionChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-address"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      مكان الاقامة
                    </label>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </ContainerInputs>
      </div>
    </ActionModal>
  );
};
