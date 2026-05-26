export default function ScoreScreen({ questions, answers, onRestart }) {
  const score = answers.filter((a, i) => a === questions[i].answer).length;
  const pct = Math.round((score / questions.length) * 100);
  const msg =
    pct === 100
      ? "Perfect score!"
      : pct >= 60
      ? "Good job!"
      : "Keep practicing!";

  return (
    <div className="score-card">
      <div className="score-circle">
        <span className="score-num">
          {score}/{questions.length}
        </span>
        <span className="score-label">{pct}%</span>
      </div>

      <div className="score-title">{msg}</div>
      <div className="score-sub">
        You answered {score} out of {questions.length} questions correctly.
      </div>

      <div className="breakdown">
        {questions.map((q, i) => {
          const correct = answers[i] === q.answer;
          return (
            <div key={i} className="breakdown-row">
              <span className="q-short">{q.q}</span>
              <span className={`badge ${correct ? "ok" : "no"}`}>
                {correct ? "Correct" : "Wrong"}
              </span>
            </div>
          );
        })}
      </div>

      <button className="restart-btn" onClick={onRestart}>
        Try again
      </button>
    </div>
  );
}