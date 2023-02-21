import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../Customhook/useFetch'
import "./styles.css";

const SingleBlog = () => {

    const navigate = useNavigate()
    const {id} = useParams()
    const {data : blog, loading, error} = useFetch(`http://localhost:4000/blogs/${id}`)

   async function HandleDelete() {

       await fetch(`http://localhost:4000/blogs/${id}`, {
            method: "DELETE"
        })

       navigate("/")
    }

    if(loading) return "loading ......"

if(error) return "Errror fetching....."

  return (
    <div key={blog.id}>

      <h2>{blog.title}</h2>
      <div>{blog.author}</div>
      <div>{blog.body}</div>
     <button onClick={HandleDelete}>Delete this Blog</button>
  </div>
  )
}

export default SingleBlog
