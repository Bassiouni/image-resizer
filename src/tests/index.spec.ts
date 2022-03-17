import { Response } from 'superagent'
import supertest from 'supertest'
import fs from 'fs'
import path from 'path'
import imageSize from 'image-size'

import app from '../index'
import { imagesDir, outDir } from '../globals'
import { transformImage } from '../api/utils'

const request = supertest(app)
const filename = 'palmtunnel'
const testWidth = 100
const testHeight = 50
const testThumbFilePath = path.join(
  outDir,
  `${filename}_${testWidth}_${testHeight}.jpg`
)
const testFilePath = path.join(imagesDir, `${filename}.jpg`)

let response: Response

fs.mkdirSync(outDir, { recursive: true })

it('Tests the transformImage() function not to throw', () => {
  expect(async () => {
    await transformImage(testFilePath, testWidth, testHeight, testThumbFilePath)
  }).not.toThrow()
})

describe('Test image endpoint response', () => {
  beforeAll(async () => {
    response = await request.get(
      `/api/images?filename=${filename}&width=${testWidth}&height=${testHeight}`
    )
  })

  it('/api/image status code 200', async () => {
    expect(response.status).toEqual(200)
  })

  it('/api/image response type jpg', () => {
    expect(response.type).toEqual('image/jpg')
  })

  it('checking existance for the generated file', () => {
    expect(fs.existsSync(testThumbFilePath)).toBeTrue()
  })

  it('check for the dimentons', () => {
    imageSize(testThumbFilePath, (_err, dim) => {
      expect(dim?.width).toEqual(testWidth)
      expect(dim?.height).toEqual(testHeight)
    })
  })

  afterAll(() => {
    fs.rmSync(testThumbFilePath)
  })
})

describe('Testing flasy API calls | sends an invalid negative number as width', () => {
  beforeAll(async () => {
    response = await request.get(
      `/api/images?filename=${filename}&width=${-testWidth}&height=${testHeight}`
    )
  })

  it('checks for 400 status response', () => {
    expect(response.status).toEqual(400)
  })

  it('Checks for "Invalid Dimentions!" response message', () => {
    expect(response.text).toEqual('Invalid Dimentions!')
  })
})

describe('Testing flasy API calls | sends an invalid negative number as height', () => {
  beforeAll(async () => {
    response = await request.get(
      `/api/images?filename=${filename}&width=${testWidth}&height=${-testHeight}`
    )
  })

  it('checks for 400 status response', () => {
    expect(response.status).toEqual(400)
  })

  it('Checks for "Invalid Dimentions!" response message', () => {
    expect(response.text).toEqual('Invalid Dimentions!')
  })
})

describe('Testing flasy API calls | sends invalid negative numbers as dimentions', () => {
  beforeAll(async () => {
    response = await request.get(
      `/api/images?filename=${filename}&width=${-testWidth}&height=${-testHeight}`
    )
  })

  it('checks for 400 status response', () => {
    expect(response.status).toEqual(400)
  })

  it('Checks for "Invalid Dimentions!" response message', () => {
    expect(response.text).toEqual('Invalid Dimentions!')
  })
})
