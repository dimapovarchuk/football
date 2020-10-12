const controller = require('../controllers/team.controller');
const upload = require('../uploaders/photo');
module.exports = function(app){
  app.post('/team',upload.single('photo'),controller.create)
  app.get('/team', controller.list)
  app.patch('/team/:id',upload.single('photo'),controller.patch)
  app.get('/team/:id', controller.show)
  app.delete('/team/:id',controller.delete)
  app.put('/team/:id',controller.update)
}
