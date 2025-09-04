import React from "react";

export default function Results({ questions, userAnswers, onRestart }) {
  const score = questions.reduce((acc, question, idx) => {
    return acc + (userAnswers[idx] === question.answer ? 1 : 0);
  }, 0);

  return (
    <div className="results">
      <h2>Your Score: {score} / {questions.length}</h2>
      <ul className="results-list">
        {questions.map((q, idx) => {
          const userAnswer = userAnswers[idx];
          const isCorrect = userAnswer === q.answer;
          return (
            <li key={q.id} className={`result-item ${isCorrect ? "correct" : "incorrect"}`}>
              <p><strong>Q{idx + 1}:</strong> {q.question}</p>
              <p>Your answer: {userAnswer || "No answer selected"}</p>
              {!isCorrect && <p>Correct answer: {q.answer}</p>}
            </li>
          );
        })}
      </ul>
      <button className="restart-button" onClick={onRestart}>Restart Quiz</button>
    </div>
  );
}
