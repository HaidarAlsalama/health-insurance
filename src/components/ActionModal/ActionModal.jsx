import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
export default function ActionModal({
  title,
  children,
  open = false,
  close,
  className = "",
}) {
  const ref = useRef();

  const handleClik = (e) => {
    if (e.target === ref.current) {
      close(false);
    }
  };

  useEffect(() => {
    if (open) ref.current.focus();
  }, [open]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      close(false); // Close the modal or perform any other action
    }
  };

  return (
    <>
      {open && (
        <div
          id="default-modal"
          onClick={handleClik}
          onKeyDown={handleKeyDown}
          ref={ref}
          tabIndex="-1"
          className="show-info-modal p-4 fixed top-0 right-0 bottom-0 left-0 z-40 flex md:justify-center items-center bg-gray-600 bg-opacity-50"
        >
          <div className={`w-full max-w-2xl ${className}`}>
            <div
              className="bg-white rounded-lg shadow-md dark:bg-gray-900 grid grid-cols-1"
              style={{ gridTemplateRows: "min-content auto min-content" }}
            >
              <div className="flex items-center justify-between h-12 px-4 md:px-5 p-1 md:p-2 border-b rounded-t dark:border-gray-600">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <button
                  type="button"
                  className=" bg-transparent hover:bg-gray-200 dark:text-gray-50 text-gray-900 rounded-lg text-2xl w-8 h-8 ms-auto inline-flex md:justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => close(false)}
                >
                  <IoClose />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="max-h-[500px] flex flex-col gap-2 px-4 md:px-5 p-1 md:p-2 space-y-4 overflow-auto">
                {children}
              </div>
              <div className="flex items-center justify-center h-12 px-4 md:px-5 p-1 md:p-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  onClick={() => close(false)}
                  className="py-1 px-5 pb-1.5 text-sm font-bold text-white focus:outline-none bg-red-500 rounded-lg border border-gray-200 hover:bg-red-600 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:hover:bg-gray-800 dark:text-gray-50 dark:border-gray-600 dark:hover:text-white dark:bg-gray-700"
                >
                  اغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
