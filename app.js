const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My Websit</title></head>');
        res.write('<body><form action="/message" method="POST"><input name="anyName" type="text"/><button type="submit">Send</button></form</body');
        res.write('</html>');
        res.end();
    } else if (url === '/message' && method === 'POST'){ 
        const body = [];
        req.on('data', (chunkData) => {
            console.log(chunkData);
            body.push(chunkData);
        });

        req.on('end', (data) => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                console.log(err);
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
        })        
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