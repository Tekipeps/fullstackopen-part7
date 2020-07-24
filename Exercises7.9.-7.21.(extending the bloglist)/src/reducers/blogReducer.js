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
    try {
      blogService.setToken(user.token)
      const blog = await blogService.create(newBlog)
      dispatch({
        type: 'CREATE_BLOG',
        data: blog,
      })
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { type: 'success', message: `created ${newBlog.title}` },
      })
    } catch (error) {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { type: 'error', message: error.response.data.error },
      })
    }
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      })
    }, 5000)
  }
}

export const deleteBlog = (blog, user) => {
  return async (dispatch) => {
    try {
      const choice = window.confirm(`Delete ${blog.title}`)
      if (choice) {
        blogService.setToken(user.token)
        await blogService.remove(blog.id)
        dispatch({
          type: 'DELETE_BLOG',
          data: blog,
        })
        dispatch({
          type: 'SET_NOTIFICATION',
          data: { type: 'success', message: `deleted ${blog.title}` },
        })
      }
    } catch (error) {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { type: 'error', message: error.response.data.error },
      })
    }
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      })
    }, 5000)
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
