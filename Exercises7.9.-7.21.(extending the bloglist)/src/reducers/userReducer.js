import loginService from '../services/login'

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch({
        type: 'SET_USER',
        data: user,
      })
    } catch (error) {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { type: 'error', message: error.response.data.error },
      })
    }
  }
}
export const checkLoggedInUser = () => {
  const loggedInUser = window.localStorage.getItem('loggedInUser')
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser)
    return {
      type: 'SET_USER',
      data: user,
    }
  }
  return {
    type: 'SET_USER',
    data: null,
  }
}

export const logoutUser = () => {
  window.localStorage.clear()
  return {
    type: 'REMOVE_USER',
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'REMOVE_USER':
      return null
    default:
      return state
  }
}

export default userReducer
