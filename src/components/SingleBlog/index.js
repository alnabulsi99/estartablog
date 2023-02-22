import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Customhook/useFetch";
import styles from "./styles.module.css";
import { RiDeleteBin6Fill } from "react-icons/ri";

function SingleBlog() {
  const back = useNavigate();
  const { id } = useParams();
  const {
    data: blog,
    error,
    loading,
  } = useFetch(`http://localhost:4000/blogs/${id}`);
  async function handleClick() {
    try {
      const response = await fetch(`http://localhost:4000/blogs/${id}`, {
        method: "DELETE",
      });
      back("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.singleBlogContainer}>
      <div className={styles.title}>
        Title : {blog?.title}{" "}
        <RiDeleteBin6Fill
          size={30}
          className={styles.button}
          onClick={() => handleClick()}
        >
          Delete
        </RiDeleteBin6Fill>
      </div>
      <div className={styles.author}> Author : {blog?.author}</div>
      <div className={styles.body}>{blog?.body}</div>
    </div>
  );
}
export default SingleBlog;