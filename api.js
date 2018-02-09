const express = require('express')
const app = express()
const { find } = require('ramda')

const todos = [
  { text: 'party hardy', completed: true, id: 1 },
  { text: 'write code', completed: false, id: 2 },
  { text: 'eat dinner', completed: false, id: 3 }
]

function getToDo(id) {
  return find(todo => todo.id === Number(id), todos)
}

app.get('/', (req, res) => res.send('GET to the home/ route'))

app.get('/todos', (req, res) => res.send(todos))

app.get('/todos/:todoID', (req, res) => res.send(getToDo(req.params.todoID)))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
