import fastify from "fastify"
import { knex } from "./database"

const app = fastify()

app.get('/hello', async () => {
  const tables = await knex("sqlite_schema").select('*')
  return tables
})

app.listen({port: 3333}, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`Server is running on ${address}`)
})