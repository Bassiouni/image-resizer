import express from 'express'
import fs, { promises as fsp } from 'fs'
import sharp from 'sharp'
import path from 'path'

const api = express.Router()

api.get('/images', async (req, res) => {
  // const settingsFile = path.resolve('storage', 'settings.json')
  // const data = JSON.parse((await fs.readFile(settingsFile)).toString())

  const filename = req.query.filename as string
  const { width: pwidth, height: pheight } = req.query

  const width = parseInt(pwidth as string)
  const height = parseInt(pheight as string)

  const outFile = path.resolve(
    'storage',
    'thumbs',
    `${filename}_${width}_${height}.jpg`
  )

  await fsp.mkdir(path.resolve('storage', 'thumbs'), { recursive: true })
  const found =
    `${filename}_${width}_${height}.jpg` in
    fs.readdirSync(path.resolve('storage', 'thumbs'))

  if (!found) {
    await sharp(path.resolve('storage', 'images', `${filename}.jpg`))
      .resize(width, height)
      .toFile(outFile)
  }

  console.log('sending')
  res.type('image/jpg').sendFile(outFile)
  console.log('agter sending', outFile)
})

export default api
