import { Response } from 'superagent'
import supertest from 'supertest'
import fs from 'fs'
import path from 'path'
import imageSize from 'image-size'

import app from '../index'
import { outDir } from '../globals'

const request = supertest(app)
const filename = 'fjord'
const width = 100
const height = 50
const outFile = path.join(outDir, `${filename}_${width}_${height}.jpg`)

let response: Response

describe('Test image endpoint response', () => {
  beforeAll(async () => {
    response = await request.get(
      `/api/images?filename=${filename}&width=${width}&height=${height}`
    )
  })

  it('/api/image status code 200', async () => {
    expect(response.status).toEqual(200)
  })

  it('/api/image response type jpg', () => {
    expect(response.type).toEqual('image/jpg')
  })

  it('checking existance for the generated file', () => {
    expect(fs.existsSync(outFile)).toBeTrue()
  })

  it('check for the dimentons', () => {
    imageSize(outFile, (_err, dim) => {
      expect(dim?.width).toEqual(width)
      expect(dim?.height).toEqual(height)
    })
  })

  afterAll(() => {
    fs.rmSync(outFile)
  })
})
