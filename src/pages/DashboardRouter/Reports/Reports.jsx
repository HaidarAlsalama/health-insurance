import NavigationCard from "components/NavigationCard/NavigationCard";
import config from "Constants/environment";
import React from "react";
import { FcRules } from "react-icons/fc";

export default function Reports() {
  const cards = [
    {
      title: "جميع المشتركين",
      description: "كافة المسجلين  ",
      url: `/dashboard/reports/all-subscribers`,
      icon: FcRules,
      role: ["any"],
    },
    {
      title: "المشتركين الجدد",
      description: "",
      url: `/dashboard/reports/all-new-subscribers`,
      icon: FcRules,
      role: ["any"],
    },
  ];

  return (
    <>
      <div className="flex gap-6 w-full flex-wrap justify-center md:justify-start h-fit">
        {cards.map((card, index) => (
          <NavigationCard data={card} key={index} />
        ))}
      </div>
    </>
  );
}
