import React, { useState, useEffect } from "react";
import "./Game.css";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Choices from "../Choices/Choices";
import Result from "../Result/Result";
import RulesModal from "../Rules/Rules";
import rockIcon from "../../assets/images/icon-rock.svg";
import paperIcon from "../../assets/images/icon-paper.svg";
import scissorsIcon from "../../assets/images/icon-scissors.svg";
import lizardIcon from "../../assets/images/icon-lizard.svg";
import spockIcon from "../../assets/images/icon-spock.svg";
import logo from "../../assets/images/logo-bonus.svg";

const choices = [
  { id: 1, name: "scissors", icon: scissorsIcon },
  { id: 2, name: "paper", icon: paperIcon },
  { id: 3, name: "rock", icon: rockIcon },
  { id: 4, name: "lizard", icon: lizardIcon },
  { id: 5, name: "spock", icon: spockIcon },
];

const Game = () => {
  const [gameState, setGameState] = useState({
    userChoice: null,
    computerChoice: null,
    result: null,
    showChoices: true,
    error: null,
  });
  const [score, setScore] = useState({ user: 0, computer: 0 });
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);

  const handleUserChoice = (choice) => {
    try {
      const computerChoice = getComputerChoice();
      const gameResult = determineResult(choice.name, computerChoice.name);

      setGameState({
        userChoice: choice,
        computerChoice: computerChoice,
        result: gameResult,
        showChoices: false,
        error: null,
      });
    } catch (error) {
      console.error("Error in handleUserChoice:", error);
      setGameState((prevState) => ({
        ...prevState,
        error:
          "An error occurred while processing your choice. Please try again.",
      }));
    }
  };

  const getComputerChoice = () => {
    try {
      const randomIndex = Math.floor(Math.random() * choices.length);
      return choices[randomIndex];
    } catch (error) {
      console.error("Error in getComputerChoice:", error);
      setGameState((prevState) => ({
        ...prevState,
        error:
          "An error occurred while generating the computer's choice. Please try again.",
      }));
      return null;
    }
  };

  const determineResult = (userChoice, computerChoice) => {
    try {
      if (userChoice === computerChoice) {
        return "It's a tie";
      }

      if (
        (userChoice === "rock" &&
          (computerChoice === "scissors" || computerChoice === "lizard")) ||
        (userChoice === "paper" &&
          (computerChoice === "rock" || computerChoice === "spock")) ||
        (userChoice === "scissors" &&
          (computerChoice === "paper" || computerChoice === "lizard")) ||
        (userChoice === "lizard" &&
          (computerChoice === "paper" || computerChoice === "spock")) ||
        (userChoice === "spock" &&
          (computerChoice === "scissors" || computerChoice === "rock"))
      ) {
        return "You win";
      } else {
        return "You lose";
      }
    } catch (error) {
      console.error("Error in determineResult:", error);
      setGameState((prevState) => ({
        ...prevState,
        error:
          "An error occurred while determining the result. Please try again.",
      }));
      return null;
    }
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("score");
    if (savedScore) {
      setScore(JSON.parse(savedScore));
    }
  }, []);

  const updateScore = (result) => {
    try {
      if (result === "You win") {
        setScore((prevScore) => ({
          ...prevScore,
          user: prevScore.user + 1,
        }));
      } else if (result === "You lose") {
        setScore((prevScore) => ({
          ...prevScore,
          computer: prevScore.computer + 1,
          user: prevScore.user - 1,
        }));
      }
      localStorage.setItem("score", JSON.stringify(score));
    } catch (error) {
      console.error("Error in updateScore:", error);
      setGameState((prevState) => ({
        ...prevState,
        error: "An error occurred while updating the score. Please try again.",
      }));
    }
  };

  const toggleRulesModal = () => {
    setIsRulesModalOpen(!isRulesModalOpen);
  };

  const handlePlayAgain = () => {
    updateScore(gameState.result);
    setGameState({
      userChoice: null,
      computerChoice: null,
      result: null,
      showChoices: true,
      error: null,
    });
  };

  const resetScore = () => {
    try {
      setScore({ user: 0, computer: 0 });
      localStorage.setItem("score", JSON.stringify({ user: 0, computer: 0 }));
    } catch (error) {
      console.error("Error in resetScore:", error);
      setError(
        "An error occurred while resetting the score. Please try again."
      );
    }
  };

  return (
    <ErrorBoundary>
      <div className="App">
        {gameState.error && (
          <div className="error-overlay" role="alert">
            <div className="error-message">{gameState.error}</div>
          </div>
        )}
        <header className="header">
          <img
            src={logo}
            alt="Rock Paper Scissors Lizard Spock Logo"
            className="logo"
          />
          <section className="score-container">
            <article className="score-board">
              <h1 className="score-title">Score</h1>
              <p className="score" aria-live="polite">
                {score.user}
              </p>
            </article>
            <button
              className="reset-score-btn"
              onClick={resetScore}
              aria-label="Reset Score"
            >
              Reset Score
            </button>
          </section>
        </header>
        <main className="main-content">
          <section className="game-section">
            {gameState.showChoices && (
              <Choices choices={choices} onChoose={handleUserChoice} />
            )}

            {gameState.userChoice && gameState.computerChoice && (
              <Result
                aria-live="polite"
                aria-atomic="true"
                userChoice={gameState.userChoice}
                computerChoice={gameState.computerChoice}
                result={gameState.result}
                onPlayAgain={handlePlayAgain}
                updateScore={updateScore}
              />
            )}
          </section>
          <section className="rules-btn">
            <button onClick={toggleRulesModal}>Rules</button>
            <RulesModal isOpen={isRulesModalOpen} onClose={toggleRulesModal} />
          </section>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default Game;
