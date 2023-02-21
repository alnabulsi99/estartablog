// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useFetch from "../../Customhook/useFetch";
// import "./styles.css";

// function Blog() {
//   const { data, loading, error } = useFetch("http://localhost:4000/blogs");
//   const [blogs, setBlogs] = useState([]);
//   const [searching, SetSearching] = useState("");

//   if (loading) return "loading ......";

//   if (error) return "Errror fetching.....";
//   return (
//     <div className="container">
//       <input 
//         type="text"
//         placeholder="search for a blog"
//         onChange={(event) => SetSearching(event.target.value.toLowerCase())}
//       />
//       {data
//         .filter((Search) => Search.author.toLowerCase().includes(searching))
//         .map((blog) => (
//           <Link to={`/singleBlog/${blog.id}`}>
//             <div key={blog.id}>
//               <h2>{blog.title}</h2>
//               <p>Author: {blog.author}</p>
//               <p>{blog.body}</p>
//             </div>
//           </Link>
//         ))}
//     </div>
//   );
// }

// export default Blog;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../Customhook/useFetch";
import "./styles.css";

function Blog() {
  const { data, loading, error } = useFetch("http://localhost:4000/blogs");
  const [blogs, setBlogs] = useState([]);
  const [searching, SetSearching] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  
  
  useEffect(() => {
    setBlogs(data);
  }, [data]);

  const handleEdit = (blog) => {
    setEditMode(true);
    setEditedTitle(blog.title);
  };

  const handleSave = (blog) => {
    setEditMode(false);
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
      .then((data) => setBlogs((prevBlogs) => prevBlogs.map((b) => (b.id === data.id ? data : b))))
      .catch((error) => console.log(error));
  };

  if (loading) return "loading ......";

  if (error) return "Errror fetching.....";

  return (
    <div className="container">
      <input
        type="text"
        placeholder="search for a blog"
        onChange={(event) => SetSearching(event.target.value.toLowerCase())}
      />
      {blogs
        .filter((Search) => Search.author.toLowerCase().includes(searching))
        .map((blog) => (
          <div key={blog.id}>
            {editMode ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(event) => setEditedTitle(event.target.value)}
                />
                <button onClick={() => handleSave(blog)}>Save</button>
              </>
            ) : (
              <>
                <h2>{blog.title}</h2>
                <p>Author: {blog.author}</p>
                <p>{blog.body}</p>
                <button onClick={() => handleEdit(blog)}>Edit</button>
              </>
            )}
          </div>
        ))}
    </div>
  );
}

export default Blog