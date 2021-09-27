// imports
const express = require("express")
const cors = require("cors")


// initializition
const app = express()
require('dotenv').config()
const port = process.env.PORT || 1000

// middleweres
app.use(cors())
app.use(express.json())
app.use("/", require("./routers/auth"))
app.use("/", require("./routers/vacations"))








app.listen(port, ()=>console.log("rockin'" + port))