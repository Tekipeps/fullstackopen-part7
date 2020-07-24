import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UsersView = () => {
  const blogs = useSelector((state) => state.blogs)
  const userList = Object.entries(
    blogs.reduce((acc, curr) => {
      acc[curr.user.username] = (acc[curr.user.username] || 0) + 1
      return acc
    }, {})
  ).map(([user, blogs]) => ({ user, blogs }))

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
    </div>
  )
}

export default UsersView
