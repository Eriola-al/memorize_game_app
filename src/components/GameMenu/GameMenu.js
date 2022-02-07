import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import './GameMenu.css';

import {dateFormat} from '../../assests/Helper';

const levels = [
  "Easy",
  "Medium",
  "Hard"
];

export default function GameMenu(props) {

  const savedScores = JSON.parse(localStorage.getItem("scores")) ? JSON.parse(localStorage.getItem("scores")) : [];

  savedScores.length > 0 && savedScores.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1);

  savedScores.splice(5);

  let [scores, setScores] = useState(savedScores);
  const noGamePlayed = scores.length === 0;

  useEffect(() => {
    localStorage.setItem("level", "Easy")
  })

  function play() {
    const choosedLevel = localStorage.getItem("level");
    props.changeStep("GamePuzzle")
  }

  function setLevel(level) {
    localStorage.setItem("level", level)
  }

  return (
    <div className="GameMenu">
      <div className="boxWrapper">
        <div id="box1">
          <div className='gameDescription'>
            <div>Memorize the Picture</div>
          </div>
        </div>
        <div id="box2">
          <div id="box3">
            Level
            {
              levels.map(level => {
                return <Button key={level} name={level} onClick={() => setLevel(level)} />
              })
            }
          </div>
          <div id="box4">
            Scores
            {
              scores.map((score, index) => {
                if (index < 5) {
                  return <p style={{ fontWeight: 'normal', paddingBlockStart: 3}}key={index}><span style={{ fontWeight: 'bold' }}>{score.points} Points</span> 
                  &emsp; &emsp; 
                    {dateFormat(score.date)}
                  </p>
                }
              })
            }
            {noGamePlayed && <p style={{ fontWeight: 'normal' }}>No scores yet. Start the game!</p>}
          </div>
        </div>
        <div id="box5">
          <div className='callToAction'>
            <button onClick={() => play()}>PLAY</button>
          </div>
        </div>
      </div>
    </div>
  );
};

