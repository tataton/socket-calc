const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let calcArray = [];

const PORT = process.env.PORT || 3000;

io.on('connection', socket => {
  socket.emit('report', calcArray);
  socket.on('calculation', calcObject => {
    calcArray = [calcObject, ...calcArray.slice(0, 9)];
    io.emit('report', calcArray);
  });
});

// Serve static files
app.use('/', express.static('client'));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Catch-all handler for any initial request that doesn't
// match one above; send to home route.
app.get('*', (_, res) => {
  res.redirect('/');
});

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
