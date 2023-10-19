import React from "react";
import { BsChevronUp } from "react-icons/bs";

const EditorFooter = ({}) => {
  return (
    <div className="flex bg-dark-100 absolute bottom-0 z-10 ">
      <div className="mx-5 my-[10px] flex justify-between w-full">
        <div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
          <button className="px-3 py-1.5 font-medium items-center transition-all inline-flex bg-dark-fill-300 text-sm hover:bg-dark-fill-200 text-dark-label-2 rounded-lg pl-3 pr-2">
            Console
            <div className="ml-1 transform transition flex items-center">
              <BsChevronUp className="fill-gray-600 mx-1 bg-gray-600" />
            </div>
          </button>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <button className="px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-dark-fill-3  hover:bg-dark-fill-2 text-dark-label-2 rounded-lg">
            Run
          </button>
          <button className="px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-green-500  hover:bg-green-700 rounded-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditorFooter;
