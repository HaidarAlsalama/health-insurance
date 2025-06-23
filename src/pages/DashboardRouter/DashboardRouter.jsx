import React, { Suspense, lazy, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutPage, Spinner } from "../../components";
import { useSelector } from "react-redux";

// const Settings = lazy(() => import("./Settings/Settings"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const Error404 = lazy(() => import("../errors/Error404/Error404"));
const AddUser = lazy(() => import("./AddUser/AddUser"));
// const AddUser = lazy(() => import("./AddUser/AddUserV2.1"));

const AddNew = lazy(() => import("./AddNew/AddNew"));
const Subscribers = lazy(() => import("./AddNew/Subscribers/Subscribers"));

const WorkPlaces = lazy(() => import("./WorkPlaces/WorkPlaces"));
const EngineeringeDepars = lazy(() =>
  import("./EngineeringeDepars/EngineeringeDepars")
);
const AddMember = lazy(() => import("./AddMember/AddMember"));

const Specializatio = lazy(() => import("./Specializatio/Specializatio"));
const UnitWorkPlace = lazy(() => import("./UnitWorkPlace/UnitWorkPlace"));
const AllUnits = lazy(() => import("./AllUnits/AllUnits"));
const AllWorks = lazy(() => import("./AllWorks/AllWorks"));
const AllDeparts = lazy(() => import("./AllDeparts/AllDeparts"));
const AllSpecialization = lazy(() =>
  import("./AllSpecialization/AllSpecialization")
);
const AllHospital = lazy(() => import("./AllHospital/AllHospital"));
const AllEng = lazy(() => import("./AllEng/AllEngV2"));
const InsuranceCard = lazy(() => import("./InsuranceCard/InsuranceCard"));
const AgePage = lazy(() => import("./AgePage/AgePage"));
const StaticVarPage = lazy(() => import("./Static/Static"));

const Reports = lazy(() => import("./Reports/Reports"));
const ReportsAllSubscribers = lazy(() =>
  import("./Reports/DailyReport/DailyReport")
);
const AllNewInsured = lazy(() =>
  import("./Reports/AllNewInsured/AllNewInsured")
);

/** @todo convert lazyLoading to external function to use */

export default function DashboardRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    const getYear = localStorage.getItem("currentYear");
    if (!getYear) navigate("/dashboard/static");
  }, []);

  useEffect(() => {
    console.log(role);
    if (role == "Admin" && role == "SuperAdmin" && role == "User") {
      navigate("/unauthorized");
    }
  }, [location]);

  if (role !== "Admin" && role !== "SuperAdmin" && role !== "User") {
    return null;
  }

  return (
    <LayoutPage>
      <Suspense fallback={<Spinner page />}>
        {(() => {
          switch (location.pathname) {
            case "/dashboard":
              return <Dashboard />;
            case "/dashboard/adduser":
              return <AddUser />;
            /** */
            case "/dashboard/subscribers":
              return <Subscribers />;
            case "/dashboard/subscribers/add":
              return <AddNew />;
            /** */
            case "/dashboard/addmember": //--
              return <AddMember />;
            case "/dashboard/alleng" /**@todo rename this url */:
              return <AllEng />;
            case "/dashboard/insurance-card" /**@todo rename this url */:
              return <InsuranceCard />;

            case "/dashboard/static": //--
              return <StaticVarPage />;

            /** */
            case "/dashboard/allunits":
              return <AllUnits />;
            case "/dashboard/allunits/add":
              return <UnitWorkPlace />;
            /** */

            /** */
            case "/dashboard/specializatio":
              return <AllSpecialization />;
            case "/dashboard/specializatio/add":
              return <Specializatio />;
            /** */

            /** */
            case "/dashboard/workplaces":
              return <AllWorks />;
            case "/dashboard/workplaces/add":
              return <WorkPlaces />;
            /** */

            /** */
            case "/dashboard/engdepars":
              return <AllDeparts />;
            case "/dashboard/engdepars/add":
              return <EngineeringeDepars />;
            /** */

            /** */
            case "/dashboard/reports":
              return <Reports />;
            case "/dashboard/reports/all-subscribers":
              return <ReportsAllSubscribers />;
            case "/dashboard/reports/all-new-subscribers":
              return <AllNewInsured />;
            /** */

            case "/dashboard/hospitals":
              return <AllHospital />;

            case "/dashboard/agepage" /**@todo rename this url */:
              return <AgePage />;

            default:
              return <Error404 navigateTo={"/dashboard"} timer={10000} />;
          }
        })()}
      </Suspense>
    </LayoutPage>
  );
}
