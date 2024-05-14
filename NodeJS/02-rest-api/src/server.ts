import fastify from "fastify"

const app = fastify()

app.get('/', async () => {
  return 'Hello World'
})

app.listen({port: 3333}, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`Server is running on ${address}`)
})