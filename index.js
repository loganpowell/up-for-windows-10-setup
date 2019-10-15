const http = require('http')
const { PORT = 3000 } = process.env

http.createServer((req, res) => {
  res.end('Hello butthole from Node.js\n')
}).listen(PORT)
