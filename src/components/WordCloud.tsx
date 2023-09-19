"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import D3WordCloud from "react-d3-cloud";

type Props = {};

const data = [
  {
    text: "Python",
    value: 1,
  },
  {
    text: "JavaScript",
    value: 2,
  },
  {
    text: "Java",
    value: 3,
  },
  {
    text: "Rust",
    value: 4,
  },
  {
    text: "Golang",
    value: 5,
  },
  {
    text: "Typescript",
    value: 6,
  },
  {
    text: "R",
    value: 7,
  },
  {
    text: "Web",
    value: 8,
  },
  {
    text: "C++",
    value: 9,
  },
  {
    text: "C",
    value: 10,
  },
  {
    text: "SQL",
    value: 11,
  },
  {
    text: "Perl",
    value: 12,
  },
  {
    text: "Scala",
    value: 13,
  },
  {
    text: "Pascal",
    value: 14,
  },
  {
    text: "C#",
    value: 15,
  },
  {
    text: "Ruby",
    value: 16,
  },
  {
    text: "PHP",
    value: 16,
  },
];

const fontSizeMapper = (word: { value: number }) => {
  return Math.log2(word.value) * 5 + 16;
};

const WordCloud = (props: Props) => {
  const theme = useTheme();

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  return shouldRender ? (
    <>
      {typeof window !== "undefined" && (
        <D3WordCloud
          data={data}
          width={500} // Adjust the width as needed
          height={500}
          font="Times"
          fontSize={fontSizeMapper}
          rotate={0}
          padding={10}
          fill={theme.theme === "dark" ? "white" : "black"}
        />
      )}
    </>
  ) : null;
};

export default WordCloud;
