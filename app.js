const http = require('http')

const port = process.env.port || 8000;

const response = require('./respond.js');

const server = http.createServer(response.respond);

server.listen(port,()=>console.log(`${port} listening to the port`))