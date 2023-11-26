import "./App.css";
import logo from "./images/logo.svg";
import triangle from "./images/bg-triangle.svg";
import paper from "./images/icon-paper.svg";
import scissors from "./images/icon-scissors.svg";
import rock from "./images/icon-rock.svg";
import close from "./images/icon-close.svg";
import rules from "./images/image-rules.svg";
import StyledButton from "./assets/buttons/ChoiceButton";

import { useEffect, useState } from "react";

const choices = ["rock", "paper", "scissors"];

export default function App() {
  const [open, setOpen] = useState(false);

  const [choosenId, setChoosenID] = useState("");
  const [choiceSRC, setChoiceSRC] = useState("");
  const [cpuChoice, setCPUChoice] = useState("");
  const [choosenIdCPU, setChoosenIDCPU] = useState("");

  const [shown, setShown] = useState(false);

  const [cpuDisplay, setCPUDisplay] = useState(false);
  const [buttonDisplay, setButttonDisplay] = useState(false);
  const [winner, setWinner] = useState("");

  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);

  const [fade, setFade] = useState("");

  useEffect(() => {
    if (localStorage.getItem("score") === null) {
      localStorage.setItem("score", 0);
    } else {
      setScore(+localStorage.getItem("score"));
    }
  }, []);

  function handleClick(name, isHidden) {
    setShown(isHidden);

    if (name === "rock") {
      setChoosenID("rockElement");
      setChoiceSRC(rock);
    }
    if (name === "paper") {
      setChoosenID("paperElement");
      setChoiceSRC(paper);
    }
    if (name === "scissors") {
      setChoosenID("scissorsElement");
      setChoiceSRC(scissors);
    }
    setTimeout(() => {
      game(name);
      setCPUDisplay(true);
      setButttonDisplay(true);
    }, 2000);
  }

  const game = (name) => {
    var number = Math.floor(Math.random() * 3);
    if (choices[number] === "rock") {
      setCPUChoice(rock);
      setChoosenIDCPU("rockElement");
    }
    if (choices[number] === "paper") {
      setCPUChoice(paper);
      setChoosenIDCPU("paperElement");
    }

    if (choices[number] === "scissors") {
      setCPUChoice(scissors);
      setChoosenIDCPU("scissorsElement");
    }

    if (choices[number] === name) {
      setResult("DRAW");
    } else {
      if (
        (choices[number] === "rock" && name === "paper") ||
        (choices[number] === "paper" && name === "scissors") ||
        (choices[number] === "scissors" && name === "rock")
      ) {
        setResult("YOU WIN");
        setScore(score + 1);
        setWinner("Player");
      }
      if (
        (choices[number] === "rock" && name === "scissors") ||
        (choices[number] === "paper" && name === "rock") ||
        (choices[number] === "scissors" && name === "paper")
      ) {
        setResult("YOU LOSE");
        setWinner("CPU");
      }
    }
  };
  if (score > 0) {
    localStorage.setItem("score", score);
  }

  return (
    <div className="app">
      <div
        className={`rulesBackgroundContainer ${
          fade === true ? "fadeIn" : "fadeOut"
        }`}
        style={{ display: open ? "" : "none" }}
      >
        <div className="rulesContainer">
          <h2>RULES</h2>
          <button id="closeBTN">
            <img
              src={close}
              alt="closeButton"
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setOpen(false);
                }, 290);
              }}
            ></img>
          </button>
          <img id="rulesIMG" src={rules} alt=""></img>
        </div>
      </div>
      <div className="headerContainer">
        <img src={logo} alt="logo" id="logo"></img>
        <div className="scoreContainer">
          <p id="scoreText">SCORE</p>
          <p id="score">{score}</p>
        </div>
      </div>
      <div className={`gameContainer  ${shown ? "" : "fadeInSecond"}`}>
        <div
          className="pickContainer"
          style={{
            display: shown ? "none" : "",
          }}
        >
          <img id="triangle" src={triangle} alt=""></img>
          <StyledButton
            name={"paper"}
            handleClick={handleClick}
            source={paper}
            elementID="paperBTN"
          />
          <StyledButton
            name={"scissors"}
            handleClick={handleClick}
            source={scissors}
            elementID="scissorsBTN"
          />
          <StyledButton
            name={"rock"}
            handleClick={handleClick}
            source={rock}
            elementID="rockBTN"
          />
        </div>
        <div className="nextContainer" style={{ display: shown ? "" : "none" }}>
          <div className="playerContainer">
            <h2 className="pickText">YOU PICKED</h2>
            <span
              className="winShadow"
              style={{ display: winner === "Player" ? "" : "none" }}
            />
            <div className="choosenElement" id={choosenId}>
              <div className="paperIMGContainerChoosen">
                <span id="imgShadowChoosen"></span>
                <img id="paperIMGChoosen" src={choiceSRC} alt=""></img>
              </div>
            </div>
          </div>
          <div className="resultContainer">
            <h2
              id="resultText"
              className="fadeInThird"
              style={{ display: buttonDisplay ? "" : "none" }}
            >
              {result}
            </h2>
            <button
              style={{ display: buttonDisplay ? "" : "none" }}
              onClick={() => {
                setShown(false);
                setCPUDisplay(false);
                setResult("");
                setButttonDisplay(false);
                setWinner("");
              }}
              id="resultBTN"
              className="fadeInFourth"
            >
              PLAY AGAIN
            </button>
          </div>
          <div className="cpuContainer">
            <h2 className="pickText">THE HOUSE PICKED</h2>
            <span
              className="winShadow"
              style={{ display: winner === "CPU" ? "" : "none" }}
            />
            <div id="waitCPU" style={{ display: cpuDisplay ? "none" : "" }}>
              <span id="waitCPUInner"></span>
            </div>
            <div
              className="choosenElement"
              id={choosenIdCPU}
              style={{ display: cpuDisplay ? "" : "none" }}
            >
              <div className="paperIMGContainerChoosen">
                <span id="imgShadowChoosen"></span>
                <img id="paperIMGChoosen" src={cpuChoice} alt=""></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <button
          id="rules"
          onClick={() => {
            setOpen(true);
            setFade(true);
          }}
        >
          RULES
        </button>
      </div>
    </div>
  );
}
