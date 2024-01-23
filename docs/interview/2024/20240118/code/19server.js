
const net = require('net')
const server = net.createServer(socket =>{
  console.log('socket 连接');
  socket.on('close',()=>{
    console.log('socket 关闭');
  })
  socket.on('data',data=>{
    console.log(`接收到：${data}`);
    socket.write(data)
    console.log(`发送1：${data}`);
  })
  socket.on('error',err=>{
    console.log('err',err);
  })
})
server.listen(8888)