## SocketCalc

(_hosted at https://cryptic-ridge-29866.herokuapp.com/_)

Code Challenge submission to Sezzle, September 26th, 2018. Simple calculator app, with a few twists:

- Displays sequential operation input, and then uses standard operator priority to compute the answer.
- Capable of evaluating expressions of any magnitude (beyond limits of standard JS). (Credit to [MikeMcl/big.js](https://github.com/MikeMcl/big.js/))
- Completed calculations are recorded by a Node/Express server, and shared in real-time (via [socket.io](https://socket.io/)) with other calculator users.
