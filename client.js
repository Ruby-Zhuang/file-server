const net = require('net');
const readline = require('readline');

// Function to ask client user to enter a filename
const askForFile = () => {
  //CREATE READLINE.INTERFACE INSTANCE TO READ DATA FROM A READABLE STREAM
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter file name: ', (answer) => {
    client.write(`./${answer}`);
    rl.close();       // STREAM DOESN'T CLOSE?!
  });
};

// Specify the address and the port to connect to
const client = net.createConnection({
  host: 'localhost',
  port: 3000
});

// Set encoding to tell the server and the client what kind of data are we transfering
client.setEncoding('utf8');

// Message from server
client.on('data', (data) => {
  console.log('Server says: ', data);
  if (data.includes('What file are you looking for?')) askForFile();
});

// Message to server when I, the client connect
client.on('connect', function() {
  console.log('I have connected!');
});
