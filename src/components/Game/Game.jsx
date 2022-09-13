import React, { useState, useEffect } from "react";
import styles from "./Game.module.css";
import { nanoid } from "nanoid";
import Button from "../Button/Button";
import Answer from "../Answer/Answer";

function Game(props) {
	const [questions, setQuestions] = useState([]);
	const [winPoint, setWinPoint] = useState(0);
	const [endGame, setEndGame] = useState(false);

	useEffect(() => {
		const URL = "https://opentdb.com/api.php?amount=5&type=multiple";

		async function getQuestion() {
			const res = await fetch(URL);
			const data = await res.json();
			setQuestions(
				data.results.map(item => {
					return {
						id: nanoid(),
						question: item.question,
						answers: [...item.incorrect_answers, item.correct_answer].sort(),
						correct: item.correct_answer,
						selected: "",
					};
				})
			);
		}
		getQuestion();
	}, []);

	function show() {
		console.log(questions);
	}

	function handleAnswer(id, title, idAnswer) {
		questions.forEach(item => {
			if (item.id === id) {
				if (item.correct === title) {
					setWinPoint(old => old + 1);
				}
			}
		});
		setQuestions(old =>
			old.map(x => {
				if (x.id === id) {
					return { ...x, selected: title };
				} else {
					return x;
				}
			})
		);
	}

	const renderQuestion = questions.map(item => {
		return (
			<div className={styles.contener} key={item.id}>
				<h3 className={styles.title}>{item.question}</h3>
				<div className={styles.box}>
					{item.answers.map(x => {
						return (
							<Answer
								title={x}
								id={item.id}
								idAnswer={nanoid()}
								key={nanoid()}
								pickAnswer={handleAnswer}
								selected={item.selected}
							/>
						);
					})}
				</div>
			</div>
		);
	});
	const renderEndGame = questions.map(item => {
		return (
			<div className={styles.contener} key={item.id}>
				<h3 className={styles.title}>{item.question}</h3>
				<div className={styles.box}>
					{item.answers.map(x => {
						return (
							<Answer
								endGame={endGame}
								title={x}
								id={item.id}
								idAnswer={nanoid()}
								key={nanoid()}
								selected={item.selected}
								current={item.correct}
							/>
						);
					})}
				</div>
			</div>
		);
	});

	return (
		<div className={styles.game}>
			{endGame ? renderEndGame : renderQuestion}
			<div className={styles.winbox}>
				{endGame && (
					<p className={styles.score}>Current answers : {winPoint}</p>
				)}
				{endGame ? (
					<Button
						title="Play Agan"
						onClick={() => {
							setEndGame(false);
							props.newGame();
						}}
					/>
				) : (
					<Button
						title="Check answers"
						onClick={() => {
							setEndGame(true);
						}}
					/>
				)}
			</div>
		</div>
	);
}

export default Game;
