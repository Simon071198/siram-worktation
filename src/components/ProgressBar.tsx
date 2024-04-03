import React from 'react'

const ProgressBar = ({list, currentForm}: any) => {
  return (
    <div className="mb-2 flex  justify-center items-center p-8 w-full">
     {list.map((data, index) => {
        const isVisible = index <= currentForm; // Check if the current index is less than or equal to currentForm
        return (
        <div className="flex items-center justify-start w-[15%]"> {/* Example wrapper element */}
            <span  className={`text-lg font-bold border-green-600 rounded-full w-8 h-8 flex items-center justify-center ${
                    isVisible ? `bg-blue-600 text-white` : `bg-gray-200 text-gray-600`
                }`}>
                {index + 1}
            </span>
            <span
                key={index}
                className={` h-[15px] flex-1 rounded-xl w-full ${
                    isVisible ? `bg-blue-600` : `invisible`
                }`}
            ></span>
        </div>
        );
      })}
    {/* <span className="mb-2 h-[15px] flex-1 rounded-xl bg-blue-500 animate-progress"></span>
    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-blue-400 animate-progress"></span>
    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-blue-300 animate-progress"></span>
    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-blue-200 animate-progress"></span>
    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-green-200 animate-progress"></span> */}
  </div>
  )
}

export default ProgressBar