const dotenv = require('dotenv');
dotenv.config()


const express = require('express')

const DB_Connection = require('./config/dbConfig')
const app = express()

DB_Connection()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    return res.status(200).json({data:'Server running sucessfully', error:false,status:200})
})


app.use('/teamAuth',require('./routes/teamAuth'))
app.use('/team',require('./routes/team'))
app.use('/userAuth',require('./routes/userAuth'))
app.use('/user',require('./routes/user'))
app.use('/captainAuth',require('./routes/captianAuth'))
app.use('/captain',require('./routes/captain'))



const port = 5000 
app.listen(port,()=>{
    console.log('Hazir Srever is running '+ port)
})