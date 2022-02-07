import './App.css';
import React, { useEffect, useState } from 'react';
import border_template from './assests/border_template.mp4';
import GameMenu from './components/GameMenu/GameMenu';
import GamePuzzle from './components/GamePuzzle/GamePuzzle';
import GameQuiz from './components/GameQuiz/GameQuiz';

function App() {
  let [currentStep, setCurrentStep] = useState("GameMenu");

  useEffect(() => {
    changeStep();
  })

  function changeStep(gameStep){
    if (gameStep) {
    localStorage.setItem("currentStep", gameStep);
    setCurrentStep(gameStep);
    }
  }

  return (
    <div className="App">
      <video className='videoBackground' autoPlay loop muted>
        <source src={border_template} type="video/mp4" />
      </video>
      { currentStep === "GameMenu" && <GameMenu changeStep={changeStep} />}
      { currentStep === "GamePuzzle" && <GamePuzzle changeStep={changeStep} />}
      { currentStep === "GameQuiz" && <GameQuiz changeStep={changeStep} />}
    </div>
  );
}

export default App;
