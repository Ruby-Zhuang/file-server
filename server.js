// REQUIRE LIBRARY & MODULES
const net = require('net');
const fs = require("fs");
//const stdin = process.stdin;

const server = net.createServer();

// When someone connects
server.on('connection', (client) => {
  //Set encoding just like on the client
  client.setEncoding('utf8');

  // Message to client
  client.write('Hello there! \n');
  client.write('What file are you looking for?');

  // When one of the connections sends data and we recieve it
  client.on('data', (data) => {
    console.log("Connected user says:", data);

    // Attempt to look for requested file (data) locally and sends back the content
    fs.readFile(data, 'utf8', (error, content) => {
      if (error) {
        client.write('File does not exist!');
      } else {
        client.write(content);
      }
    });
  });

  console.log("someone has connected");
});


server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});