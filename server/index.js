const server = require('./app');
const PORT = process.env.PORT || 8080;

server.listen(PORT,'0.0.0.0',() => console.log('server is listening on port 8080'));
