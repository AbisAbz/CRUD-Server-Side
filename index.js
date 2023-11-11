const express = require('express')
const app = express()
const  cors = require('cors')


const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/crudReact')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:['http://localhost:3001'],
    methods:['GET,POST'],
    credentials:true
}))
const UserRouter = require('./Routes/UserRoutes')
const AdminRouter = require('./Routes/AdminRoutes')



app.use('/',UserRouter)
app.use('/admin',AdminRouter)




app.listen(4000,() => {
    console.log("server is running  4000");   
})



