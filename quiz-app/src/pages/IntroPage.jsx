export default function IntroPage({ startQuiz }) {
  return (
    <main className="main-intro">
      <h1 className="title">Quizzical</h1>
      <button className="start-quiz" onClick={startQuiz}>
        Start quiz
      </button>
    </main>
  );
}
