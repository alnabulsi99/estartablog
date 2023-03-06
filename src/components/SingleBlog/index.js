import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Customhook/useFetch";
import styles from "./styles.module.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

function SingleBlog() {
  const back = useNavigate();
  const { id } = useParams();
  // const {
  //   data: blog,
  //   error,
  //   loading,
  // } = useFetch(`http://localhost:4000/blogs/${id}`);


  const { activeBlog, loading, error } = useSelector((state) => state.blogsReducer);
const dispatch=useDispatch()
useEffect(() => {
 
  async function fetchData() {
    dispatch({
      type: "FETCH_START",
    });

    try {
      const response = await fetch(
        `http://localhost:4000/blogs/${id}`
      );
      const fetchedData = await response.json();

      dispatch({
        type: "FETCH_BLOG",
        payload: fetchedData
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
      });
    }
  }
  fetchData();
  return () => {
    dispatch({
      type: "FETCH_CLEAN"
    })
    console.log("Clean up for singleBlog")
    console.log(activeBlog)
  };
}, [])


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
  if (loading) return "loading ......";

  if (error) return "Errror fetching.....";

  return (
    <div className={styles.singleBlogContainer}>
  <Helmet>
        <title>{`Blog : ${id}`}</title>
      </Helmet>
      <div className={styles.title}>
        Title : {activeBlog?.title}{" "}
        <RiDeleteBin6Fill
          size={30}
          className={styles.button}
          onClick={() => handleClick()}
        >
          Delete
        </RiDeleteBin6Fill>
      </div>
      <div className={styles.author}> Author : {activeBlog?.author}</div>
      <div className={styles.body}>{activeBlog?.body}</div>
    </div>
  );
}
export default SingleBlog;
