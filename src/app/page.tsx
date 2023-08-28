import SignInButton from "@/components/SignInButton";
import SignUpButton from "@/components/SignUpButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Welcome to PEANut 🔥!</CardTitle>
          <CardDescription>
            PEANut is a platform for creating quizzes using AI!. Get started by
            loggin in below!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between px-3">
            <SignUpButton text="Register" />
            <SignInButton text="Sign In" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
