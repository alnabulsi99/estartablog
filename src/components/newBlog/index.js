import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const NewBlog = () => {
  const navigate = useNavigate();
  const newBlogRef = useRef({
    title: "",
    author: "",
    body: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:4000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlogRef.current),
    });
    navigate("/");
  }

  function handleChange(event) {
    newBlogRef.current = {
      ...newBlogRef.current,
      [event.target.name]: event.target.value,
    };
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <label className={styles.label}>Title:</label>
        <input className={styles.input} type="text" name="title" required onChange={handleChange} />

        <label className={styles.label}>Body:</label>
        <textarea className={styles.textarea} name="body" required onChange={handleChange}></textarea>

        <label className={styles.label}>Author:</label>
        <input className={styles.input} type="text" name="author" required onChange={handleChange} />

        <button className={styles.submitButton} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewBlog;
