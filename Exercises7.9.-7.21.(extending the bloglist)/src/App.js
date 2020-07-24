import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useSelector, useDispatch } from 'react-redux'
import {
  initializeBlogs,
  deleteBlog,
  likeBlog,
  createBlog,
} from './reducers/blogReducer'
import {
  checkLoggedInUser,
  loginUser,
  logoutUser,
} from './reducers/userReducer'
import {
  setNotification,
  removeNotification,
} from './reducers/notificationReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkLoggedInUser())
  }, [dispatch])

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  const newBlog = (blog) => {
    try {
      dispatch(createBlog(blog, user))
      blogFormRef.current.toggleVisibility()
      dispatch(setNotification('success', `created ${blog.title}`))
    } catch (error) {
      dispatch(setNotification('error', `${error.response.data.error}`))
    }
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = (blog) => {
    try {
      dispatch(deleteBlog(blog, user))
      dispatch(setNotification('success', `deleted ${blog.title}`))
    } catch (error) {
      dispatch(setNotification('error', `${error.response.data.error}`))
    }
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <Notification type={notification.type} message={notification.message} />
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          username={username}
          setPassword={setPassword}
          password={password}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification type={notification.type} message={notification.message} />
      <p>
        {user.username} logged in{' '}
        <button
          onClick={() => {
            dispatch(logoutUser())
          }}
        >
          Logout
        </button>
      </p>
      <h2>create new</h2>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <NewBlogForm newBlog={newBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleDelete={handleDelete}
          handleLike={handleLike}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
