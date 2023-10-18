import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const submissions = outputDetails?.submissions || [];

  return (
    <>
      <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        Output
      </h1>
      <div className="w-full h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
        {submissions.map((submission, index) => (
          <div key={index}>
            <p className="text-sm">
              Expected Output:{" "}
              <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                {atob(submission?.expected_output)}
              </span>
            </p>
            <p className="text-sm">
              Status:{" "}
              <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                {submission?.status?.description}
              </span>
            </p>
            <p className="text-sm">
              Memory:{" "}
              <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                {submission?.memory}
              </span>
            </p>
            <p className="text-sm">
              Time:{" "}
              <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                {submission?.time}
              </span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default OutputWindow;
