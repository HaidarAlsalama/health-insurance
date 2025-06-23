import { useLogin } from "API/auth";
import { Spinner } from "components";
import { createAlert } from "components/Alert/Alert";
import InputField from "components/InputField/InputField";
import { useEffect, useState } from "react";
import fingerprint from "./../../Assets/Images/fingerprent.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { mutate: login, data, isPending, isSuccess, isError } = useLogin();
  const [onSendRequest, setOnSendRequest] = useState(false);
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (role !== "guest") {
      navigate("/dashboard");
    }
  }, [role, navigate]); // يتم التنقل إذا تغيّر الـ role أو navigate

  useEffect(() => {
    if (isError) setOnSendRequest(false);
  }, [isError]);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (onSendRequest) return;
    setOnSendRequest(true);

    if (userName === "" || password === "") {
      createAlert("Warning", "Please fill in all fields.");
      setOnSendRequest(false);
      return;
    }

    if (password.length < 8) {
      createAlert("Warning", "Password must be at least 8 characters long.");
      setOnSendRequest(false);
      return;
    }

    login({ userName, password });
  };

  return (
    <div
      className="flex justify-center items-center w-full md:p-2 mt-5"
      id="login-page"
    >
      <section
        className="w-full max-w-6xl p-6 mx-auto bg-white md:rounded-md shadow-md_ dark:bg-gray-800 my-auto md:my-6  overflow-auto
      "
      >
        <h2 className="text-lg font-semibold text-center text-gray-700 dark:text-white">
          تسجيل الدخول
        </h2>
        <div className="md:grid grid-cols-2 gap-4 mt-4 pt-4">
          <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
            <InputField
              title={"اسم المستخدم"}
              id="UserName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.value)}
              direction="ltr"
            />

            <InputField
              title={"كلمة المرور"}
              id="password"
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.value)}
              direction="ltr"
            />

            <div className="flex justify-center mt-5">
              {!isPending ? (
                <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                  دخول
                </button>
              ) : (
                <Spinner />
              )}
            </div>
          </form>
          <div className="hidden md:block">
            <img src={fingerprint} alt="" className="m-auto max-w-72" />
          </div>
        </div>
      </section>
    </div>
  );
}
