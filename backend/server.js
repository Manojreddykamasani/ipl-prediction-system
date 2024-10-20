const morgan = require('morgan')
const express= require('express')
const mongoose= require('mongoose')
mongoose.connect('mongodb://localhost:27017/ipldata')
const db= mongoose.connection
const app = express()
const PORT = process.env.PORT || 3000
db.on('error',(err)=>{
    console.log("error connecting to the database")
})
db.once('open',()=>{
    console.log("database connected succesfully")
})

app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.listen(PORT,()=>{
    console.log("server is running on the port")
})

