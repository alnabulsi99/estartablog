import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Index() {
  return (
    <nav className="navbar">
 <Link className="Header" to={"/"}>
          Estarta Blog
        </Link>      <div className="buttons">
        <Link className="btn1" to={"/"}>
          Home
        </Link>
        <button className="btn2">
          <Link to={"/Create"}>New Blog</Link>
        </button>
      </div>
    </nav>
  );
}

export default Index;
