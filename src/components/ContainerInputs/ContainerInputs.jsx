  export default function ContainerInputs({ title, children, className = '' }) {
    return (
      <div className={`grid relative grid-cols-1 gap-6 mt-8 md:grid-cols-2 border p-2 pt-5 pb-5 rounded-lg dark:border-gray-600 shadow-md ${className}`}>
        <h4 className="absolute px-2 pb-1 bg-gray-200 rounded rtl:right-5 ltr:left-5 top-[-14px] text-gray-700 font-semibold dark:bg-gray-600 dark:text-white">
          {title}
        </h4>
        {children}
      </div>
    );
  }
