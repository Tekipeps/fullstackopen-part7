import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, deleteBlog, createBlog } from './reducers/blogReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'
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
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-navbar">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <em>{user.username} logged in</em>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Button
                onClick={() => {
                  dispatch(logoutUser())
                }}
              >
                Logout
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="app_body">
        <h2>blog app</h2>
        <Notification type={notification.type} message={notification.message} />
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
    </div>
  )
}

export default App
