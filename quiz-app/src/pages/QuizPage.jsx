import { useState } from "react";

export default function QuizPage() {
  const [quizData, setQuizData] = useState(null);

  fetch("https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple")
    .then((res) => res.json())
    .then((data) => setQuizData(data));

  return <></>;
}
