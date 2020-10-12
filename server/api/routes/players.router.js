const controller = require('../controllers/players.controller');
const upload = require('../uploaders/photo');
module.exports = function(app){
  app.post('/players',upload.single('photo'), controller.create)
  app.get('/players', controller.list)
  app.patch('/players/:id',upload.single('photo'), controller.update)
  app.delete('/players/:id',controller.delete)
  app.put('/players/:id',controller.update)
}
