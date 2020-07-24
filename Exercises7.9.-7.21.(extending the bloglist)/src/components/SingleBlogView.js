import React from 'react'

const SingleBlogView = ({ blogById }) => {
  const blog = blogById()
  if (!blog) return null
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <div>{blog.likes} likes</div>
      <div>added by {blog.user.username}</div>
    </div>
  )
}

export default SingleBlogView
