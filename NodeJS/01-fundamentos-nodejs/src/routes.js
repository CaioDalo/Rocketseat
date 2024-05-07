import { randomUUID } from "node:crypto"
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const users = database.select("users")
      return res.writeHead(200).end(JSON.stringify(users))
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body
      const newUser = {id: randomUUID(), name, email}
      const saveNewUser = database.insert('users', newUser)
      return res.writeHead(201).end(JSON.stringify(saveNewUser))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      database.delete('users', id)
      return res.writeHead(204).end()
    }
  }
]