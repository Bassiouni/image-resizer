import express from 'express'
import { handleImagesEndpoint } from './utils'

const api = express.Router()

api.get('/images', handleImagesEndpoint)

export default api
