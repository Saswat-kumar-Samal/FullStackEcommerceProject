import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/coudinary.js";
import userRouter from "./routes/userRoute.js";

/* app configs*/
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

/* middlewares */
app.use(express.json())
app.use(cors())

/* API end-points */

app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('API working fine')
})

app.listen(port, () => {console.log(`Server started on port ${port}`)})