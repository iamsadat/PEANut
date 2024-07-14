import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OutputDetails = ({ outputDetails }) => {
  const getOutput = (details) => {
    let statusId = details?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 text-red-500">
          {atob(details?.compile_output)}
        </span>
      );
    } else if (statusId === 3) {
      return (
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 text-green-500">
          {details.stdout !== null ? `${atob(details.stdout)}` : null}
        </span>
      );
    } else if (statusId === 5) {
      return (
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 text-red-500">{`Time Limit Exceeded`}</span>
      );
    } else if (statusId === 4) {
      return (
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 text-yellow-500">
          {details.stdout !== null ? `${atob(details.stdout)}` : null}
        </span>
      );
    } else {
      <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 text-red-500">
        {atob(details?.stderr)}
      </span>;
    }
  };

  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3 mx-12">
      <Tabs defaultValue="0" className="w-[400px]">
        <TabsList>
          {Object.entries(outputDetails).map(([token], index) => (
            <TabsTrigger key={token} value={String(index)}>
              Testcase {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(outputDetails).map(([token, details], index) => (
          <TabsContent key={token} value={String(index)}>
            <div className="submission-result py-3">
              <h3 className="font-semibold">Submission {token}:</h3>
              <p className="text-sm">
                Output:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                  {getOutput(details)}
                </span>
              </p>
              <p className="text-sm">
                Expected Output:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                  {atob((details as any)?.expected_output)}
                </span>
              </p>
              <p className="text-sm">
                Status:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                  {(details as any)?.status?.description}
                </span>
              </p>
              <p className="text-sm">
                Memory:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                  {(details as any)?.memory}
                </span>
              </p>
              <p className="text-sm">
                Time:{" "}
                <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
                  {(details as any)?.time}
                </span>
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default OutputDetails;
