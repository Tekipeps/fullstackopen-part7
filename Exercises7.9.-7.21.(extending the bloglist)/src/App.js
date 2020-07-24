import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, deleteBlog, createBlog } from './reducers/blogReducer'
import {
  checkLoggedInUser,
  loginUser,
  logoutUser,
} from './reducers/userReducer'
import UsersView from './components/UsersView'
import SingleUserView from './components/SingleUserView'
import SingleBlogView from './components/SingleBlogView'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

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

  const userById = (id) => {
    const blog = blogs.find((blog) => blog.user.id === id)
    if (!blog) return null
    return blog.user
  }

  const blogById = (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    return blog
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
        <Route path="/users/:id">
          <SingleUserView userById={() => userById(userMatch.params.id)} />
        </Route>
        <Route path="/users">
          <UsersView />
        </Route>
        <Route path="/blogs/:id">
          <SingleBlogView blogById={() => blogById(blogMatch.params.id)} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
