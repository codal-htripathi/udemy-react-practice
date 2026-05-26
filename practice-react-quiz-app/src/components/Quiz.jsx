import { useState } from "react";
import StartScreen from "./StartScreen";
import QuestionSlide from "./QuestionSlide";
import ScoreScreen from "./ScoreScreen";
import { questions } from "../data/questions";
import "../styles/quiz.css";

export default function Quiz() {
  const [screen, setScreen] = useState("start");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  const handleStart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setScreen("quiz");
  };

  const handleSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setScreen("quiz");
    } else {
      setScreen("score");
    }
  };

  return (
    <div className="quiz-wrap">
      {screen === "start" && (
        <StartScreen
          totalQuestions={questions.length}
          onStart={handleStart}
        />
      )}
      {screen === "quiz" && (
        <QuestionSlide
          question={questions[current].q}
          options={questions[current].options}
          correctIndex={questions[current].answer}
          selected={selected}
          current={current}
          total={questions.length}
          onSelect={handleSelect}
          onNext={handleNext}
        />
      )}
      {screen === "score" && (
        <ScoreScreen
          questions={questions}
          answers={answers}
          onRestart={handleStart}
        />
      )}
    </div>
  );
}