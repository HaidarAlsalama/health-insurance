import React from "react";

export default function MainContent({ children }) {
  return (
    <section
      className={`grid grid-cols-1 min-h-screen bg-slate-200 dark:bg-gray-900 `}
      style={{ gridTemplateRows: "min-content auto min-content" }}
    >
      {children}
    </section>
  );
}
