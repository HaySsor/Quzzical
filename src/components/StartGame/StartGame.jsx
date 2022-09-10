import React from "react";
import styles from "./StartGame.module.css";
import Button from "../Button/Button";

function StartGame(props) {
	return (
		<div className={styles.start}>
			<h1>Quizzical</h1>
			<p>Some description if needed</p>
			<Button title="StartGame" onClick={props.onGame} />
		</div>
	);
}

export default StartGame;
