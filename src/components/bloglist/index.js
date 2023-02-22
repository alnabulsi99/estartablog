import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../Customhook/useFetch";
import styles from "./styles.module.css";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineSave } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";

function Blog() {
  const { data, loading, error } = useFetch("http://localhost:4000/blogs");
  const [blogs, setBlogs] = useState([]);
  const [searching, setSearching] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  useEffect(() => {
    setBlogs(data);
  }, [data]);

  const handleEdit = (blog) => {
    setSelectedBlogId(blog.id);
    setEditedTitle(blog.title);
  };

  const handleSave = (blog) => {

    // Make a PUT request to update the blog title in the server
    fetch(`http://localhost:4000/blogs/${blog.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...blog,
        title: editedTitle,
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        setBlogs((prevBlogs) =>
          prevBlogs.map((b) => (b.id === data.id ? data : b))
        )
      )
      .catch((error) => console.log(error));

    setSelectedBlogId(null);
    setEditedTitle("");
  };
  const handleCancel = () => {
    setSelectedBlogId(null);
    setEditedTitle("");
  };
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
          <div className={styles.wrapper} key={blog.id}>
            {selectedBlogId === blog.id ? (
              <div className={styles.editbar}>
                <input
            
                  className={styles.editbar}
                  type="text"
                  value={editedTitle}
                  onChange={(event) => setEditedTitle(event.target.value)}
                />
                <AiOutlineSave
                  size={30}
                  className={styles.savebutt}
                  onClick={() =>editedTitle.trim()==""? alert("Please Enter a Title"): handleSave(blog)}
                >
              
                </AiOutlineSave>
                <ImCancelCircle
                  size={26}
                  className={styles.cancelButton}
                  onClick={handleCancel}
                >
                  Cancel
                </ImCancelCircle>
              </div>
            ) : (
              <>
                <span className={styles.testing}>
                  <h2>Title: {blog.title} </h2>
                  <AiTwotoneEdit
                    size={30}
                    className={styles.editbutt}
                    onClick={() =>  handleEdit(blog)}
                  >
                    Edit
                  </AiTwotoneEdit>
                </span>
              </>
            )}
            <Link to={`./SingleBlog/${blog.id}`}>
              <p>Author: {blog.author}</p>
              <p>{blog.body}</p>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default Blog;
