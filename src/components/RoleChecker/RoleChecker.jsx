import React from "react";
import { useSelector } from "react-redux";

export default function RoleChecker({ children, provider }) {
  const { role } = useSelector((state) => state.auth);

  if (!provider.includes(role)) return null;

  return <>{children}</>;
}
