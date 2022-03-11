import express, { Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(morgan('short'))

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍',
  })
})

app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app
