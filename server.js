const dotenv = require('dotenv');
const express = require('express')


dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    return res.status(200).json({data:'Server running sucessfully', error:false,status:200})
})

const port = 5000 
app.listen(port,()=>{
    console.log('Hazir Srever is running'+ port)
})