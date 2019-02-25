var initialState = {
  trucks: [],
}
export default function reducer(state=initialState, action) {

  switch (action.type) {
    case "SET_TRUCKS": {
      return {...state, trucks: action.payload}
    }
  }

  return state
}
