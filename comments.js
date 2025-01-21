//create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const comments = require('./comments');
const PORT = 3000;
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const pathname = parsedUrl.pathname;
    if (req.method === 'GET') {
        if (pathname === '/comments') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(comments));
        } else {
            fs.readFile(path.join(__dirname, 'public', pathname), 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Not Found');
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.end(data);
                }
            });
        }
    } else if (req.method === 'POST') {
        if (pathname === '/comments') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                const newComment = JSON.parse(body);
                comments.push(newComment);
                res.writeHead(201, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(newComment));
            });
        } else {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.end('Not Found');
        }
    } else {
        res.writeHead(405, {
            'Content-Type': 'text/plain'
        });
        res.end('Method Not Allowed');
    }
});
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});