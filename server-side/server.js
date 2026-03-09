import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import connectDB from "./config/mongodb.js";

/* app configs*/
const app = express()
const port = process.env.PORT || 4000
connectDB()

/* middlewares */
app.use(express.json())
app.use(cors())

/* API end-points */
app.get('/', (req, res) => {
    res.send('API working fine')
})

app.listen(port, () => {console.log(`Server started on port ${port}`)})