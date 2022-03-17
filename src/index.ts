import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import helmet from 'helmet'
import api from './api'

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(helmet()).use(morgan('dev')).use('/api', api)

app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
