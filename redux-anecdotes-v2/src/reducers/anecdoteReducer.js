import anecdoteService from './../services/anecdotes'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000*Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

//const initialState = anecdotesAtStart.map(asObject)

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.anecdote.id)
    return [...old, action.anecdote ]
  }
  if (action.type === 'CREATE') {
    //return [...store, { content: action.content, id: getId(), votes:0 }]
    console.log(action.content)
    return [...store, action.content]
  }
  if (action.type === 'INITIALIZE') {
    store = action.data
    return store
  }

  return store
}

const actionFor = {
  anecdoteCreation(content) {
    return async (dispatch) => {
      const anecdoteStr = content
      const anecdote = await anecdoteService.create(anecdoteStr)
      return dispatch({
        type: 'CREATE',
        content:anecdote
      })
    }
  },
  voting(anecdote) {
    return async (dispatch) => {
      const voted = await anecdoteService.vote(anecdote)
      dispatch({
        type: 'VOTE',
        anecdote:voted }
      )}
  },
  initializeAnecdotes() {
    
    return async (dispatch) => {
      const anecdotes = await anecdoteService.getAll()
      console.log('dootit', anecdotes)
      dispatch({
        type: 'INITIALIZE',
        data: anecdotes
      })
    }
  }
}

export { reducer }
export { actionFor }