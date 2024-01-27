"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLenis } from "@studio-freight/react-lenis/types";
import Link from "next/link";

export default async function Home() {

  const lenis = useLenis(({ scroll }) => {

  })

  return (

    <div>
      <div
        className="banner pt-4 sm:pt-navbar px-16 relative flex flex-col justify-center items-center sm:px-0 sm:justify-between sm:flex-row"
      >
        <div className="hidden sm:flex w-88 h-full items-center justify-center">
          <img className="h-auto max-w-md pb-0" src="/home01.jpg" />
        </div>
        <div
          className="sm:h-full sm:flex sm:flex-1 flex-col items-center justify-center ml-2 px-5"
        >
          <h1
            className="text-4.5xl sm:text-5xl pt-navbar text-center font-extrabold leading-170"
          >
            THINK. SOLVE. LEARN.
          </h1>
          <p
            className="text-1.5xl sm:text-xl font-medium text-center pt-14 sm:w-5/7 leading-160 opacity-60 "
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

        {/* <Link onClick={() => lenis.scrollTo("#last-image", { lerp: 0.01 })}
        className="inline-flex flex-col items-center no-underline text-base" href={""}>

          <img
            className="pt-0 -mt-14 sm:-mt-0 block sm:h-10"
            src="/down-arrow.svg"
          />
          <span className="text-0xl sm:text-xl font-medium text-center pt-5 sm:w-5/7 leading-160 opacity-60 "
          >Get Started
          </span>
        </Link> */}

        <button
        ref="#last-image"
        onClick={() => lenis.scrollTo("#last-image", { lerp: 0.01 })}
        className="bg-white text-black capitalize p-4 font-semibold text-xl mt-16 hover:bg-white/90"
      >
        scroll to anchor
      </button>
        
      </div>
      <div className="flex flex-col items-center ">
        <h1 id="last-image" className="text-7xl font-bold mt-20 mb-20 font-mono 	">
          Welcome To PEANut!🔥{" "}
        </h1>

        <div className="flex flex-row gap-6 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mt-5 ">
          <Card className="w-[285px] shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center">Student Portal</CardTitle>
              <CardDescription className="text-center">
                PEANut is a platform for taking quizzes!. Get started by logging
                in below!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between px-3">
                <Link href="/student/login">
                  <Button>Log In</Button>
                </Link>
                <Link href="/student/signup">
                  <Button>Sign Up</Button>
                </Link>
                {/* signUpButton */}
              </div>
            </CardContent>
          </Card>
          <Card className="w-[285px] shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center">Faculty Portal</CardTitle>
              <CardDescription className="text-center pt-4">
                To access the faculty portal, please log in below!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center px-3 pt-1">
                <Link href="/faculty/login">
                  <Button>Log In</Button>
                </Link>

                {/* signUpButton */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div >


  );
}
