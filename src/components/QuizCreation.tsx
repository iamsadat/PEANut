"use client";
import { quizCreationSchema } from "@/schemas/form/quiz";
import React, { use } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, CopyCheck } from "lucide-react";
import { Separator } from "./ui/separator";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

type Props = {};

type Input = z.infer<typeof quizCreationSchema>;

const QuizCreation = (props: Props) => {
  const { mutate: getQuestions, isLoading } = useMutation({
    mutationFn: async ({ amount, topic, type }: Input) => {
      const reponse = await axios.post("/api/quiz", {
        amount,
        topic,
        type,
      });
      return reponse.data;
    },
  });

  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const [finishedLoading, setFinishedLoading] = React.useState(false);

  const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      topic: "",
      type: "mcq",
      amount: 3,
    },
  });

  function onSubmit(input: Input) {
    getQuestions(
      {
        amount: input.amount,
        topic: input.topic,
        type: input.type,
      },
      {
        onSuccess: ({ gameId }) => {
          if (form.getValues("type") == "open_ended") {
            router.push(`/quiz/open-ended/${gameId}`);
            return;
          } else {
            router.push(`/quiz/mcq/${gameId}`);
          }
        },
      }
    );
  }

  form.watch();

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
          <CardDescription>Choose a topic</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a topic" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please provide any topic you would like to be quizzed on
                      here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="How many questions?"
                        type="number"
                        {...field}
                        onChange={(e) => {
                          form.setValue("amount", parseInt(e.target.value));
                        }}
                        min={1}
                        max={10}
                      />
                    </FormControl>
                    <FormDescription>
                      You can choose how many questions you would like to be
                      quizzed on here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => form.setValue("type", "mcq")}
                  className="w-1/2 rounded-none rounded-l-lg"
                  variant={
                    form.getValues("type") == "mcq" ? "default" : "secondary"
                  }
                >
                  <CopyCheck className="h-4 w-4 mr-2" />
                  Multiple Choice
                </Button>
                <Separator orientation="vertical" />
                <Button
                  type="button"
                  onClick={() => form.setValue("type", "open_ended")}
                  className="w-1/2 rounded-none rounded-r-lg"
                  variant={
                    form.getValues("type") == "open_ended"
                      ? "default"
                      : "secondary"
                  }
                >
                  <BookOpen className="h-4 w-4 mr-2" /> Open-Ended
                </Button>
              </div>
              <Button disabled={isLoading} type="submit">
                Create Quiz
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCreation;
