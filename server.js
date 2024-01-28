const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const connectDB = require("./config/dbConnection")
const dotenv = require("dotenv").config()

connectDB()
const app = express()

const port = process.env.PORT

app.use(express.json())
app.use("/api/contact",require("./routes/contaceroutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`app running on port ${port}.....`)
})