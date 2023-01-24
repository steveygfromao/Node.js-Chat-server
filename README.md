# TCP Chat Server
Node.js chat server.  Demonstrates very basic chat server over TCP/IP using net module in Node.js


# Introduction

Use telnet or nc to connect to the server ( telnet localhost 8000 )

Example demonstrates the unblocking nature of Node.js - remember, Node.js runs on a single thread, so each client when connects to the chat server, no other threads are created - does give the impression there are, but nope, all this is asynchronous.

The code is very simple, we listen on port 8000, when a connection is made the on event is fired, we store the socket in an array and then send the data out to all connections (all the sockets in the array).  When somebody disconnects, the end event is fired, we just remove the socket then as this will be a dead socket.


# Usage

`node server.js`

Bring in net module to use

```javascript
let net = require('net');
```

Then the rest of the code is pretty straightforward:

```javascript
let sockets = [];

let server = net.createServer(function(socket){
    sockets.push(socket);

    socket.write("Hello there\r\n");
    
    socket.on('data', function(d) {
        sockets.forEach(s=>{
      //      if(s === socket) continue;    // <--- to stop echoing back to client that has same IP as this server
              s.write(d);
        });
    });

    socket.on('end',function() {
        sockets.splice(i,sockets.indexOf(socket));
    });
});

console.log("Listening on port 8000");
server.listen(8000);

```



