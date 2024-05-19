import fastify from "fastify"
import { env } from "./env"
import { transactionsRoutes } from "./routes/transactions"


const app = fastify()

app.register(transactionsRoutes, {
  prefix: 'transactions'
})

app.listen({port: env.PORT}, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`Server is running on ${address}`)
})