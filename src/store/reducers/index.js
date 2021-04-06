import { combineReducers } from 'redux'
import appReducer from './appReducer'
import gameReducer from './gameReducer'


const reducer = combineReducers({
  apps: appReducer,
  games: gameReducer
})

export default reducer