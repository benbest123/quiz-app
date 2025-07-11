import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import Question from "../components/Question";

export default function QuizPage() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [newGame, setNewGame] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const questionsWithShuffledAnswers = data.results.map((q) => ({
          ...q,
          shuffledAnswers: [...q.incorrect_answers, q.correct_answer].sort(
            () => Math.random() - 0.5
          ),
        }));
        setQuizData({ ...data, results: questionsWithShuffledAnswers });
        setLoading(false);
      });
  }, [newGame]);

  if (loading)
    return (
      <div className="loading">
        <PuffLoader color={"#293264"} />
      </div>
    );

  if (!quizData) return <div>Failed to load quiz</div>;

  function handleAnswerSelect(questionIndex, selectedAnswer) {
    setSelectedAnswers((prev) => {
      if (prev[questionIndex] === selectedAnswer) {
        const newAnswers = { ...prev };
        delete newAnswers[questionIndex];
        return newAnswers;
      }
      return { ...prev, [questionIndex]: selectedAnswer };
    });
  }

  function handleCheckAnswers() {
    setGameOver(true);
  }

  function calculateScore() {
    let score = 0;
    quizData.results.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        score++;
      }
    });
    return score;
  }

  const score = calculateScore();

  function handleNewGame() {
    setSelectedAnswers({});
    setGameOver(false);
    setNewGame((prev) => !prev);
    setLoading(true);
  }

  const questionElements = quizData.results.map((q, index) => (
    <Question
      key={index}
      questionIndex={index}
      question={q.question}
      answers={q.shuffledAnswers}
      correctAnswer={q.correct_answer}
      onAnswerSelect={handleAnswerSelect}
      selectedAnswer={selectedAnswers[index]}
      gameOver={gameOver}
    />
  ));

  return (
    <main className="main-quiz">
      <section className="quiz-section">{questionElements}</section>

      <section className="end-game">
        {!gameOver && (
          <button className="check-answers" onClick={handleCheckAnswers}>
            Check answers
          </button>
        )}
        {gameOver && (
          <>
            <h2 className="score">You scored {score}/5 correct answers</h2>
            <button className="play-again" onClick={handleNewGame}>
              Play again
            </button>
          </>
        )}
      </section>
    </main>
  );
}
