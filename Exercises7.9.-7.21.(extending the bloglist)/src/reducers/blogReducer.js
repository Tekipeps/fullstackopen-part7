import blogService from '../services/blogs'

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.like({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE_BLOG',
      data: blog,
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (newBlog, user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    const blog = await blogService.create(newBlog)
    dispatch({
      type: 'CREATE_BLOG',
      data: blog,
    })
  }
}

export const deleteBlog = (blog, user) => {
  return async (dispatch) => {
    const choice = window.confirm(`Delete ${blog.title}`)
    if (choice) {
      blogService.setToken(user.token)
      await blogService.remove(blog.id)
      dispatch({
        type: 'DELETE_BLOG',
        data: blog,
      })
    }
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.data.id)
    default:
      return state
  }
}

export default blogReducer
