import { useSelector } from "react-redux";
import SidebarLink from "../SidebarLink/SidebarLink.component";
import SidebarListLinks from "../SidebarListLinks/SidebarListLinks.component";

export default function GroupLinks({ list }) {
  const { role } = useSelector((state) => state.auth);

  return (
    <ul className="w-full flex flex-col gap-1 text-gray-600 dark:text-gray-300">
      {list.map((item, index) => {
        // Check if item.role is defined and includes the user's role
        if (item.role && (item.role.includes(role) || item.role.includes("any"))) {
          return item.type ? (
            <SidebarListLinks key={index} list={item} />
          ) : (
            <SidebarLink key={index} item={item} />
          );
        }
        return null; // Return null if the role check fails
      })}
    </ul>
  );
}
