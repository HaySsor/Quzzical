import React, { useState } from "react";
import styles from "./App.module.css";
import StartGame from "./components/StartGame/StartGame";
import Game from "./components/Game/Game";
import logo1 from "/squircle1.svg";
import logo2 from "/squircle2.svg";

function App() {
	const [startGame, setStartGame] = useState(false);

	function letStartGame() {
		setStartGame(true);
	}
	function newGame(){
		setStartGame(false);
	}

	return (
		<div className={styles.app}>
			<img className={styles.logo1} src={logo1} alt="" />
			{startGame ? <Game newGame={newGame} /> : <StartGame onGame={letStartGame} />}
			<img className={styles.logo2} src={logo2} alt="" />
		</div>
	);
}

export default App;
