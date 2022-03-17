import express from 'express'
import { handleImagesEndpoint } from './utils'

const api = express.Router()

api.use('/images', handleImagesEndpoint)

export default api
