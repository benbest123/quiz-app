import { useEffect, useState } from "react";
import Question from "../components/Question";

export default function QuizPage() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        setQuizData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!quizData) return <div>Failed to load quiz</div>;

  const questionElements = quizData.results.map((q, index) => (
    <Question
      key={index}
      question={q.question}
      answers={[...q.incorrect_answers, q.correct_answer].sort(
        () => Math.random() - 0.5
      )}
      correctAnswer={q.correct_answer}
    />
  ));

  //   const correctAnswer = quizData.results.correct_answer;

  return <main>{questionElements}</main>;
}
