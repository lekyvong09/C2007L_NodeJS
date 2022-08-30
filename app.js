const http = require('http');
const routes = require('./route');

const server = http.createServer((req, res) => {
    routes.handler(req, res);
});


server.listen(3001);