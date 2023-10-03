import React from "react";

const colorClasses = {
  red: {
    text: "text-red-800",
    border: "border-red-300",
    bg: "bg-red-50",
    darkText: "dark:text-red-400",
    darkBorder: "dark:border-red-800",
  },
  green: {
    text: "text-green-800",
    border: "border-green-300",
    bg: "bg-green-50",
    darkText: "dark:text-green-400",
    darkBorder: "dark:border-green-800",
  },
  blue: {
    text: "text-blue-800",
    border: "border-blue-300",
    bg: "bg-blue-50",
    darkText: "dark:text-blue-400",
    darkBorder: "dark:border-blue-800",
  },
  // Tambahkan variasi warna lainnya jika diperlukan
};

interface Props {
  message: string;
  color: string; // Tipe data string untuk prop message
}

const Alertsccs: React.FC<Props> = ({ message, color }) => {
  const currentColor =
    colorClasses[color as keyof typeof colorClasses] || colorClasses.red;
  const alertClasses = `fixed flex items-center p-4 mb-4 text-sm rounded z-[999] ${currentColor.text} ${currentColor.border} ${currentColor.bg} dark:bg-gray-800 ${currentColor.darkText} ${currentColor.darkBorder}`;
  return (
    <div className={alertClasses} role="alert">
      <svg
        className="flex-shrink-0 inline w-4 h-4 mr-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">{message} </span>
      </div>
    </div>
  );
};

export default Alertsccs;
