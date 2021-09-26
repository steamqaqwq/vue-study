const express = require('express')
const history = require('connect-history-api-fallback')

const app = express()
app.use(history())
app.use(express.static(__dirname+'/static'))
app.get('/person',(req,res)=>{
    res.send({
        name:'hhh',
        age:98
    })
})
app.listen(5001,(err)=>{
    if(!err)console.log('5001服务器启动成功')
})