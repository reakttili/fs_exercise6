import React from 'react'
import PropTypes from 'prop-types'
import { actionFor } from './../reducers/anecdoteReducer'
import { actionFor as actionForNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from './../services/anecdotes'

const handleVote = (props, anecdote) =>
{
  const handler = async () => {
    props.vote(anecdote)
    //props.showNotification()
    props.notifyF(`you voted '${anecdote.content}'`, 1)
  }
  return handler
}

class AnecdoteList extends React.Component {
  render() {
    // let anecdotesToShow = this.props.anecdotes
    // if (this.props.filteredAnecdotes.length > 0) {
    //   anecdotesToShow = this.props.filteredAnecdotes
    // }
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={handleVote(this.props, anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

AnecdoteList.propTypes = {
  //filteredAnecdotes: PropTypes.array.isRequired,
  //anecdotes: PropTypes.array.isRequired,
  showNotification: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
  anecdotesToShow: PropTypes.array.isRequired
}

const anecdotesToShow = (state) => {
  let anecdotesToShow = state.anecdotes
  if (state.filter.length > 0) {
    anecdotesToShow = state.filter
  }
  return anecdotesToShow
}

// const mapStateToProps = (state) => {
//   return {
//     filteredAnecdotes: state.filter,
//     anecdotes: state.anecdotes
//   }
// }

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  notifyF: actionForNotification.notify,
  showNotification: actionForNotification.show,
  vote: actionFor.voting
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
