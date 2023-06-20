const express  = require('express')
const app = express()
const port = 1010
app.get('/',(req,res)=>{
    res.send('Hello world!')
})  
app.post('/',(req,res)=>{
    res.send('Got a POST request!')
})
app.listen(port,()=>{
    console.log(`Example has already runned on ${port}`);
})
app.use(express.static('public'))
app.use('/static', express.static('public'))