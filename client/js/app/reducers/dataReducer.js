var initialState = {
  trucks: [],
  tyres: [],
}
export default function reducer(state=initialState, action) {

  switch (action.type) {
    case "SET_TRUCKS": {
      return {...state, trucks: action.payload}
    }
    case "SET_TYRES": {
      return {...state, tyres: action.payload}
    }
  }

  return state
}
