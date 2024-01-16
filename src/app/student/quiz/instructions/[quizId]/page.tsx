"use client"
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import axios from "axios";

const instructions = [
    {
        title: "Submit your choice to validate the answer; then go to the next one.",
    },
    {
        title: `You won't be allowed to submit "no choice" and wrong answers will affect your score.
      `,
    },
    {
        title: "This quiz is timed - get the most correct answers in the given amount of time!",
    },
    {
        title: "If you switch tabs more the 3 times the quiz will end and you will be logged out",
    },
]

type CardProps = React.ComponentProps<typeof Card>

const InstructionsPage = ({ className, ...props }: CardProps) => {
    const path = usePathname()
    const QuizId = path.split('/').pop();

    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[80vh] m-5" {...props}>
            <Card>
                <div className="flex flex-col justify-center">
                    <CardHeader>
                        <CardTitle className="text-center text-4xl font-bold m-10">🤓 The Instructions</CardTitle>
                        <CardDescription className="font-semibold text-center m-5">Test your knowledge on a variety of topics with this quiz. Answer the questions to the best of your ability and see how well you fare!</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-5">
                        <div>
                            {instructions.map((instruction, index) => (
                                <div
                                    key={index}
                                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                >
                                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-950" />
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium leading-none">
                                            {instruction.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </div>
                <div className="w-full">
                    <CardFooter>
                        <Link href={`/student/quiz/mcq/${QuizId}`}>
                            <Button
                                className="w-full m-10"
                                onClick={async () => {
                                    try {
                                        await axios.post('/api/startQuiz');
                                        console.log('Quiz started successfully');
                                    } catch (error) {
                                        console.error('Error starting quiz:', error.message);
                                    }
                                }}
                            >
                                Start Quiz
                            </Button>
                        </Link>
                    </CardFooter>
                </div>
            </Card>

        </div>
    );
};

export default InstructionsPage;
