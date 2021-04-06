const initialState = {
  LoadingText: '',
  Error: ''
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'loading/set':
      return { ...state, LoadingText: payload }
    case 'error/set':
      return { ...state, Error: payload }
    default:
      return state;
  }
}
export default reducer