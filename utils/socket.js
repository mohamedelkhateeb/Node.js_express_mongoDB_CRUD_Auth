const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);

    socket.on('message', (msg) => {
      console.log('message: ' + msg);
      io.emit('message', msg);
    });
  });
};

module.exports = setupSocket;
