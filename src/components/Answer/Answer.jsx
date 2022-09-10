import React, { useState } from "react";
import styles from "./Answer.module.css";

function Answer(props) {
	function render(x) {
		return (
			<p
				className={`${styles.answer} ${x}`}
				onClick={() => {
					props.pickAnswer(props.id, props.title, props.idAnswer);
				}}>
				{props.title}
			</p>
		);
	}

	if (!props.endGame) {
		if (props.selected === props.title) {
			return render(styles.good);
		} else {
			return render("");
		}
	} else {
		if (props.selected === props.title) {
			if (props.current === props.title) {
				return render(styles.same);
			}
			return render(styles.bad);
		} else if (props.current === props.title) {
			return render(styles.good);
		} else {
			return render("");
		}
	}
}

export default Answer;
