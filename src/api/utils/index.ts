import path from 'path'
import sharp from 'sharp'
import { imagesDir, outDir } from '../../globals'
import express from 'express'
import { promises as fs } from 'fs'

export async function handleImagesEndpoint(
  req: express.Request,
  res: express.Response
) {
  const filename = req.query.filename as string
  const { width: pwidth, height: pheight } = req.query

  const width = +parseInt(pwidth as string)
  const height = +parseInt(pheight as string)

  const imageFile = path.join(imagesDir, `${filename}.jpg`)

  const outFile = path.join(outDir, `${filename}_${width}_${height}.jpg`)

  try {
    await fs.access(outDir)
    await fs.mkdir(outDir, { recursive: true })
  } catch (err) {
    res.status(403).json({
      msg: `OS ERR: Can't access ${outDir}`,
      err,
    })
    return
  }

  const found =
    `${filename}_${width}_${height}.jpg` in (await fs.readdir(outDir))

  try {
    await fs.access(imageFile)
  } catch {
    res.status(403).json(`OS ERR: Can't access ${imageFile}`)
    return
  }

  if (!found) {
    try {
      await sharp(imageFile).resize(width, height).toFile(outFile)
    } catch (err) {
      res.status(403).json({
        msg: 'could not process image',
        err,
      })
      return
    }
  }

  res.status(200).type('image/jpg').sendFile(outFile)
}
