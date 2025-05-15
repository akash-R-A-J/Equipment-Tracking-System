// TimelineItem.jsx
export function TimelineItem({ title, user, date, transaction }) {
  return (
    <div className="relative flex">
      {/* Left Side - Dot and SVG Connector */}
      <div className="flex flex-col justify-center items-center w-10">
        {/* Vertical Line */}
        {/* <div className="w-px flex-1 bg-gray-400 dark:bg-gray-600"></div> */}

        {/* Dot */}
        <div className="relative z-10 w-4 h-4 rounded-full bg-yellow-400 border-2 border-gray-800 dark:border-gray-300" />

        {/* Vertical Line */}
        {/* <div className="w-px flex-1 bg-gray-400 dark:bg-gray-600"></div> */}
      </div>

      {/* Connector SVG */}
      <svg
        className="absolute left-10 top-1/2 transform -translate-y-1/2"
        width="40"
        height="60"
        viewBox="0 0 40 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-0 30 C83 0, 0 0, 40 10
           M0 30 C83 60, 0 60, 40 50"
          stroke="currentColor"
          className="text-gray-400 dark:text-gray-600"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Card */}
      <div className="ml-14 bg-gray-800 text-white dark:bg-gray-700 dark:text-white p-4 rounded-lg shadow-md w-full">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm">
          <span className="font-bold">{user}</span> on {date}
        </p>
        {transaction && (
          <p className="text-xs text-gray-300 dark:text-gray-400 mt-1">
            Transaction: {transaction}
          </p>
        )}
      </div>
    </div>
  );
}
