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
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[285px] shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center">Welcome to PEANut 🔥!</CardTitle>
          <CardDescription className="text-center">
            PEANut is a platform for creating quizzes using AI!. Get started by logging in below!
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
    </div>
  );
}
