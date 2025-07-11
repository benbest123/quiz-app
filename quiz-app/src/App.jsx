import { useState } from "react";
import "./index.css";
import IntroPage from "./pages/IntroPage";
import QuizPage from "./pages/QuizPage";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  function handleStartQuiz() {
    setStartQuiz(true);
  }

  return (
    <>
      {!startQuiz && <IntroPage startQuiz={handleStartQuiz} />}
      {startQuiz && <QuizPage />}
    </>
  );
}

export default App;
