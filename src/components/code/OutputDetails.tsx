import React from "react";

const OutputDetails = ({ outputDetails }) => {
  const submissions = outputDetails?.submissions || [];
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3 mx-12">
      {submissions.map((submission, index) => (
        <div key={index}>
          <p className="text-sm">
            Expected Output:{" "}
            <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
              {atob(submission?.expected_output)}
            </span>
          </p>
          <p className="text-sm">
            Output:{" "}
            <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
              {submission?.stdout}
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
              {outputDetails?.time}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default OutputDetails;
