import sharp from 'sharp'

export async function transformImage(
  imageFile: string,
  width: number,
  height: number,
  outFile: string
): Promise<void> {
  await sharp(imageFile).resize(width, height).toFile(outFile)
}
