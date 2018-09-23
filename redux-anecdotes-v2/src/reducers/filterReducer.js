const reducer = (store = [] , action) => {
  if (action.type==='FILTER') {
    const anecdotesToFilter = action.data.anecdotes
    const word = action.data.word
    const compareFunction = (w) => (element, index, array) => {
      if (element.content.search(w)===-1) {
        return false
      } else {
        return true
      }
    }
    store = anecdotesToFilter.filter(compareFunction(word))
    return store
  }
  return store
}
const actionFor = {
  filterData(data) {
    return { type: 'FILTER', data }
  },
  setData(data) {
    return { type: 'SETDATA', data }
  }
}

export { reducer }
export { actionFor }