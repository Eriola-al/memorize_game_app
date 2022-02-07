import React, { useEffect, useState } from 'react';
import './GameQuiz.css';

import questions from '../../assests/questions';
import { dateFormat } from '../../assests/Helper';

export default function GameQuiz(props) {

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [result, setResult] = useState("");
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const choosedLevel = localStorage.getItem("level").toLowerCase();
	
	const scores = JSON.parse(localStorage.getItem("scores")) ? JSON.parse(localStorage.getItem("scores")) : []
	const scoresLength = scores.length - 1;

	useEffect(() => {
		showGameResult()
	}, [showResult])

	function goToGameMenu() {
		props.changeStep("GameMenu")
	}

	const setAnswer = (choice) => {
		if (choice === questions[currentQuestion].answer) {
			setCorrectAnswers(correctAnswers + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowResult(true);
		}
	}


	function showGameResult() {
		if (showResult) {
			scores.push(
				{ points: correctAnswers, date: Date() }
			)
			localStorage.setItem("scores", JSON.stringify(scores))
			const wrongAnswers = questions.length - correctAnswers;
			if (((wrongAnswers <= 4) && choosedLevel === "easy") ||
				((wrongAnswers <= 2) && choosedLevel === "medium") ||
				((wrongAnswers <= 1) && choosedLevel === "hard")
			) {
				setResult("You win!") 
			} else {
				setResult("You have lost the game!")
			}
		}
	}

	return (
		<div className="GameQuiz">
			<div className='bigContainer'>
				<div className={`${result ? "smallContainerHidden" : "smallContainer"}`}>
					{!result && (
						<>
							<div className='question-section'>
								<div className='question-text'>{questions[currentQuestion].title}</div>
							</div>
							<div className='answer-section'>
								{questions[currentQuestion].choices.map((choice, id) =>
									<button key={id} onClick={() => setAnswer(choice.key)}>{choice.key.toUpperCase()}. {choice.title}</button>)}
							</div>
						</>
					)}</div>
				{result && (
					<>
						<div className='resultContainer'>{result}</div>
						<div className='result'>You scored {scores[scoresLength].points} points out of {questions.length} <br />
						{dateFormat(scores[scoresLength].date)}
						</div>
						<button style={{
							backgroundColor: "rgba(0, 0, 0, 0.4)",
							border: "thin rgba(0, 0, 0, 0.4)",
							borderRadius: 8,
							color: "white",
							padding: "10px 70px",
							cursor: "pointer",
							width: "95.7%",
							display: "block",
							margin: "170px 0px 10px 15px",
							fontSize: 15,
							fontWeight: "bold"
						}}
							onClick={() => goToGameMenu()}>MENU</button>
					</>
				)}
			</div>
		</div>
	);
}
