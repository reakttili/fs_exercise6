import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import { actionFor as anecdoteActionFor } from './reducers/anecdoteReducer'
import PropTypes from 'prop-types'

// const initializeAnecdotes = (store) => {
//   anecdoteService
//     .getAll()
//     .then(anecdotes => {
//       anecdotes.forEach(dote => {
//         console.log(dote)
//         store.dispatch(anecdoteActionFor.anecdoteCreation(dote.content))
//       })
//     })
// }

class App extends React.Component {
  componentDidMount = () => {
    this.props.initializeAnecdotes()
  }
  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Filter />
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  initializeAnecdotes: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  initializeAnecdotes: anecdoteActionFor.initializeAnecdotes
}

export default connect(null,mapDispatchToProps)(App)