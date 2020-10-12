const multer = require('multer')
const fs = require('fs')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,__dirname + '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.'+file.originalname.split('.').slice(-1)[0])
    }
  })  
module.exports = multer({ storage: storage })