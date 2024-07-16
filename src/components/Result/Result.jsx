import React, { useState, useEffect } from "react";
import "./Result.css";

const Result = ({
  userChoice,
  computerChoice,
  result,
  onPlayAgain,
  choices,
}) => {
  const [revealState, setRevealState] = useState({
    choicesRevealed: false,
    outcomeRevealed: false,
    rippleActive: false,
    cyclingChoice: null,
    isCycling: true,
  });

  useEffect(() => {
    const totalDuration = 2000;
    const initialSpeed = 50;
    const finalSpeed = 200;
    const steps = 20; // Number of steps to slow down

    let cycleCount = 0;
    let currentSpeed = initialSpeed;
    let interval;

    const cycleChoices = () => {
      interval = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * choices.length);
        setRevealState((prevState) => ({
          ...prevState,
          cyclingChoice: choices[randomIndex],
        }));
        cycleCount++;
        // Gradually increase the interval duration to slow down the cycling
        currentSpeed =
          initialSpeed + (finalSpeed - initialSpeed) * (cycleCount / steps);

        if (cycleCount >= steps) {
          clearTimeout(interval);
          setRevealState((prevState) => ({
            ...prevState,
            cyclingChoice: null,
            isCycling: false,
            choicesRevealed: true,
          }));
        } else {
          cycleChoices();
        }
      }, currentSpeed);
    };

    cycleChoices();

    const outcomeTimer = setTimeout(() => {
      setRevealState((prevState) => ({
        ...prevState,
        outcomeRevealed: true,
      }));
    }, totalDuration + 1000);

    const rippleTimer = setTimeout(() => {
      setRevealState((prevState) => ({
        ...prevState,
        rippleActive: true,
      }));
    }, totalDuration + 1500);

    return () => {
      clearTimeout(interval);
      clearTimeout(outcomeTimer);
      clearTimeout(rippleTimer);
    };
  }, [userChoice, computerChoice, result, choices]);

  const { choicesRevealed, outcomeRevealed, cyclingChoice, isCycling } =
    revealState;
  const { name: userName, icon: userIcon } = userChoice;
  const { name: computerName, icon: computerIcon } = computerChoice;

  const isWinner = result === "You win";
  const isLoser = result === "You lose";

  return (
    <section className="result">
      <div
        className={`choices-container ${
          outcomeRevealed ? "reveal-outcome" : ""
        }`}
      >
        <div className="user-result">
          <div
            className={`result-container ${userName} ${
              isWinner && choicesRevealed ? "reveal-ripple" : ""
            } ${choicesRevealed ? "show" : ""}`}
          >
            <div className={`choice-result ${userName}`}>
              <img src={userIcon} alt={userName} />
            </div>
          </div>
          <h3>You Picked</h3>
        </div>
        {choicesRevealed && (
          <div className={`outcome-container ${outcomeRevealed ? "show" : ""}`}>
            <div className="outcome-text">
              <h2>{result}</h2>
              <button className="play-again-btn" onClick={onPlayAgain}>
                Play Again
              </button>
            </div>
          </div>
        )}
        <div className={`computer-result ${choicesRevealed ? "show" : ""}`}>
          <div
            className={`result-container ${
              isCycling ? cyclingChoice?.name : computerName
            } ${isLoser && choicesRevealed ? "reveal-ripple" : ""}`}
          >
            <div
              className={`choice-result ${
                isCycling ? cyclingChoice?.name : computerName
              }`}
            >
              <img
                src={isCycling ? cyclingChoice?.icon : computerIcon}
                alt={isCycling ? cyclingChoice?.name : computerName}
              />
            </div>
          </div>
          <h3>The House Picked</h3>
        </div>
      </div>
    </section>
  );
};

export default Result;
