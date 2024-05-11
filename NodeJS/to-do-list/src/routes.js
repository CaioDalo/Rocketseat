import { randomUUID } from "node:crypto"
import { Database } from "./database.js"
import { buildRoutePath } from "../utils/build-route-path.js"

const database = new Database

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks")
      return res.writeHead(200).end(JSON.stringify(tasks))
    }
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body

      const newTask = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: ''
      }

      database.insert("tasks", newTask)
      return res.writeHead(201).end(JSON.stringify(newTask))
    }
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      database.update('tasks', id, {title, description, updated_at: new Date()})

      return res.writeHead(201).end()
    }
  },

  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params

      database.complete('tasks', id)

      return res.writeHead(201).end()
    }
  }
]