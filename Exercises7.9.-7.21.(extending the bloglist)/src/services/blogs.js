import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: {
      Authorization: token,
    },
  })
  return response.data
}
const comment = async (id, comment) => {
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    {
      headers: {
        Authorization: token,
      },
    }
  )
  return response.data
}
const like = async (likedBlog) => {
  const response = await axios.put(`${baseUrl}/${likedBlog.id}`, likedBlog)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token,
    },
  })
  return response
}

export default { getAll, create, setToken, like, remove, comment }
