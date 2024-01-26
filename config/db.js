const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.url).then(()=>{
    console.log('connected to database successfully')
}).catch((error)=>{
    console.log(error.message)
})