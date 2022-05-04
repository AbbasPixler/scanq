const util = require('util')
const gc = require('./../config/config')
const bucket = gc.bucket('snackyo') // should be your bucket name

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file) => new Promise((resolve, reject) => {
  const { nameWithStamp, buffer } = file
//console.log("File: ", JSON.stringify(file.originalname, null, 4))
  const blob = bucket.file(nameWithStamp.replace(/ /g, "_"))
  const blobStream = blob.createWriteStream({
    resumable: false
  })
  blobStream.on('finish', () => {
    const publicUrl = util.format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    //console.log(publicUrl)
    resolve(publicUrl)
    //return publicUrl
  })
  .on('error', () => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
})

module.exports = uploadImage