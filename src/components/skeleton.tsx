import React from "react";

function Load() {
  return (
    <div className="flex justify-center star-bg min-h-screen p-8 animate-pulse">
      <div className="space-y-4 mx-auto px-4 sm:w-full md:w-4/5 lg:w-[846px]">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-gray-700 w-[118px] h-[118px] rounded mb-4"></div>
          <div className="mt-6 w-[261px] h-[55px] bg-gray-700"></div>
          <div className="mt-6 w-[141px] h-[55px] bg-gray-700"></div>
          <div className="flex space-x-4 h-[28px] w-[28px]"></div>
        </div>
        <div
          className="w-full h-[50px] rounded
            bg-gray-700"
        ></div>
        <div
          className="w-full h-[80px] rounded
            bg-gray-700"
        ></div>
        <div
          className="w-full h-[80px] rounded
            bg-gray-700"
        ></div>
        <div
          className="w-full h-[80px] rounded
            bg-gray-700"
        ></div>
      </div>
      <div className="overlap z-[-100]">
        <img
          className="star1"
          alt="star1"
          src="https://cdn.animaapp.com/projects/651ac368b8a887555f52c216/releases/651ac3a60e441fe4c98b0a49/img/star-1.svg"
        />
        <img
          className="star2"
          alt="Star"
          src="https://cdn.animaapp.com/projects/651ac368b8a887555f52c216/releases/651ac3a60e441fe4c98b0a49/img/star-2.png"
        />
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
