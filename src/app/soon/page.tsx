import Image from "next/image";
import React from "react";

type Props = {};

const SoonPage = (props: Props) => {
  return (
    <div className="flex items-center justify-center bg-black h-screen">
      <Image
        src={"/soon.png"}
        alt="Launching soon image"
        width={1100}
        height={1100}
        quality={100}
      />
    </div>
  );
};

export default SoonPage;
