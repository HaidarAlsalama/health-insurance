import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const InputFieldZod = ({
  label,
  name,
  type,
  register,
  errors,
  autoComplete = "off",
  value = null,
  required = false,
  className = "",
  options = [],
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(value || false);

  if (type === "select") {
    return (
      <div className={`${className} h-20`}>
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
        {required && (
          <span className="text-red-600 font-bold dark:text-green-600">*</span>
        )}
        <select
          {...register(name)}
          id={name}
          autoComplete="off"
          defaultValue=""
          className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300
             rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500
              dark:focus:border-blue-500 focus:outline-none focus:ring
              disabled:bg-gray-200
              ${errors[name] && "ring !ring-red-400"}
              `}
        >
          <option value="" disabled>
            {label}
          </option>

          {options.length > 0 && typeof options[0] === "object"
            ? options.map((selector, index) => {
                return (
                  <option
                    key={selector.id}
                    value={selector.id}
                    className="text-black"
                    // selected={selector.title == value  selector.name == value}
                  >
                    {selector.title || selector.name}
                  </option>
                );
              })
            : options.map((selector, index) => {
                return (
                  <option key={index} className="text-black">
                    {selector}
                  </option>
                );
              })}
        </select>
        {errors[name] && (
          <p className="text-red-500 dark:text-red-600 mt-0.5">
            {errors[name].message}
          </p>
        )}
      </div>
    );
  }
  if (type === "checkbox") {
    return (
      <div className={`${className} flex items-center gap-4 `}>
        <input
          type="checkbox"
          id={name}
          checked={isChecked}
          onClick={() => setIsChecked((prev) => !prev)}
          name={name}
          {...register(name, { required })}
          className="w-6 h-6  text-blue-600 bg-gray-100 cursor-pointer border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={name}
          className="text-sm font-bold text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
        {required && (
          <span className="text-red-600 font-bold dark:text-green-600">*</span>
        )}
        {errors[name] && (
          <p className="text-red-500 dark:text-red-600 mt-0.5">
            {errors[name].message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`${className} h-20 relative`}>
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>
      {required ? (
        <span className="text-red-600 font-bold dark:text-green-600">*</span>
      ) : (
        ""
      )}
      <input
        {...register(name)}
        type={type == "password" ? (!showPassword ? "password" : "text") : type}
        id={name}
        autoComplete={autoComplete}
        className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300
           rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500
            dark:focus:border-blue-500 focus:outline-none focus:ring
            disabled:bg-gray-200 ${
              errors[name] && "ring !ring-red-400 focus:!border-red-500"
            }
`}
      />
      {type == "password" ? (
        <span
          title="عرض/اخفاء كلمة المرور"
          onClick={() => setShowPassword((prev) => !prev)}
          className="hover:bg-slate-300 dark:hover:bg-slate-700 p-2 rounded-md absolute cursor-pointer bottom-[10px] right-[5px]"
        >
          {!showPassword ? (
            <FaEye className="dark:text-white" />
          ) : (
            <FaEyeSlash className="dark:text-white" />
          )}
        </span>
      ) : null}
      {errors[name] && (
        <p className="text-red-500 dark:text-red-600 mt-0.5">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};
