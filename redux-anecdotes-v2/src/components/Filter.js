import React from 'react'
import PropTypes from 'prop-types'
import { actionFor as actionForFilter } from './../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  handleChange = (event) => {
    //const anecdotes = this.props.store.getState().anecdotes
    const anecdotes = this.props.anecdotes
    const word = event.target.value
    //this.props.store.dispatch(actionForFilter.filterData( { anecdotes, word }))
    this.props.filterData( { anecdotes, word } )
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

Filter.propTypes = {
  anecdotes: PropTypes.array.isRequired,
  filterData: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  filterData:actionForFilter.filterData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)