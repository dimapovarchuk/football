var mongoose = require('mongoose');
var Players = mongoose.model('Players');

const fs = require('fs')

const path = require('path');
const directory = path.join(__dirname, '../uploaders/tmp/my-uploads');
const dest = path.join(__dirname, '../../uploads/players');
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
function copyFile (source, filename) {
  fs.copyFile(source, path.join(__dirname,'../uploads/players', filename), (err) => {
      if (err) throw err;
      console.log('source.txt was copied to destination.txt');
  });
}
 function deleteUploaded (file) {
   fs.unlink(path.join(__dirname, dest, file), () => {
     console.log(123);
   })
 }
// function clearTmp (directory) {
//   fs.readdir(path.join(__dirname, directory), (err, files) => {
//     if (err) throw err;

//     for (const file of files) {
//       fs.unlink(path.join(__dirname, directory, file), err => {
//         if (err) throw err;
//       });
//     }
//   });
// }

function handleError(err, res) {
  clearTmpUploads('../uploaders/tmp/my-uploads')
  return res.status(422).send(err)
}

exports.create = (req, res) => {
  console.log(req.file);
  req.body.photo = req.file.filename
  var players = new Players(req.body);
  players.save(function (err) {
    if (err) {
      return res.status(422).json(err)
    }
    fs.copyFile(
      req.file.path,
      path.join(__dirname, '..', '..', 'uploads', 'players', req.file.filename),
      (err) => {
        if (err) throw err;
        console.log('file copy');
        fs.readdir(directory, (err, files) => {
          if (err) throw err;
          for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
              if (err) throw err;
            });
          }
        })
      });
    res.json(players)
    // saved!
  });
  // console.log(req.body);
  // console.log(req.files);
  // var filenames = req.files.map(x => {
  //   return x.filename
  // }).join(',')
  // console.log(filenames);
  // req.body.images = filenames
  // var team = new Team(req.body);
  // team.save(function (err, data) {

  //   if (err) return handleError(err, res);
  //   // saved!
  //   req.files.forEach(x => {
  //     copyFile(x.path, x.filename)
  //   })
  //   clearTmpUploads('../uploaders/tmp/my-uploads')
  //   res.json(data)
  // });
}

exports.show = (req, res) => {
let vendor = req.params.vendor
Players.findOne({vendor: vendor}, (err, item) => {
    if (err) {
    res.status(500).json(err).end()
    }
    res.json(item)
})
}

exports.list = (req, res) => {
    Players.find({},(err, items) => {
      if( err ) {
        res.status(500).json(err).end()
      }
      res.json(items)
    })
  }
exports.delete = (req, res) => {
  // Team.findOneAndRemove({_id: req.params.id}, function (err, data) {
  //   if (err) {
  //     return res.json(err)
  //   }
  //   fs.unlink(path.join(__dirname, '../../', data.photo), function (err, data) {
  //     console.log(err, data)
  //   })
  //   res.json(data)
  // })
  let id = req.params.id;
  Players.findByIdAndRemove(id, (err, result) => {
    if (err) {
      res.status(500).json(err).end()
    }
    res.json(result)
  })
}
// exports.delete = function (req, res) {
//   Team.findOneAndRemove({_id: req.params.id}, function(err, photo) {
//     if(err) { 
//        return res.send({status: "200", response: "fail"});
//     }
//     fs.unlink(photo.path, function() {
//       res.send ({
//         status: "200",
//         responseType: "string",
//         response: "success"
//       });     
//     });
//  }); 
// };

exports.update = (req, res) => {
  console.log(req.body);
  if (req.file) {
    req.body.photo = '/uploads/players/' + req.file.filename
  }
  Players.findOneAndUpdate({_id: req.params.id}, req.body, function (err, data) {
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

exports.patch = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  var filenames = req.files.map(x => {
    return x.filename
  }).join(',')
  console.log(filenames);
  req.body.images = filenames
  const doc = await Players.findOne({_id: req.params.id});
  doc.images = [doc.images, filenames].join(',')

  if (req.body.deleted) {
    let tmpImgList = doc.images.split(',')
    tmpImgList = tmpImgList.filter(filename => {
      console.log(req.body.deleted.includes(filename));
      if (req.body.deleted.includes(filename)) {
        deleteUploaded(filename)
      }
      return !req.body.deleted.includes(filename)
    })
    console.log(tmpImgList);
    doc.images = tmpImgList.join(',')
  }
  try {
    req.files.forEach(x => {
      copyFile(x.path, x.filename)
    })
    const item = await doc.save()
    res.send(item)
  } catch (e) {
     handleError(e, res);
  } finally {
    clearTmpUploads('../uploaders/tmp/my-uploads')
    console.log('finaly');
  }
}