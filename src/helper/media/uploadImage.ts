import cloudinary from "@/config/cloudinaryConfig"

type UploadOptions = {
  folder: string
  resource_type?: 'image' | 'video' | 'auto'
  transformation?: any[]
}

export const uploadToCloudinary = async (buffer: Buffer,options: UploadOptions) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `QGenius/${options.folder}`,
        resource_type: options.resource_type || 'auto',
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )

    const { Readable } = require('stream')
    const stream = Readable.from(buffer)
    stream.pipe(uploadStream)
  })
}