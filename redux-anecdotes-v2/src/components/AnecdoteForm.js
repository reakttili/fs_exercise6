import React from 'react'
import PropTypes from 'prop-types'
import { actionFor } from './../reducers/anecdoteReducer'
import { actionFor as actionForNotification } from './../reducers/notificationReducer'
import { actionFor as actionForFilter } from './../reducers/filterReducer'
import { connect } from 'react-redux'
import anecdoteService from './../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const anecdoteStr = e.target.anecdote.value
    //this.props.store.dispatch(actionFor.anecdoteCreation(content))
    //return [...store, { content: action.content, id: getId(), votes:0 }]
    this.props.createAnecdote(anecdoteStr)
    //this.props.store.dispatch(actionForNotification.show())
    this.props.show()
    e.target.anecdote.value= ''
    //e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

AnecdoteForm.propTypes = {
  createAnecdote: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  createAnecdote: actionFor.anecdoteCreation,
  show: actionForNotification.show
}


export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
