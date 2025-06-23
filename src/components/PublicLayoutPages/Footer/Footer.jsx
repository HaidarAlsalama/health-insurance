export default function Footer() {
  return (
    <div className={`self-end flex justify-center w-full mt-5 ${"md:px-2"}`}>
      <footer
        className={`w-full shadow max-w-6xl p-2 py-2.5 mx-auto bg-white md:rounded-t-md dark:bg-gray-800 my-auto`}
      >
        <div
          className={`w-full mx-auto p-4 flex justify-center flex-col md:flex-row items-center md:justify-between`}
        >
          <span className="text-sm font-bold text-gray-500 sm:text-center dark:text-gray-400">
            <a href="/" className="hover:underline">
              التأمين الصحي | مهندسي حمص
            </a>
            . جميع الحقوق محفوظة. © 2025
          </span>

          <span className="text-sm font-bold text-gray-500 sm:text-center dark:text-gray-400">
            تصميم وتطوير{" "}
            <a
              href="https://hometecs.sy"
              className="text-orange-500 hover:underline"
            >
              Hometecs
            </a>
          </span>
          {/* <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul> */}
        </div>
      </footer>
    </div>
  );
}
