const express = require('express')
const app = express()
const { find, split, head, last, filter, pathOr } = require('ramda')

const todos = [
  { text: 'party hardy', completed: true, id: 1 },
  { text: 'write code', completed: false, id: 2 },
  { text: 'eat dinner', completed: false, id: 3 }
]

function getToDo(id) {
  return find(todo => todo.id === Number(id), todos)
}

app.get('/', (req, res) => res.send('GET to the home/ route'))

app.get('/todos', (req, res) => {
  // req.query => {search: text:party}
  //req.query.search = 'text:party'
  //searchProperty = head(split(':', 'text:party')) =>'text'
  //searchCriteria = last(split(':', 'text:party')) =>'party'
  console.log('query:', req.query)

  const isQuery = pathOr(false, ['query', 'search'], req)

  if (isQuery) {
    const searchProperty = head(split(':', req.query.search)) // =>'text'
    const searchCriteria = last(split(':', req.query.search)) // =>'party'
    const searchResults = filter(
      todo => todo[searchProperty].indexOf(searchCriteria) > -1,
      todos
    )

    res.send(searchResults)
  } else res.send(todos)

  const searchProperty = head(split(':', req.query.search)) // =>'text'
  const searchCriteria = last(split(':', req.query.search)) // =>'party'
  const searchResults = filter(
    todo => todo[searchProperty].indexOf(searchCriteria) > -1,
    todos
  )

  res.send(searchResults)
  return
})

app.get('/todos/:todoID', (req, res) => res.send(getToDo(req.params.todoID)))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
