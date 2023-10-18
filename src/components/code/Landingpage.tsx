"use client";

import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./MonacoEditor";
import axios from "axios";
import { cn } from "@/lib/utils";
import { languageOptions } from "@/lib/languageOptions";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "@/hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import ProblemStatement from "./ProblemStatement";
import Split from "react-split";
import { useParams } from "next/navigation";
import EditorFooter from "./EditorFooter";

const Landing = () => {
  const [language, setLanguage] = useState(languageOptions[0]);
  const [value, setValue] = useState(language.value);
  const [id, setId] = useState(language.id);
  const [defaultCode, setDefaultCode] = useState(language.default);
  const [code, setCode] = useState(defaultCode);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState<{ value: string; label: string }>({
    value: "cobalt",
    label: "Cobalt",
  });

  const params = useParams();
  const pid = params.pid;

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const currentProblem = axios.post("/api/getProblem", { id: pid });
        const currentDefaultCode = (await currentProblem).data.defaultCode;
        setDefaultCode(currentDefaultCode);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchProblem();
  }, []);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
    setValue(sl.value);
    setDefaultCode(sl.default);
    setCode(sl.default);
    setId(sl.id);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctrlPress, enterPress]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = async () => {
    const problem = await axios.post("/api/getProblem", { id: pid });

    const testCases = problem.data.testCases;

    setProcessing(true);
    const formData = {
      submissions: testCases.map((testCase) => {
        return {
          language_id: id,
          source_code: code,
          stdin: testCase.input,
          expected_output: testCase.expectedOutput,
        };
      }),
    };
    console.log("formData: ", formData);
    console.log("Code: ", code);

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: {
        base64_encoded: "true",
      },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      checkStatus(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkStatus = async (tokens) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: {
        tokens: tokens.map((token) => token.token).join(","),
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
      },
    };

    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(tokens);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast("Something went wrong! Please try again.", 2000);
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    }
  }
  useEffect(() => {
    setTheme({ value: "oceanic-next", label: "Oceanic Next" });
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Split className="split">
        <div>
          <ProblemStatement />
        </div>
        <div className="flex flex-col w-[60%]">
          <div className="flex flex-row justify-end">
            <div className="px-4 py-2">
              <LanguagesDropdown onSelectChange={onSelectChange} />
            </div>
          </div>

          <div className="flex flex-col px-4">
            <Split
              className="h-[calc(100vh-94px)]"
              direction="vertical"
              sizes={[60, 40]}
              minSize={60}
            >
              <div className="w-full overflow-auto">
                <div className="flex flex-col w-full h-[100%] justify-start">
                  <CodeEditorWindow
                    code={code}
                    onChange={onChange}
                    language={value}
                    theme={theme}
                    defaultCode={defaultCode}
                  />
                </div>
              </div>
              <div className="right-container flex flex-row justify-center items-center h-[40%]">
                <div className="w-[55%]  px-2">
                  <OutputWindow outputDetails={outputDetails} />
                </div>
                <div className="flex flex-col items-end">
                  {/* <CustomInput
                    customInput={customInput}
                    setCustomInput={setCustomInput}
                  /> */}
                  <button
                    onClick={handleCompile}
                    disabled={!code}
                    className={cn(
                      "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                      !code ? "opacity-50" : ""
                    )}
                  >
                    {processing ? "Processing..." : "Compile and Execute"}
                  </button>
                </div>
              </div>
            </Split>
            <EditorFooter />

            {outputDetails && <OutputDetails outputDetails={outputDetails} />}
          </div>
        </div>
      </Split>
    </>
  );
};

export default Landing;

{
  // await axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log("res.data", response.data);
  //     const token = response.data.token;
  //     checkStatus(token);
  //   })
  //   .catch((err) => {
  //     let error = err.response ? err.response.data : err;
  //     // get error status
  //     let status = err.response?.status;
  //     console.log("status", status);
  //     if (status === 429) {
  //       console.log("too many requests", status);
  //       showErrorToast(
  //         `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
  //         10000
  //       );
  //     }
  //     setProcessing(false);
  //     console.log("catch block...", error);
  //   });
}
