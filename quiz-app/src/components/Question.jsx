import { decode } from "html-entities";

export default function Question({ question, answers, correctAnswer }) {
  const answerElements = answers.map((answer, index) => (
    <button key={index} className="answer">
      {decode(answer)}
    </button>
  ));
  return (
    <div className="question-container">
      <h2 className="question">{decode(question)}</h2>
      <div className="answers">{answerElements}</div>
    </div>
  );
}
