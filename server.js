const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const session = require('express-session')({
  secret: 'socket-secret',
  resave: true,
  saveUninitialized: true
});
const sharedsession = require('express-socket.io-session');
const PORT = process.env.PORT || 3000;

// Attach session to express
app.use(session);

// Share express session with socket.io
io.use(sharedsession(session));

io.on('connection', socket => {
  console.log('New socket id: ' + socket.id);
  // Accept a login event with user's data
  // socket.on('login', function(userdata) {
  //   socket.handshake.session.userdata = userdata;
  //   socket.handshake.session.save();
  // });
  // socket.on('logout', function(userdata) {
  //   if (socket.handshake.session.userdata) {
  //     delete socket.handshake.session.userdata;
  //     socket.handshake.session.save();
  //   }
  // });
});

// Serve static files
server.use(express.static('build'));

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
