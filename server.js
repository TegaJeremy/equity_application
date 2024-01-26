const express = require('express')
const app = express()
const PORT = 4194
app.use(express.json())

const db = require('./config/db')
const cors = require("cors")
const router = require('./routers/userRouter')
app.use(cors({origin:"*"}));
app.use(router)


app.listen(PORT, ()=>{
    console.log(`app is listening to ${PORT}`)
})