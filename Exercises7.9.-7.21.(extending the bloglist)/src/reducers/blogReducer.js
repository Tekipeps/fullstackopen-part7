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

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export default blogReducer
