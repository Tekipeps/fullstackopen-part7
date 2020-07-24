import React from 'react'
import { useSelector } from 'react-redux'

const SingleUserView = ({ userById }) => {
  const user = userById()
  const blogs = useSelector((state) => state.blogs).filter(
    (blog) => blog.user.id === user.id
  )

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleUserView
