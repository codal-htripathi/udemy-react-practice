export default function StartScreen({ totalQuestions, onStart }) {
  return (
    <div className="start-card">
      <div className="start-icon">📘</div>
      <h2 className="start-title">Web Dev Quiz</h2>
      <p className="start-sub">
        Test your knowledge of web development fundamentals. Answer{" "}
        {totalQuestions} questions and see how you score.
      </p>
      <div className="stat-row">
        <div className="stat-box">
          <div className="stat-val">{totalQuestions}</div>
          <div className="stat-lbl">Questions</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">4</div>
          <div className="stat-lbl">Options each</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">1 pt</div>
          <div className="stat-lbl">Per correct</div>
        </div>
      </div>
      <button className="start-btn" onClick={onStart}>
        Start quiz
      </button>
    </div>
  );
}

console.log("StartScreen component loaded", StartScreen);