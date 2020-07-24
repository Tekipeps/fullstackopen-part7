import loginService from '../services/login'

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    dispatch({
      type: 'SET_USER',
      data: user,
    })
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
}

export const logoutUser = () => {
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
