import http from "node:http"

const users = []

const server = http.createServer((req, res) => {
  const {method, url} = req

  if(method === "GET" && url === "/users") {
    return res
      .setHeader("content-type", "application/json")
      .writeHead(200)
      .end(JSON.stringify(users))
  }

  if(method === 'POST' && url === "/users") {
    users.push({
      name: "John Doe",
      email: "johndoe@example.com"
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end("Not found")
})

server.listen(3333, () => {
  console.log("Server is running 🚀")
})