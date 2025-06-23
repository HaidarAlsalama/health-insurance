import { createAlert } from "components/Alert/Alert";
import NavigationCard from "components/NavigationCard/NavigationCard";
import { useEffect } from "react";
import { FaRegSmile } from "react-icons/fa";
import {
  FcApprove,
  FcBullish,
  FcBusinessContact,
  FcBusinessman,
  FcConferenceCall,
  FcDepartment,
  FcDownload,
  FcFactory,
  FcFeedback,
  FcFilingCabinet,
  FcLike,
  FcOrgUnit,
  FcParallelTasks,
  FcPlus,
  FcPuzzle,
  FcReading,
  FcSettings,
  FcTodoList,
} from "react-icons/fc";
import { LuLayoutDashboard } from "react-icons/lu";

const listLinks = [
  // { title: "البحث عن مشترك", url: "/dashboard/search", icon: LuLayoutDashboard },
  {
    title: " إضافة مهندس جديد",
    url: "/dashboard/adduser",
    icon: FcBusinessman,
    role: ["any"],
  },
  {
    title: " إضافة فرد عائلة جديد",
    url: "/dashboard/addmember",
    icon: FcConferenceCall,
    role: ["any"],
  },
  {
    title: " عرض ذاتية المهندسين",
    url: "/dashboard/alleng",
    icon: FcFilingCabinet,
    role: ["any"],
  },
  {
    title: "بطاقة مهندس",
    url: "/dashboard/insurance-card",
    icon: FcReading,
    role: ["any"],
  },
  {
    title: "الاشتراكات",
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
  // {
  //   title: "تجديد الاشتراك",
  //   url: "/dashboard/renewal",
  //   icon: LuLayoutDashboard,
  //   role: ["any"],
  // },

  // {
  //   title: "مشتركين عام 2024",

  //   url: "/dashboard/alleng",
  //   icon: LuLayoutDashboard,
  //   role: ["any"],
  // },
  // {
  //   title: "المشتركين منذ عام 2017",

  //   url: "/dashboard/alleng",
  //   icon: LuLayoutDashboard,
  // },
  // {
  //   title:"الاشتراكات السنوية",
  //   url: "/dashboard/addnew",
  //   icon: LuLayoutDashboard,
  // },

  {
    title: "الوحدات الهندسية ",
    url: "/dashboard/unitworkplace",
    // icon: FaRegSmile,
    icon: FcParallelTasks,
    role: ["any"],
  },
  {
    title: "الأقسام الهندسية ",
    url: "/dashboard/engdepars",
    // icon: FaRegSmile,
    icon: FcPuzzle,
    role: ["any"],
  },
  {
    title: "أماكن العمل",
    url: "/dashboard/workplaces",
    // icon: FaRegSmile,
    icon: FcFactory,
    role: ["any"],
  },

  {
    title: "الاختصاصات الهندسية ",
    url: "/dashboard/specializatio",
    icon: FcOrgUnit,
    role: ["any"],
  },
  {
    title: "عرض المشافي",
    url: "/dashboard/hospitals",
    icon: FcDepartment,
    role: ["any"],
  },
  {
    title: "الإجراءات المرضية",
    url: "/dashboard/allsurgicalproced",
    icon: FcLike,
    role: ["any"],
  },
  {
    title: "إعدادات السنة",
    url: "/dashboard/agepage",
    icon: FcSettings,
    role: ["any"],
  },
  //  {
  //     title: "الدراسات السنوية",
  //     url: "/dashboard/annualstudy",
  //     icon: LuLayoutDashboard,
  //   },
  {
    title: "الاستردادات",
    url: "/dashboard/uploadclaims",
    icon: FcDownload,
    role: ["any"],
  },
  {
    title: "المطالبات",
    url: "/dashboard/claims",
    icon: FcFeedback,
    role: ["any"],
  },
  {
    title: "التقارير",
    url: "/dashboard/reports",
    icon: FcBullish,
    role: ["any"],
  },
  {
    title: "ثوابت البرنامج",
    url: "/dashboard/static",
    icon: FcTodoList,
    role: ["any"],
  },

  {
    title: "اضافة وحدة هندسية",
    url: "/dashboard/allunits/add",
    icon: FcPlus,
    role: ["any"],
  },
  {
    title: "اضافة قسم هندسي",
    url: "/dashboard/engdepars/add",
    icon: FcPlus,
    role: ["any"],
  },
  {
    title: " اضافة مكان عمل",
    url: "/dashboard/workplaces/add",
    icon: FcPlus,
    role: ["any"],
  },
  {
    title: "اضافة اختصاص هندسي",
    url: "/dashboard/specializatio/add",
    icon: FcPlus,
    role: ["any"],
  },

  // {
  //   title: " ملف كاش",
  //   url: "/dashboard/uploadsubscribes",
  //   icon: LuLayoutDashboard,
  // },
  // {
  //   title: "   ملف تقسيط",
  //   description:"  خزانة التقاعد",
  //   url: "/dashboard/retexc",
  //   icon: LuLayoutDashboard,
  // },
  // {
  //   title: " ملف تقسيط   ",
  //   description:" الصندوق المشترك",
  //   url: "/dashboard/boxexc",
  //   icon: LuLayoutDashboard,
  // },
  // {
  //   title: "تحميل ملف يدوي ",
  //   url: "/dashboard/uploadmanual",
  //   icon: LuLayoutDashboard,
  // },
  // {
  //   title: "  ملف تقسيط  ",
  //   description:"الوحدات الهندسية",
  //   url: "/dashboard/uploadunits",
  //   icon: LuLayoutDashboard,
  // },
  // {
  //   title: "تحميل ملف المشافي ",
  //   url: "/dashboard/uploadhospital",
  //   icon: LuLayoutDashboard,
  // },
];

export default function Dashboard() {
  // useEffect(() => {
  //   createAlert("success", "0000");
  //   createAlert("error", "0000");
  //   createAlert("warning", "0000");
  // }, []);

  return (
    <>
      <div className="flex gap-6 w-full col-span-2 flex-wrap justify-center _md:justify-start h-fit">
        {listLinks.map((link, i) => (
          <NavigationCard key={i} data={link} />
        ))}
      </div>
    </>
  );
}
