import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css"

function Index() {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.Header} to={"/"}>
        Estarta Blog
      </Link>
      <div className={styles.buttons}>
        <Link className={styles.btn1} to={"/"}>
          Home
        </Link>
        <button className={styles.btn2}>
          <Link to={"/Create"}>New Blog</Link>
        </button>
      </div>
    </nav>
  );
}

export default Index;
