const express = require('express')
const connectDB = require('./config/db_config')
const router = require('./routes/userRoutes')
const {errorHandler} = require('./middileware/errorHandler')
require('dotenv').config()
const cors = require('cors')
const app = express()
const PORT = process.env.PORT

///////// DB Connection/////
connectDB()

////////MIDDILEWARE////////////
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send("Welcome to support desk")
})


//////Register User///////////
app.use('/api/user', router)

///ticket route////////
app.use('/api/ticket', require('./routes/ticketRoutes'))


app.use(errorHandler)

app.use(cors())

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})