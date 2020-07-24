import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { Link, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, deleteBlog, createBlog } from './reducers/blogReducer'
import {
  checkLoggedInUser,
  loginUser,
  logoutUser,
} from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs).sort(
    (a, b) => b.likes - a.likes
  )
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
    dispatch(createBlog(blog, user))
    blogFormRef.current.toggleVisibility()
  }

  const handleDelete = (blog) => {
    dispatch(deleteBlog(blog, user))
  }

  const userList = Object.entries(
    blogs.reduce((acc, curr) => {
      acc[curr.user.username] = (acc[curr.user.username] || 0) + 1
      return acc
    }, {})
  ).map(([user, blogs]) => ({ user, blogs }))

  console.log(userList)

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
      <div>
        <Link to="/" style={{ padding: '10px' }}>
          home
        </Link>
        <Link to="/users" style={{ padding: '10px' }}>
          users
        </Link>
      </div>
      <Switch>
        <Route exact path="/">
          <h2>create new</h2>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <NewBlogForm newBlog={newBlog} />
          </Togglable>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleDelete={handleDelete}
              user={user}
            />
          ))}
        </Route>
        <Route path="/users">
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>blogs created</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((list) => (
                <tr key={list.user}>
                  <td>
                    <Link to="/users/">{list.user}</Link>
                  </td>
                  <td>{list.blogs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Route>
      </Switch>
    </div>
  )
}

export default App
