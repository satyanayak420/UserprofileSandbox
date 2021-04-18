import express from 'express'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './Middleware/errorMiddleware.js'

connectDB()
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running.....')
})
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server running  in development mode on port ${PORT}`)
)
