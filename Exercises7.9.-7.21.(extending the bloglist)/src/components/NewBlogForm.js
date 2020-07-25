import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

const NewBlogForm = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    newBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <Form onSubmit={handleNewBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <Form.Label>author:</Form.Label>
        <Form.Control
          id="author"
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Form.Label>url:</Form.Label>
        <Form.Control
          id="url"
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button id="create-blog" type="submit">
          create
        </Button>
      </Form.Group>
    </Form>
  )
}

NewBlogForm.propTypes = {
  newBlog: PropTypes.func.isRequired,
}

export default NewBlogForm
