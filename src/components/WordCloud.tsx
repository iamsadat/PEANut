"use client";

import React from "react";
import { useTheme } from "next-themes";
import D3WordCloud from "react-d3-cloud";

type Props = {};

const data = [
  {
    text: "Hey",
    value: 3,
  },
  {
    text: "Hi",
    value: 4,
  },
  {
    text: "Hello",
    value: 7,
  },
  {
    text: "Hola",
    value: 5,
  },
  {
    text: "Moshi Moshi",
    value: 9,
  },
  {
    text: "Namaste",
    value: 1,
  },
];

const fontSizeMapper = (word: { value: number }) => {
  return Math.log2(word.value) * 5 + 16;
};

const WordCloud = (props: Props) => {
  const theme = useTheme();
  return (
    <>
      <D3WordCloud
        height={500}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={theme.theme == "dark" ? "white" : "black"}
        data={data}
      />
    </>
  );
};

export default WordCloud;
