import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as anecdoteReducer } from './reducers/anecdoteReducer'
import { reducer as notificationReducer } from './reducers/notificationReducer'
import { reducer as filterReducer } from './reducers/filterReducer'
import { connect } from 'react-redux'
import thunk from 'redux-thunk'

const combinedReducer = combineReducers( {
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer })
// const store = createStore(combinedReducer)
const store = createStore(
  combinedReducer,
  applyMiddleware(thunk)
)


export default store