// Very simple chat server using nodes net module
// Use telnet or nc to connect (telnet ipaddressOfServer 8000)

let net = require('net');

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
