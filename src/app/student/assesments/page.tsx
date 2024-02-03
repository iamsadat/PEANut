import FilteredQuizzes from "@/components/quiz/FilteredQuizzes";
import QuizCard from "@/components/quiz/QuizCard";
import React from "react";

type Props = {};

const AvailableQuizzesPage = (props: Props) => {
    return (
        <div>
            <FilteredQuizzes topic="Assesment - I" />
        </div>
    );
};

export default AvailableQuizzesPage;
