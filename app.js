const http = require('http')
const { PORT = 3000 } = process.env

http
  .createServer((req, res) => {
    res.end(`Hello Up fromcd  PORT: ${PORT}`)
  })
  .listen(PORT)
