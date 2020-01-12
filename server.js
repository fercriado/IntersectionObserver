const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);

    if (req.url === '/') {
        res.writeHead(301, {'Location': '/index.html'});
        res.end();
    } else {
        //res.sendFile('/personas.json'); // valid with express
        fs.readFile(path.join(__dirname, 'public', req.url.substring(1)), (err, data) => {
            if (err) {
                console.log(err);
                res.end();
            } else {
                console.log(data.toString());
                var type;
                if (req.url.endsWith('.json'))
                    type = 'application/json';
                else if (req.url.endsWith('.ico'))
                    type = 'image/x-icon';
                else if (req.url.endsWith('.css'))
                    type = 'text/css';
                else
                    type = 'text/html';
                res.writeHead(200, { 'Content-Type': type });
                res.write(data);
                res.end();
            }
        });
    }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
