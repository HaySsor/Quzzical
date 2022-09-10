import React from 'react'
import styles from './Buttom.module.css'

function Button(props) {
  
  return (
    <button onClick={props.onClick} className={styles.button}>{props.title}</button>
  )
}

export default Button