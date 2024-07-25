import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <div className="banner pt-4 sm:pt-navbar px-4 sm:px-16 relative flex flex-col sm:flex-row justify-center items-center sm:justify-between">
        <div className="hidden sm:flex w-88 h-full items-center justify-center">
          <img className="h-auto max-w-md pb-0" src="/home01.jpg" alt="Banner Image" />
        </div>
        <div className="sm:h-full sm:flex sm:flex-1 flex-col items-center justify-center px-5 sm:ml-2 font-sans">
          <h1 className="text-3xl sm:text-5xl pt-navbar text-center font-extrabold leading-tight sm:leading-170">
            THINK. SOLVE. LEARN.
          </h1>
          <p className="text-lg sm:text-xl font-medium text-center pt-6 sm:pt-14 sm:w-5/7 leading-160 opacity-60">
            Peanut is an innovative online platform designed to cater to the
            educational needs of students of LIET, providing a comprehensive
            solution for learning and solving academic-related quizzes and
            assignments.
          </p>
        </div>
        <div className="sm:w-88 flex flex-row-reverse justify-between sm:h-full sm:items-center sm:justify-center"></div>
      </div>
      <div className="banner-footer flex justify-center items-start mt-8 sm:mt-0">
        <Link
          href="/getstarted"
          className="inline-flex flex-col items-center no-underline text-base"
        >
          <span className="text-base sm:text-xl font-medium text-center pt-5 sm:w-5/7 leading-160 opacity-60">

          </span>
        </Link>
      </div>
      <footer className="absolute bottom-0 w-full bg-gray-800 text-white text-center py-4">
        <p className="text-sm">
          The website is developed by{" "}
          <Link href="https://sdsclub.vercel.app" className="underline text-blue-200">
            SDSClub
          </Link>                </p>
      </footer>
    </div>
  );
}
