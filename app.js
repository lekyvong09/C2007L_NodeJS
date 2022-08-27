const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/post') {
        res.write('<html>');
        res.write('<head><title>My Websit</title></head>');
        res.write('<body><form action="/message" method="POST"><input name="anyName" type="text"/><button type="submit">Send</button></form</body');
        res.write('</html>');
        res.end();
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My Websit</title></head>');
        res.write('<body><h1>Hello World</h1></body');
        res.write('</html>');
        res.end();
    }
    
});

server.listen(3001);