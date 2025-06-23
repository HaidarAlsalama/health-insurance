import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "./../../../Assets/Images/photo_2024-05-15_11-32-10.jpg";
import "./Navbar.scss";

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  }, [location]);

  return (
    <div className="md:px-2 text-sm">
      <nav className="container max-w-6xl mx-auto md:rounded-b-md shadow-lg dark:shadow-none bg-white border-gray-200 dark:bg-gray-800">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto py-2 px-4 ">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <h1 className="text-xl_ font-extrabold mb-1 w-full flex mr-4 ltr:ml-4 items-center gap-3 text-red-600 dark:text-blue-600">
              <img src={logo} className="w-14" />
              <div className=" text-gray-700 w-full text-nowrap font-bold dark:text-white">
                <h5>التأمين الصحي | نقابة المهندسين السوريين</h5>
                <h5>فرع حمص</h5>
              </div>
            </h1>
          </Link>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              // ariaHidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col gap-4 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800  dark:border-gray-700">
              {auth.role == "guest" ? (
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    تسجيل الدخول
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="/logout"
                    className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    تسجيل الخروج
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
