import { CgMenuLeft } from "react-icons/cg";
import { FaRegSmile } from "react-icons/fa";
import logo from "./../../../Assets/Images/photo_2024-05-15_11-32-10.jpg";
import { LuLayoutDashboard, LuLayoutList } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { PiGearBold } from "react-icons/pi";
import {
  FcApprove,
  FcBusinessContact,
  FcConferenceCall,
  FcDataSheet,
  FcFactory,
  FcParallelTasks,
  FcPuzzle,
  FcOrgUnit,
  FcServices,
  FcDepartment,
  FcSettings,
  FcImport,
  FcTodoList,
  FcDataRecovery,
  FcDownload,
  FcFeedback,
  FcHome,
  FcBullish,
  FcFilingCabinet,
  FcReading,
  FcPlus,
  FcRules,
} from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import "./Sidebar.scss";
import GroupLinks from "./sidebarCompo/SidebarGroupLinks/SidebarGroupLinks.component";
import { useSelector } from "react-redux";
import config from "Constants/environment";

const listLinks = [
  {
    title: "الصفحة الرئيسية",
    url: "/dashboard",
    icon: FcHome,
    role: ["any"],
  },
  {
    title: "الذاتية",
    url: "#",
    icon: FcDataSheet,
    type: "list",
    role: ["any"],
    content: [
      {
        title: " عرض ذاتية المهندسين",
        url: "/dashboard/alleng",
        icon: FcFilingCabinet,
        role: ["any"],
      },
      {
        title: " عرض أفراد عائلة مهندس",
        url: "/dashboard/insurance-card",
        icon: FcReading,
        role: ["any"],
      },
      {
        title: "إضافة مهندس جديد",
        url: "/dashboard/adduser",
        icon: FcBusinessman,
        role: ["any"],
      },
      {
        title: "إضافة  فرد عائلة جديد",
        url: "/dashboard/addmember",
        icon: FcConferenceCall,
        role: ["any"],
      },
    ],
  },
  {
    title: "الاشتراكات",
    url: "#",
    icon: FcBusinessContact,
    type: "list",
    role: ["any"],
    content: [
      {
        title: "عرض الاشتراك",
        url: "/dashboard/subscribers",
        icon: FcBusinessContact,
        role: ["any"],
      },
      {
        title: "اشتراك - تجديد",
        url: "/dashboard/subscribers/add",
        icon: FcBusinessContact,
        role: ["any"],
      },
    ],
  },
  {
    title: "الوحدات الهندسية",
    url: "#",
    icon: FcParallelTasks,
    type: "list",
    role: ["any"],

    content: [
      {
        title: "عرض الوحدات",
        url: "/dashboard/allunits",
        icon: FcParallelTasks,
        role: ["any"],
      },
      {
        title: "اضافة وحدة هندسية",
        url: "/dashboard/allunits/add",
        icon: FcPlus,
        role: ["any"],
      },
    ],
  },
  {
    title: "الاقسام الهندسية",
    url: "#",
    icon: FcPuzzle,
    type: "list",
    role: ["any"],

    content: [
      {
        title: " عرض الاقسام",
        url: "/dashboard/engdepars",
        icon: FcPuzzle,
        role: ["any"],
      },
      {
        title: "اضافة قسم",
        url: "/dashboard/engdepars/add",
        icon: FcPlus,
        role: ["any"],
      },
    ],
  },
  {
    title: "أماكن العمل",
    url: "#",
    icon: FcFactory,
    type: "list",
    role: ["any"],

    content: [
      {
        title: "عرض أماكن العمل",
        url: "/dashboard/workplaces",
        icon: FcFactory,
        role: ["any"],
      },
      {
        title: " اضافة أماكن",
        url: "/dashboard/workplaces/add",
        icon: FcPlus,
        role: ["any"],
      },
    ],
  },
  {
    title: "الاختصاصات الهندسية",
    url: "#",
    icon: FcOrgUnit,
    type: "list",
    role: ["any"],

    content: [
      {
        title: "عرض الاختصاصات ",
        url: "/dashboard/specializatio",
        icon: FcOrgUnit,
        role: ["any"],
      },
      {
        title: "اضافة اختصاص",
        url: "/dashboard/specializatio/add",
        icon: FcPlus,
        role: ["any"],
      },
    ],
  },
  {
    title: "الإدارة",
    url: "#",
    icon: FcServices,
    type: "list",
    role: ["any"],
    content: [
      {
        title: "عرض المشافي ",
        url: "/dashboard/hospitals",
        icon: FcDepartment,
        role: ["any"],
      },
      {
        title: "إعدادات السنة ",
        url: "/dashboard/agepage",
        icon: FcSettings,
        role: ["any"],
      },
    ],
  },
  {
    title: "تحميل ملفات excel ",
    url: "#",
    icon: FcDataRecovery,
    type: "list",
    role: ["any"],

    content: [
      {
        title: " الاستردادات",
        url: "/dashboard/uploadclaims",
        icon: FcDownload,
        role: ["any"],
      },
      {
        title: " المطالبات",
        url: "/dashboard/claims",
        icon: FcFeedback,
        role: ["any"],
      },
    ],
  },
  {
    title: " التقارير",
    url: "/dashboard/#",
    icon: FcBullish,
    type: "list",
    role: ["any"],

    content: [
      {
        title: "جميع المشتركين",
        url: `/dashboard/reports/all-subscribers`,
        icon: FcRules,
        role: ["any"],
      },
      {
        title: "المشتركين الجدد",
        url: `/dashboard/reports/all-new-subscribers`,
        icon: FcRules,
        role: ["any"],
      },
    ],
  },
];

const listLinks2 = [
  {
    title: "ثوابت البرنامج",
    url: "/dashboard/static",
    icon: FcTodoList,
    role: ["any"],
  },
  { title: "تسجيل الخروج", url: "/logout", icon: FcImport, role: ["any"] },
];

export default function Sidebar({ handleStateSidebar }) {
  const sidebarState = useSelector((state) => state.layout.layoutState);

  return (
    <>
      {sidebarState == "openSmall" ? (
        <div
          className="fixed top-0 left-0 z-30 w-full h-full bg-gray-900/50 right-0"
          onClick={() => handleStateSidebar()}
        ></div>
      ) : null}
      <aside
        className={`${sidebarState} no-print fixed top-0 ltr:left-0 rtl:right-0-0 z-40 lg:w-64 md:w-16 w-0 h-full duration-150 sidebar`}
      >
        <div
          className="grid grid-cols-1 h-full md:px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 sidebar-content"
          style={{ gridTemplateRows: "min-content auto min-content" }}
        >
          <div
            className={`w-full flex md:flex-col lg:flex-row items-center justify-between overflow-hidden  sidebar-head`}
          >
            <button
              className="text-xl hover:bg-slate-600 hover:text-white rounded-md p-2 duration-200 text-gray-600 dark:text-gray-300 dark:hover:bg-blue-600"
              onClick={handleStateSidebar}
            >
              <CgMenuLeft />
            </button>
            <h1 className="text-4xl font-extrabold text-black dark:text-blue-600">
              <div className="flex flex-row-reverse gap-2 mt-1 ">
                <div className="w-full flex flex-col justify-center">
                  <h2 className="text-xs text-gray-600">
                    التأمين الصحي - عقد الاستشفاء - فرع حمص{" "}
                  </h2>
                  {/* <h3 className="text-sm text-center">فرع حمص</h3> */}
                </div>
                <div className="w-10 mr-2">
                  <img src={logo} className="w-full" />
                </div>
              </div>
            </h1>
          </div>
          <GroupLinks list={listLinks} />
          <GroupLinks list={listLinks2} />
        </div>
      </aside>
    </>
  );
}
