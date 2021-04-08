const net = require('net');
//const stdin = process.stdin;

//We need to specify the address and the port to connect to
const client = net.createConnection({
  host: 'localhost',
  port: 3000
});

// We need the encoding to tell the server and the client what kind of data are we transfering
client.setEncoding('utf8');

// Message to server when I, the client connect
client.on('connect', function() {
  client.write('./index.html');
});

// Message from server
client.on('data', (data) => {
  console.log('Server says: ', data);
});