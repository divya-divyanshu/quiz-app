import React from "react";

export default function Score({ current, total }) {
  return (
    <div className="score">
      Question {current} of {total}
    </div>
  );
}
