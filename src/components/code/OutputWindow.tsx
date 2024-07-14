import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = (details) => {
    let statusId = details?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(details?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {details.stdout !== null ? `${atob(details.stdout)}` : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else if (statusId === 4) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-yellow-500">
          {details.stdout !== null ? `${atob(details.stdout)}` : null}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(details?.stderr)}
        </pre>
      );
    }
  };

  return (
    <div className="mt-4">
      <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        Output
      </h1>
      <div className="w-full h-32 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
        {outputDetails
          ? Object.entries(outputDetails).map(([token, details]) => (
              <div key={token} className="output-item">
                {getOutput(details)}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default OutputWindow;
