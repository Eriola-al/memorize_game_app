import "./GamePuzzle.css";
import React, { useEffect, useState } from 'react';
import Puzzle from '../../assests/puzzle_image.png';

export default function GamePuzzle(props) {
  let [counter, setCounter] = useState(1);
  let [timeoutInMs, setTimeoutInMs] = useState(0);

  const puzzleSlices = {
    easy: 2,
    medium: 3,
    hard: 5
  }

  const choosedLevel = localStorage.getItem("level").toLowerCase();

  useEffect(() => {
    changeDiv();
  });

  function setPuzzleTimeout() {
    if (choosedLevel === "hard") {
      setTimeoutInMs(2000);
    } else if (choosedLevel === "medium") {
      setTimeoutInMs(4000);
    } else {
      setTimeoutInMs(6000);
    }
  }

  function changeDiv() {
    let timeout;
    if (counter <= puzzleSlices[choosedLevel] * 2 + 1) {
      timeout = setTimeout(() => {
        changeDivBgColor()
      }, timeoutInMs)
      setPuzzleTimeout();
      
      function changeDivBgColor() {
        if (counter >= 1 && counter < puzzleSlices[choosedLevel] * 2 + 1) {
          document.getElementById('Overlay' + counter).style.background = 'transparent'
        }
        if (counter > 1 && counter <= puzzleSlices[choosedLevel] * 2 + 1) {
          document.getElementById('Overlay' + (counter - 1)).style.background = '#ffffff'
        }
        setCounter(counter + 1);
      }
    }
    if (counter > puzzleSlices[choosedLevel] + 1) {
      document.getElementById('OverlayHorizontal').style.display = 'flex';
      document.getElementById('OverlayVertical').style.display = 'none';
    }
    if (counter > puzzleSlices[choosedLevel] * 2 + 1) {
      props.changeStep("GameQuiz")
      return clearTimeout(timeout)
    }

  }

  function getVerticalSlices() {
    let content = []
    for (let i = 0; i < puzzleSlices[choosedLevel]; i++) {
      let element = <div key={i} id={"Overlay" + (i + 1)} style={{ width: 100 / puzzleSlices[choosedLevel] + "%", height: "inherit", background: "#ffffff" }}></div>
      content.push(element)
    }
    return content
  };

  function getHorizontalSlices() {
    let content = []
    for (let i = 0; i < puzzleSlices[choosedLevel]; i++) {
      let element = <div key={i} id={"Overlay" + (i + puzzleSlices[choosedLevel] + 1)} style={{ height: 100 / puzzleSlices[choosedLevel] + "vh", width: "100%", background: "#ffffff" }}></div>
      content.push(element)
    }
    return content
  };

  return (
    <div className="GamePuzzle">
      <div className="imageDiv">
        <img src={Puzzle} alt="puzzle" width="100%" height="100%" />
        <div id="OverlayVertical" style={{ width: "100%", height: "inherit" }}>
          {getVerticalSlices()}
        </div>
        <div id="OverlayHorizontal" style={{ width: "100%", height: "inherit", display: "none" }}>
          {getHorizontalSlices()}
        </div>
      </div>
    </div>
  );
};