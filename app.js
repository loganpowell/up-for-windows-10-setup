const http = require('http')
const { PORT = 3000 } = process.env

http
  .createServer((req, res) => {
    res.end(`Hello SOMETHING AGAIN from Node.js\n PORT: ${PORT}`)
  })
  .listen(PORT)
