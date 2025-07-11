import { clsx } from "clsx";
import { decode } from "html-entities";

export default function Question({
  question,
  answers,
  correctAnswer,
  questionIndex,
  onAnswerSelect,
  selectedAnswer,
  gameOver,
}) {
  const answerElements = answers.map((answer, index) => {
    const className = clsx("answer", {
      selected: selectedAnswer === answer,
      faded: gameOver,
      correct: gameOver && correctAnswer === answer,
      incorrect:
        gameOver &&
        selectedAnswer === answer &&
        selectedAnswer !== correctAnswer,
    });
    return (
      <button
        key={index}
        className={className}
        onClick={() => onAnswerSelect(questionIndex, answer)}
      >
        {decode(answer)}
      </button>
    );
  });

  return (
    <div className="question-container">
      <h2 className="question">{decode(question)}</h2>
      <div className="answers">{answerElements}</div>
    </div>
  );
}
