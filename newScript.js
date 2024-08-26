const https = require('node:https') ;


const server = https.createServer((req, res) => {
    res.end('hello world\n');
  });
  
  
  server.listen(3000);


