import React from "react";
import "./Choices.css";

const Choices = ({ choices, onChoose }) => {
  return (
    <div className="choices">
      {choices.map((choice) => (
        <div
          key={choice.id}
          onClick={() => onChoose(choice)}
          className={`choice-container ${choice.name}`}
        >
          <button className={`choice ${choice.name}`}>
            <img src={choice.icon} alt={choice.name} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Choices;
