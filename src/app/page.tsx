import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  return (

    <div>
      <div
        className="banner pt-4 sm:pt-navbar px-16 relative flex flex-col justify-center items-center sm:px-0 sm:justify-between sm:flex-row"
      >
        <div className="hidden sm:flex w-88 h-full items-center justify-center">
          <img className="w-full pb-0" src="/home01.jpg" />
        </div>
        <div
          className="sm:h-full sm:flex sm:flex-1 flex-col items-center justify-center ml-2"
        >
          <h1
            className="text-4.5xl sm:text-5xl pt-navbar text-center font-extrabold leading-170"
          >
            THINK. SOLVE. LEARN.
          </h1>
          <p
            className="text-1.5xl sm:text-xl font-medium text-center pt-14 sm:w-5/7 leading-160 opacity-60"
          >
            Peanut is an innovative online platform designed to cater to
            the educational needs of students of LIET,
            providing a comprehensive solution for learning and
            solving academic-related quizzes and assignments.
          </p>
        </div>
        <div
          className=" sm:w-88 flex flex-row-reverse justify-between sm:h-full sm:items-center sm:justify-center"
        >
        </div>
      </div>
      <div className="banner-footer flex justify-center items-start">
<Link href={"/login"}
 className="inline-flex flex-col items-center no-underline text-base">

        <img
          className="pt-0 -mt-14 sm:-mt-0 block sm:h-10"
          src="/down-arrow.svg"
        />
        <span className="block text-grey pt-4 font-semibold text-lg"
        >Get Started
        </span>
</Link>
      </div>
    </div>
  );
}
