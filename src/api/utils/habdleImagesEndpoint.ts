import path from 'path'
import { imagesDir, outDir } from '../../globals'
import express from 'express'
import { promises as fs } from 'fs'
import { transformImage } from '.'

export async function handleImagesEndpoint(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const filename = req.query.filename as string
  const { width: pwidth, height: pheight } = req.query

  const width = parseInt(pwidth as string)
  const height = parseInt(pheight as string)

  if (height <= 0 || !height || width <= 0 || !width) {
    res.status(400).send('Invalid Dimentions!')
    return
  }
  const imageFile = path.join(imagesDir, `${filename}.jpg`)

  const outFile = path.join(outDir, `${filename}_${width}_${height}.jpg`)

  try {
    await fs.access(outDir)
    await fs.mkdir(outDir, { recursive: true })
  } catch {
    res.status(500).send(`OS ERR: Can't create ${outDir}`)
    return
  }

  const found =
    `${filename}_${width}_${height}.jpg` in (await fs.readdir(outDir))

  try {
    await fs.access(imageFile)
  } catch {
    res.status(500).send(`OS ERR: Can't access ${imageFile}`)
    return
  }

  if (!found) {
    try {
      await transformImage(imageFile, width, height, outFile)
    } catch {
      res.status(500).send('OS ERR: Can not resize image')
      return
    }
  }

  res.status(200).type('image/jpg').sendFile(outFile)
}
