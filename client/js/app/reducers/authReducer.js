var initialState = {
  user: null,
  menu: 'home',
}
export default function reducer(state=initialState, action) {

  switch (action.type) {
    case "AUTH_SET_USER": {
      return {...state, user: action.payload}
    }
    case "AUTH_MENU": {
      return {...state, menu: action.payload}
    }
  }

  return state
}
