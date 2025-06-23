import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Spinner } from "./components";
import { Suspense, lazy, useEffect } from "react";
import Alert from "components/Alert/Alert";
import Login from "pages/Login/Login";
import { useSelector } from "react-redux";
import { Error401, Error404 } from "./pages/errors";
import PublicLayoutPages from "components/PublicLayoutPages/PublicLayoutPages";
import Logout from "pages/Logout/Logout";

const DashboardRouter = lazy(() =>
  import("./pages/DashboardRouter/DashboardRouter")
);

function App() {
  const { role } = useSelector((state) => state.auth);

  // window.addEventListener("beforeunload", (event) => {
  //   event.preventDefault();
  //   event.returnValue = ""; // لإظهار رسالة تحذير.
  // });

  // document.addEventListener("keydown", (event) => {
  //   if (event.key === "F5" || (event.ctrlKey && event.key === "r")) {
  //     event.preventDefault();
  //     alert("إعادة التحميل ستتسبب بتسجيل الخروج!");
  //   }
  // });
  // useEffect(() => {
  //   setInterval(() => { debugger }, 100)
  // });
  return (
    <Suspense fallback={<Spinner page />}>
      <Routes>

        {role == "Admin" || role == "SuperAdmin" || role == "User" ? (
          <> <Route path="/dashboard/*" element={<DashboardRouter />} />
            <Route path="/dashboard" element={<DashboardRouter />} /></>
        ) : null}

        <Route element={<PublicLayoutPages />} >
          <Route path="/" element={<Login />} />

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/unauthorized"
            element={<Error401 navigateTo={"/"} timer={10000} />}
          />
          <Route path="*" element={<Error404 navigateTo={"/"} timer={10000} />} />
        </Route>
      </Routes>
      <Alert />
    </Suspense>
  );
}

export default App;
