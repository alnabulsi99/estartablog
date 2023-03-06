import React, { useState, useEffect } from "react";
// import useFetch from "../../Customhook/useFetch";
import styles from "./styles.module.css";
import { BiSearchAlt } from "react-icons/bi";
import BlogComp from "./BlogComp";
import { useDispatch, useSelector } from "react-redux";

function Blog() {
  // const { data, loading, error } = useFetch("http://localhost:4000/blogs");
  const [searching, setSearching] = useState("");
  
  const { blogs, loading, error } = useSelector((state) => state.blogsReducer);
const dispatch=useDispatch()
  useEffect(() => {
    
    async function fetchData() {
      dispatch({
        type: "FETCH_START",
      });
  
      try {
        const response = await fetch(
          "http://localhost:4000/blogs"
        );
        const fetchedData = await response.json();
  
        dispatch({
          type: "FETCH_SUCCESS",
          payload: fetchedData
        });
      } catch (error) {
        dispatch({
          type: "FETCH_ERROR",
        });
      }
    }
    

fetchData();

  

  }, [])
  

  if (loading) return "loading ......";

  if (error) return "Errror fetching.....";
  return (
    <div className={styles.container}>
    
      <div className={styles.searchicon}>
        <input
          className={styles.searchbar}
          type="text"
          placeholder="Search by Blog name:"
          onChange={(event) => setSearching(event.target.value.toLowerCase())}
        />
        <BiSearchAlt size={30}></BiSearchAlt>
      </div>
      {blogs
        .filter((blog) => blog.title.toLowerCase().includes(searching))
        .map((blog) => (
          <BlogComp blog={blog} key={blog.id} />
        ))}
    </div>
  );
}

export default Blog;
