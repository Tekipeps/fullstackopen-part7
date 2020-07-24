import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const Blog = ({ user, blog, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const showWhenVisible = { display: visible ? '' : 'none' }

  const showDelete =
    blog.user.username === user.username ? { display: '' } : { display: 'none' }

  return (
    <div className="blog">
      <p className="notToggled">
        <span className="title">{blog.title}</span>{' '}
        <span className="author">{blog.author}</span>
        <span>
          <button
            className="toggle-blog-view"
            onClick={() => setVisible(!visible)}
          >
            {visible ? 'hide' : 'show'}
          </button>
        </span>
      </p>

      <div className="toggled" style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <span>
            <button
              className="likeButton"
              onClick={() => dispatch(likeBlog(blog))}
            >
              like
            </button>
          </span>
        </div>
        <div>{blog.user.username}</div>
        <button
          className="deleteButton"
          style={showDelete}
          onClick={() => handleDelete(blog)}
        >
          delete
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
