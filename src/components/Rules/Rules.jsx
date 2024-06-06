import React from "react";
import "./Rules.css";
import rulesImage from "../../assets/images/image-rules-bonus.svg";

const RulesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div
        className="modal"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <div className="modal-content">
          <h2 id="modal-title">Rules</h2>
          <img
            src={rulesImage}
            alt="Rules of rock, paper, scissors, lizard, Spock. Rock: Crushes lizard, breaks scissors, and vaporizes Spock
          Paper: Covers rock and disproves Spock
          Scissors: Cuts paper, decapitates lizard, and smashes or melts Spock
          Lizard: Poisons Spock, eats paper, and is crushed by rock
          Spock: Vaporizes rock and smashes scissors, but is poisoned by lizard and disproved by paper."
          />
          <div className="close" onClick={onClose}>
            &times;
          </div>
        </div>
      </div>
    </>
  );
};

export default RulesModal;
