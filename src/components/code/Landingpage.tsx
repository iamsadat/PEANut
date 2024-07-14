"use client";

import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./MonacoEditor";
import axios from "axios";
import { cn } from "@/lib/utils";
import { languageOptions } from "@/lib/languageOptions";
import "react-resizable/css/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "@/hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import { defineTheme } from "@/lib/defineTheme";

const Landing = () => {
  const [language, setLanguage] = useState(languageOptions[5]);
  const [value, setValue] = useState(language.value);
  const [id, setId] = useState(language.id);
  const [defaultCode, setDefaultCode] = useState(language.default);
  const [code, setCode] = useState(defaultCode);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState({});
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState({
    value: "cobalt",
    label: "Select Theme",
  });
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
    setProcessing(true);

    const formData = {
      submissions: [
        {
          language_id: 62,
          source_code: btoa(code), // Ensure the code is base64 encoded
          stdin: btoa("Khan"), // Encode stdin
          expected_output: btoa("My name is Khan"), // Encode expected output
        },
        {
          language_id: 62,
          source_code: btoa(code),
          stdin: btoa("Mohiuddin"),
          expected_output: btoa("My name is Mohiuddin"),
        },
        {
          language_id: 62,
          source_code: btoa(code),
          stdin: btoa("Ahmed"),
          expected_output: btoa("My name is Ahmed"),
        },
      ],
    };

    const options = {
      method: "POST",
      url: `https://${process.env.NEXT_PUBLIC_RAPID_API_HOST}/submissions/batch`,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      const newOutputDetails = {};

      response.data.forEach((submission) => {
        checkStatus(submission.token, newOutputDetails);
      });
    } catch (error) {
      console.error(
        "Submission error: ",
        error.response ? error.response.data : error.message
      );
      setProcessing(false);
      showErrorToast(
        "Submission failed! Please check your input and try again.",
        2000
      );
    }
  };

  const checkStatus = async (token, newOutputDetails) => {
    const options = {
      method: "GET",
      url: `https://${process.env.NEXT_PUBLIC_RAPID_API_HOST}/submissions/${token}`,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
    };

    try {
      const response = await axios.request(options);
      const statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token, newOutputDetails);
        }, 2000);
      } else {
        newOutputDetails[token] = response.data;
        setOutputDetails({ ...newOutputDetails });
        setProcessing(false);
        showSuccessToast(`Compiled Successfully!`);
      }
    } catch (err) {
      console.error(
        "Status check error: ",
        err.response ? err.response.data : err.message
      );
      setProcessing(false);
      showErrorToast("Status check failed! Please try again.", 2000);
    }
  };

  const handleThemeChange = (th) => {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then(() => setTheme(theme));
    }
  };

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

      <div className="h-4 w-full bg-gradient-to-r from-blue-700 via-blue-400 to-blue-200"></div>
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-[40%] justify-start">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={value}
            theme={theme.value}
            defaultCode={defaultCode}
          />
        </div>
        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
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
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
    </>
  );
};

export default Landing;
