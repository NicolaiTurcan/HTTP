const http = require("http");
const fs = require('fs');

const host = 'localhost';
const port = 5000;

const requestListener = (req, res) => {
   if (req.url === '/get' && req.method === 'GET') {
       try {
        let filesName = fs.readdirSync('files');
        res.writeHead(200);
        res.end(filesName.join(',')); 
       } catch (err) {
           res.writeHead(500);
           res.end('Internal server error');
       }       
   } else if (req.url === '/delete' && req.method === 'DELETE') {
       res.writeHead(200);
       res.end('Succes');
   } else if (req.url === '/post' && req.method === 'POST') {
       res.writeHead(200);
       res.end('Succes');
   } else if (req.url === '/redirect' && req.method === 'GET') {
       res.writeHead(307, {
           Location: '/redirected'
       }).end(); 
   } else if (req.url === '/redirected' && req.method === 'GET') {
       res.writeHead(200);
       res.end('you have been redirected');
   } else if (req.url === '/delete' || req.url === '/post' || req.url === '/delete' || req.url === '/redirect' || req.url === '/redirected') {
       res.writeHead(405);
       res.end('HTTP method not allowed');
   } else {
       res.writeHead(404);
       res.end('Page not found');
   }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});