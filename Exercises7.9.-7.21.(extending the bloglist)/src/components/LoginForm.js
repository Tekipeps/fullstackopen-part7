import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleLogin,
  setUsername,
  username,
  setPassword,
  password,
}) => {
  return (
    <div className="container">
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="username"
            autoComplete="username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="password"
            autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
