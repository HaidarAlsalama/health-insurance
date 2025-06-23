import { useEngCard } from "API/eng";
import EditEngWorkAndSpecModal from "components/AppModals/EditEngWorkAndSpecModal/EditEngWorkAndSpecModal";
import EditPersonModal from "components/AppModals/EditPersonModal/EditPersonModal";
import { _md_size } from "config/layoutSizes";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { openHalf } from "store/reducers/layoutReducer";
const InsuranceCard = () => {
  const { role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [engNum, setEngNum] = useState(0);

  const [editPersonId, setEditPersonId] = useState({ id: 0, rand: 0 });
  const [editWAS, setEditWAS] = useState({ id: 0, rand: 0 });

  const [keyWord, setKeyWord] = useState("");

  const {
    data: allResult,
    isLoading: isLoadingResult,
    isSuccess: isSuccessResult,
    isError: isErrorResult,
  } = useEngCard(engNum);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eng = queryParams.get("eng");

  useEffect(() => {
    if (eng) {
      setEngNum(eng);
      setKeyWord(eng);
    }
  }, [eng]);

  useEffect(() => {
    console.log(allResult);
  }, [allResult]);

  useEffect(() => {
    if (window.innerWidth > _md_size) dispatch(openHalf());
  }, []);

  const handleSearchChange = (value) => {
    setKeyWord(value);
    debouncedSearchTermCallback(value); // Call the debounced function on search term update
  };
  // Create a debounced function to update the debounced search term
  const debouncedSearchTermCallback = useCallback(
    debounce((value) => {
      setEngNum(value);
    }, 600), // 600ms debounce delay
    []
  );

  return (
    <div
      className={`bg-white w-full p-8 rounded-lg h-full flex flex-col gap-4 printoo`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 _bg-gray-200/75 rounded-md gap-4 pt-1 pb-3 no-print">
        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            الرقم الهندسي
          </label>
          <input
            type="text"
            value={keyWord}
            defaultValue={engNum}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="text-sm border rounded-lg py-1 p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
            style={{
              direction: "ltr",
            }}
          />
        </div>

        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            الاسم{" "}
          </label>
          <input
            type="text"
            value={
              (allResult?.data.person.firstName || "") +
              " " +
              (allResult?.data.person.fatherName || "") +
              " " +
              (allResult?.data.person.lastName || "")
            }
            className="border text-center rounded-lg py-1 text-sm p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md"
            disabled={true}
            title={
              (allResult?.data.person.firstName || "") +
              " " +
              (allResult?.data.person.fatherName || "") +
              " " +
              (allResult?.data.person.lastName || "")
            }
          />
        </div>

        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            الرقم المركزي
          </label>
          <input
            type="text"
            // onChange={(e) => handleSearchEng(e.target.value)}
            className="text-sm border rounded-lg py-1 p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
            disabled
            defaultValue={allResult?.data.subNumber || ""}
          />
        </div>
        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            التخصص{" "}
          </label>
          <input
            type="text"
            // onChange={(e) => handleSearchEng(e.target.value)}
            className="text-sm border rounded-lg py-1 p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
            disabled
            defaultValue={allResult?.data.specializationName || ""}
          />
        </div>
        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            مكان العمل{" "}
          </label>
          <input
            type="text"
            // onChange={(e) => handleSearchEng(e.target.value)}
            className="text-sm border rounded-lg py-1 p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
            disabled
            defaultValue={allResult?.data.workPlaceName || ""}
          />
        </div>
        <div className="flex flex-col p-2_">
          <label className=" md:text-sm font-medium text-gray-800">
            رقم الوحدة{" "}
          </label>
          <input
            type="text"
            // onChange={(e) => handleSearchEng(e.target.value)}
            className="text-sm border rounded-lg py-1 p-2 mt-1 ml-10 w-full  md:ml-1 shadow-md outline-none focus:ring-1 text-center"
            disabled
            defaultValue={allResult?.data.engineeringUnitNumber || ""}
          />
        </div>
      </div>

      <div className="overflow-auto rounded-lg h-72_">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400 mx-auto !text-center shadow-md">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-2 py-2 text-nowrap border-on-print no-print"
              >
                #
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الاسم
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                اسم الاب
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الكنية
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                اسم الام
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-nowrap border-on-print no-print"
              >
                الجنس
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الصلة
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الحالة الاجتماعية
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الرقم التأميني
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                الرقم الوطني
              </th>
              <th scope="col" className="px-2 py-2 text-nowrap border-on-print">
                تاريخ الميلاد
              </th>
              {role == "Admin" && (
                <th
                  scope="col"
                  className="px-2 py-2 text-nowrap border-on-print"
                >
                  ادوات
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isSuccessResult && allResult?.data.person && (
              <tr
                className={`odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-slate-200
                    `}
                key={0}
                // onDoubleClick={() => {
                //   setEditPersonId({
                //     id: allResult.data.person.id,
                //     rand: Math.floor(Math.random() * 101),
                //   });
                // }}
                // onClick={() => {
                //   setEditWAS({
                //     id: allResult.data.person.id,
                //     rand: Math.floor(Math.random() * 101),
                //   });
                // }}
              >
                <th
                  scope=""
                  className="px-2 py-1 border-on-print font-medium whitespace-nowrap no-print"
                >
                  {1}
                </th>
                <td className="px-2 py-1 border-on-print">
                  {allResult.data.person.firstName}
                </td>
                <td className="px-2 py-1 border-on-print">
                  {allResult.data.person.fatherName}
                </td>
                <td className="px-2 py-1 border-on-print">
                  {allResult.data.person.lastName}
                </td>
                <td className="px-2 py-1 border-on-print">
                  {allResult.data.person.motherName}
                </td>
                <td className="px-2 py-1 border-on-print no-print">
                  {allResult.data.person.genderId == 1 ? "ذكر" : "انثى"}
                </td>
                <td className="px-2 py-1 border-on-print">نفسه</td>
                <td className="px-2 py-1 border-on-print">
                  {allResult.data.person.statusId == 1
                    ? "متزوج"
                    : allResult.data.person.statusId == 2
                    ? "عازب"
                    : allResult.data.person.statusId == 3
                    ? "منفصل"
                    : "-"}
                </td>
                <td className="px-2 py-1 border-on-print">
                  {allResult.data.person.ensuranceNumber != 0
                    ? allResult.data.person.ensuranceNumber
                    : "أول مرة"}
                </td>
                <td className="px-2 py-1 border-on-print">
                  {allResult.data.person.nationalId}
                </td>
                <td className="px-2 py-1 border-on-print">
                  {getDate(allResult.data.person.birthDate)}
                  {/* {getDate(allResult.data.person.birthDate).split("-")[0]} */}
                </td>
                {role == "Admin" && (
                  <td className="p-1 text-nowrap gap-1 grid max-w-20">
                    {" "}
                    <button
                      className="btn btn-warning text-xs !p-1"
                      onClick={() => {
                        setEditWAS({
                          id: allResult.data.person.id,
                          rand: Math.floor(Math.random() * 101),
                        });
                      }}
                    >
                      <FaRegAddressCard />
                    </button>
                    <button
                      className="btn btn-success text-xs !p-1"
                      onClick={() => {
                        setEditPersonId({
                          id: allResult.data.person.id,
                          rand: Math.floor(Math.random() * 101),
                        });
                      }}
                    >
                      <GoPencil />
                    </button>
                  </td>
                )}
              </tr>
            )}
            {allResult?.data.relations.length > 0 &&
              allResult?.data.relations?.map((item, index) => {
                return (
                  <tr
                    className={`odd:bg-white text-lg_ odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-slate-200
                      `}
                    key={index}
                    onDoubleClick={() => {
                      setEditPersonId({
                        id: item.person.id,
                        rand: Math.floor(Math.random() * 101),
                      });
                    }}
                  >
                    <th
                      scope=""
                      className="px-2 py-1 border-on-print font-medium whitespace-nowrap no-print"
                    >
                      {index + 2}
                    </th>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.firstName}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.fatherName}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.lastName}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.motherName}
                    </td>
                    <td className="px-2 py-1 border-on-print no-print">
                      {item.person.genderId == 1 ? "ذكر" : "انثى"}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {item.relationTypeName || "-"}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.statusId == 1
                        ? "متزوج"
                        : item.person.statusId == 2
                        ? "عازب"
                        : item.person.statusId == 3
                        ? "منفصل"
                        : "-"}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.ensuranceNumber != 0
                        ? item.person.ensuranceNumber
                        : "أول مرة"}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {item.person.nationalId}
                    </td>
                    <td className="px-2 py-1 border-on-print">
                      {getDate(item.person.birthDate)}{" "}
                      {/* {getDate(item.person.birthDate)} */}
                    </td>
                    {role == "Admin" && (
                      <td className="p-1 text-nowrap gap-1 grid max-w-20">
                        <button
                          className="btn btn-success text-xs !p-1"
                          onClick={() => {
                            setEditPersonId({
                              id: item.person.id,
                              rand: Math.floor(Math.random() * 101),
                            });
                          }}
                        >
                          <GoPencil />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {role == "Admin" && <EditPersonModal data={editPersonId} />}
      {role == "Admin" && <EditEngWorkAndSpecModal data={editWAS} />}
    </div>
  );
};

export default InsuranceCard;

const getDate = (value) => {
  const dateTimeString = value;
  const dateOnly = dateTimeString.split("T")[0];
  return dateOnly; // Output
};
