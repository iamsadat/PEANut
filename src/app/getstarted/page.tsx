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
        <div className="flex flex-col items-center ">
            <h1 className="text-7xl font-bold mt-20 mb-20 font-mono 	">
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
    );
}