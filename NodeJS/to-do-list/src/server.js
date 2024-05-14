import http from "node:http"
import { json } from '../middleware/json.js'
import { routes } from "./routes.js"
import { extractQueryParams } from "../utils/extract-quert-params.js"
import { Transform } from 'node:stream'

import { parseCSV } from "../utils/cvs.js"

class ParseCSVStream extends Transform {
  _transform(chunk, encoding, callback) {

    const parsed = parseCSV(chunk)

    callback(null, Buffer.from(String(parsed)))
  }
}

const server = http.createServer(async (req, res) => {
  const { method, url} = req

  await json(req, res)
  
  console.log(new multipart.parser(req))
  req
  .pipe(new ParseCSVStream())
/* 
  const fullFilledStreamContent = Buffer.concat(buffers).toString() */

  /* const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })


  if(route) {
    const routeParams = req.url.match(route.path)

    const {query, ...params} = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  } */
})

server.listen(3333, () => {
  console.log('Server is running 🚀')
})