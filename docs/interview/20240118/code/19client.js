const net = require('net')
const client  = net.connect(8888,'192.168.84.135')
client.on('connect',()=>{
  console.log('客户端连接');
})
client.on('data',data=>{
  console.log(`客户端收到：${data}`);
})
client.on('end',()=>{
  console.log('客户端结束');
})
client.on('error',err=>{
  console.log('err',err);
})

setInterval(()=>{
  const msg = 'hello'
  console.log(`发送：${msg}`)
  client.write(msg)
},3000)