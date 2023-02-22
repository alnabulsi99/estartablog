import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../Customhook/useFetch'
import styles from './styles.module.css'

const SingleBlog = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const { data: blog, loading, error } = useFetch(`http://localhost:4000/blogs/${id}`)

    async function handleDelete() {

        await fetch(`http://localhost:4000/blogs/${id}`, {
            method: "DELETE"
        })

        navigate("/")
    }

    if (loading) return "loading ......"

    if (error) return "Errror fetching....."

    return (
        <div className={styles.singleBlogContainer} key={blog.id}>
            <h2 className={styles.blogTitle}>{blog.title}</h2>
            <div className={styles.blogAuthor}>{blog.author}</div>
            <div className={styles.blogBody}>{blog.body}</div>
            <button className={styles.deleteButton} onClick={handleDelete}>Delete this Blog</button>
        </div>
    )
}

export default SingleBlog
