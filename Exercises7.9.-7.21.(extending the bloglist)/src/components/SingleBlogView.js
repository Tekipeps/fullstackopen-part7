import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const SingleBlogView = ({ blogById }) => {
  const blog = blogById()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  if (!blog) return null
  const handleCommentSubmit = (event) => {
    event.preventDefault()
    dispatch(
      commentBlog({ id: blog.id, user, comment: event.target.comment.value })
    )
    event.target.comment.value = ''
  }
  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{' '}
        <span>
          <Button
            className="likeButton"
            onClick={() => dispatch(likeBlog(blog))}
          >
            like
          </Button>
        </span>
      </div>
      <div>added by {blog.user.username}</div>
      <div>
        {blog.comments.length ? <h2>comments</h2> : null}
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i}>{comment}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleCommentSubmit}>
        <div>
          <textarea name="comment"></textarea>
        </div>
        <div>
          <Button type="submit">post comment</Button>
        </div>
      </form>
    </div>
  )
}

export default SingleBlogView
