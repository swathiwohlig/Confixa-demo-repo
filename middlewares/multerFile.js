const multer = require('multer')
const archiver = require('archiver')

// Multer setup
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const multerFileData = (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'Multer error' })
    } else if (err) {
      return res.status(500).json({ error: 'Internal server error' })
    }
    next()
  })
}

const multerImageData = (fields) => {
  const multerFields = fields.map((field) => ({ name: field, maxCount: 1 }))
  return (req, res, next) => {
    upload.fields(multerFields)(req, res, function (err) {
      console.log('err 23 :: ', err)
      if (err) {
        console.log('25 ::')
        return res
          .status(400)
          .json({ error: 'Multer error', details: err.message })
      }
      next()
    })
  }
}

const zipImagedata = (req, res, next) => {
  console.log('req.files:: ', req.files)
  const formFiles = req.files ? req.files.files : undefined

  if (!formFiles) {
    return res.status(400).json({ error: 'No files provided' })
  }

  // Create a zip file in memory
  const archive = archiver('zip', { zlib: { level: 9 } })
  archive.on('error', (err) => {
    return res.status(500).json({ error: 'Internal server error', err })
  })

  for (const field of Object.keys(formFiles)) {
    const file = formFiles[field]
    const fileName = file.originalname.split('.')[0]
    const fileExtension = file.originalname.split('.')[1]
    archive.append(file.buffer, {
      name: `${fileName}_${Date.now()}.${fileExtension}`
    })
  }

  // Finalize the archive
  archive.finalize()

  // Attach the zip file to the request object
  req.zipBuffer = archive

  next()
}

module.exports = {
  multerFileData,
  multerImageData,
  zipImagedata
}

module.exports = {
  multerFileData,
  multerImageData,
  zipImagedata
}
