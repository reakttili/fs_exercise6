import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const create = async (anecdoteStr) => {
  const anecdote = { content: anecdoteStr, votes:0 }
  const response = await axios.post('http://localhost:3001/anecdotes',anecdote)
  return response.data
}

const vote = async (anecdote) => {
  //const anecdote = { content: anecdoteStr, votes:0 }
  const url = `http://localhost:3001/anecdotes/${anecdote.id}`
  const updated = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(url,updated)
  return response.data
}

export default { getAll , vote, create }

// console.log("@PUT")
//   const person = {
//     name: request.body.name,
//     number: request.body.number
//   }
//   Person
//   .findByIdAndUpdate(request.params.id, person, { new: true } )
//   .then(upPerson => {
//     response.json(Person.formatPerson(upPerson))
//   })
//   .catch(error => {
//     console.log(error)
//     response.status(400).send({ error: 'malformatted id' })
//   })
  