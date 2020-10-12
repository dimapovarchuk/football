var mongoose = require('mongoose');
var Stadions = mongoose.model('Stadions');

const fs = require('fs')

const path = require('path');
const directory = path.join(__dirname, '../uploaders/tmp/my-uploads');
const dest = path.join(__dirname, '../../uploads/stadions');
function clearTmpUploads () {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
}

exports.create = (req, res) => {
  var stadions = new Stadions(req.body);
  if(req.file){
    req.body.photo = '/uploads/stadions/' + req.file.filename
  }
  stadions.save(function (err) {

    fs.copyFile(req.file.path, path.join(dest, req.file.filename), (err) => {
      if (err) throw err;
      console.log('was copied');
      clearTmpUploads()
    });
    res.json(stadions)
    // saved!
  });
}

exports.show = (req, res) => {
let vendor = req.params.vendor
stadions.findOne({vendor: vendor}, (err, item) => {
    if (err) {
    res.status(500).json(err).end()
    }
    res.json(item)
})
}

exports.list = (req, res) => {
  Stadions.find({},(err, items) => {
      if( err ) {
        res.status(500).json(err).end()
      }
      res.json(items)
    })
  }
exports.delete = (req, res) => {
  Stadions.findOneAndRemove({_id: req.params.id}, function (err, data) {
    if (err) {
      return res.json(err)
    }
    fs.unlink(path.join(__dirname, '../../', data.photo), function (err, data) {
      console.log(err, data)
    })
    res.json(data)
  })
}

exports.update = (req, res) => {
  console.log(req.body);
  if (req.file) {
    req.body.photo = '/uploads/stadions/' + req.file.filename
  }
  Stadions.findOneAndUpdate({_id: req.params.id}, req.body, function (err, data) {
    if (err) {
      return res.json(err)
    }
    if (req.file) {
      fs.copyFile(req.file.path, path.join(dest, req.file.filename), (err) => {
        if (err) throw err;
        console.log('was copied');
        clearTmpUploads()
      });
      fs.unlink(path.join(__dirname, '../../', data.photo), function (err, data) {
        console.log(err, data)
      })
    }
    res.json(data)
  })
}