const initialState = {
  name: '',
  difficulty: '',
  isLoading: false,
  Error: ''
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'name/set':
      return { ...state, name: payload }
    case 'difficulty/set':
      return { ...state, difficulty: payload }
    case 'loading/set':
      return { ...state, isLoading: payload }
    case 'error/set':
      return { ...state, Error: payload }
    default:
      return state;
  }
}
export default reducer