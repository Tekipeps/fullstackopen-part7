import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UsersView = () => {
  const blogs = useSelector((state) => state.blogs)
  const usersList = Object.entries(
    blogs.reduce((acc, curr) => {
      acc[curr.user.username] = (acc[curr.user.username] || 0) + 1
      return acc
    }, {})
  ).map(([user, blogs]) => ({ user, blogs }))
  const userId = (username) => {
    const blog = blogs.find((blog) => blog.user.username === username)
    if (blog) return blog.user.id
  }
  //   console.log(userId('dodo'))
  //   console.log(userList)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((list) => (
            <tr key={list.user}>
              <td>
                <Link to={'/users/' + userId(list.user)}>{list.user}</Link>
              </td>
              <td>{list.blogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView
