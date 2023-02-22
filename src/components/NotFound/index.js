import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";

export const NotFound = () => {
  return (
    <div className={styles["flex-container"]}>
      <div className={styles["text-center"]}>
        <h1>
          <span className={styles["fade-in"]} id="digit1">4</span>
          <span className={styles["fade-in"]} id="digit2">0</span>
          <span className={styles["fade-in"]} id="digit3">4</span>
        </h1>
        <h3 className={styles["fadeIn"]}>PAGE NOT FOUND</h3>
        <Link to={"/"} ><button type="button" name="button">Return To Home</button></Link>
      </div>
    </div>
  );
}
