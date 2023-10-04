import React from "react";

function Load() {
  return (
    <div className="flex justify-center min-h-full p-8 animate-pulse">
      <div className="space-y-4 mx-auto px-4 sm:w-full md:w-4/5 lg:w-[846px] min-h-fit">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-gray-700 w-[118px] h-[118px] rounded mb-4"></div>
          <div className="mt-6 w-[270px] h-[30px] bg-gray-700"></div>
          <div className="mt-2 w-[200px] h-[20px] bg-gray-700"></div>
          <div className="mt-6 w-[141px] h-[55px] bg-gray-700"></div>
          <div className="flex space-x-4 h-[28px] w-[28px]"></div>
        </div>
        <div
          className="w-full h-[50px] rounded
            bg-gray-700"
        ></div>
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="w-full h-[80px] rounded
            bg-gray-700"
          ></div>
        ))}
      </div>
    </div>
  );
}
function Adminload() {
  return (
    <div className="animate-pulse">
      <div className="mb-4 p-4 rounded shadow-sm space-y-2 w-full h-[128px] bg-gray-700"></div>
      <div className="mb-4 p-4 rounded shadow-sm space-y-2 w-full h-[128px] bg-gray-700"></div>
      <div className="mb-4 p-4 rounded shadow-sm space-y-2 w-full h-[128px] bg-gray-700"></div>
    </div>
  );
}

export { Load, Adminload };
