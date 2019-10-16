const http = require('http')
const { PORT = 3000 } = process.env

http
  .createServer((req, res) => {
    res.end(`Hello Up from PORT: ${PORT}`)
  })
  .listen(PORT)
