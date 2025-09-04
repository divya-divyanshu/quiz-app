import React, { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import Results from "./components/Results";
import Score from "./components/Score";
import "./App.css";
import questionsData from "./data/questions.json";
function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    // Load questions from local JSON
    setQuestions(questionsData);
  }, []);

  useEffect(() => {
    // Reset selected answer when question changes
    setSelectedAnswer(userAnswers[currentIndex] || null);
  }, [currentIndex, userAnswers]);

  if (questions.length === 0) {
    return <div className="loading">Loading questions...</div>;
  }

  function handleSelectAnswer(option) {
    setSelectedAnswer(option);
  }

  function handleNext() {
    if (selectedAnswer === null) return; // Prevent next without selection

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentIndex] = selectedAnswer;
    setUserAnswers(newUserAnswers);


    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizFinished(true);
    }
  }

  function handlePrevious() {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  }

  function handleRestart() {
    setUserAnswers([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setQuizFinished(false);
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Quiz App</h1>

      {!quizFinished ? (
        <>
          <Score current={currentIndex + 1} total={questions.length} />
          <QuestionCard
            questionData={questions[currentIndex]}
            currentAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
          />
          <div className="navigation-buttons">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="nav-button"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="nav-button primary"
            >
              {currentIndex + 1 === questions.length ? "Submit" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <Results questions={questions} userAnswers={userAnswers} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
