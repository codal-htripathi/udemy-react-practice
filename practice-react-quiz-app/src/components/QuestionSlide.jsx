import { useEffect, useState } from "react";

const LETTERS = ["A", "B", "C", "D"];
const TIMER_DURATION = 10;

export default function QuestionSlide({
  question,
  options,
  correctIndex,
  selected,
  current,
  total,
  onSelect,
  onNext,
}) {
  const answered = selected !== null;
  const progress = (current / total) * 100;
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);

  // Reset timer on every new question
  useEffect(() => {
    setTimeLeft(TIMER_DURATION);
  }, [current]);

  // Countdown tick
  useEffect(() => {
    if (answered) return;

    if (timeLeft === 0) {
      onNext();
      return;
    }

    const tick = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(tick);
  }, [timeLeft, answered]);

  // Timer bar color — green → yellow → red
  const timerPct = (timeLeft / TIMER_DURATION) * 100;
  const timerColor =
    timerPct > 50 ? "#639922" : timerPct > 25 ? "#ba7517" : "#a32d2d";

  return (
    <>
      {/* Question progress bar */}
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="question-card">
        {/* Question meta + timer label row */}
        <div className="q-top-row">
          <div className="q-meta">
            Question {current + 1} of {total}
          </div>
          <div
            className="timer-label"
            style={{ color: timerColor }}
          >
            {timeLeft}s
          </div>
        </div>

        {/* Timer bar */}
        <div className="timer-bar-bg">
          <div
            className="timer-bar-fill"
            style={{
              width: `${timerPct}%`,
              background: timerColor,
            }}
          />
        </div>

        <div className="q-text">{question}</div>

        <div className="options-grid">
          {options.map((opt, i) => {
            let cls = "";
            if (answered) {
              if (i === correctIndex) cls = "correct";
              else if (i === selected) cls = "wrong";
            }
            return (
              <button
                key={i}
                className={`option-btn ${cls}`}
                disabled={answered}
                onClick={() => onSelect(i)}
              >
                <span className="option-letter">{LETTERS[i]}</span>
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <button className="next-btn" onClick={onNext}>
            {current < total - 1 ? "Next question" : "See results"}
          </button>
        )}
      </div>
    </>
  );
}