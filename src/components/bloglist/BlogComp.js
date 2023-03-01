import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { ImCancelCircle } from "react-icons/im";
import { AiTwotoneEdit } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { memo } from "react";

const BlogComp = ({blog}) => {
    const [editedTitle, setEditedTitle] = useState("");
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [blogs, setBlogs] = useState(blog);

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
                ...blogs,
                title: editedTitle,
            }),
        })
          .then((response) => response.json())
          .then((data) =>    
            setBlogs(data)
          )
          .catch((error) => console.log(error));
    
        setSelectedBlogId(null);
        setEditedTitle("");
    };

    const handleCancel = () => {
        setSelectedBlogId(null);
        setEditedTitle("");
    };
    return (
        <>
  
            
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
                            <h2>Title: {blogs.title} </h2>
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
                <Link to={`./SingleBlog/${blogs.id}`}>
                    <p>Author: {blogs.author}</p>
                    <p>{blogs.body}</p>
                </Link>
            </div>
        </>
    );
}

export default memo(BlogComp)
