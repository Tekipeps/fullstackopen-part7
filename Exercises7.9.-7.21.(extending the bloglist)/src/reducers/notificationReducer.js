export const setNotification = (type, message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { type, message },
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return {}
    default:
      return state
  }
}

export default notificationReducer
