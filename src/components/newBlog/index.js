import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const NewBlog = () => {
  const navigate = useNavigate();
  const New = useRef({
    title: "",
    author: "",
    body: "",
  });

  console.log(New.current);
  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:4000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(New.current),
    });
    console.log(New.current);
    navigate("/");
  }

  function handleChange(event) {
    New.current = {
      ...New.current,
      [event.target.name]: event.target.value,
    };
  }

  return (
    <div className="wrapper">
      <form className="container" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" required onChange={handleChange} />

        <label>Body:</label>
        <textarea name="body" required onChange={handleChange}></textarea>

        <label>Author:</label>
        <input type="text" name="author" required onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewBlog;
