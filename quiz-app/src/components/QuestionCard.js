import React from "react";

export default function QuestionCard({ questionData, currentAnswer, onSelectAnswer }) {
  return (
    <div className="question-card">
      <h2 className="question-text">{questionData.question}</h2>
      <div className="options">
        {questionData.options.map((option) => (
          <button
            key={option}
            className={`option-button ${currentAnswer === option ? "selected" : ""}`}
            onClick={() => onSelectAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
