import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import helmet from 'helmet'
import api from './api'
import path from 'path'

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(helmet())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '..', 'static')))
app.use('/api', api)

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('boiler plate!')
})

app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
