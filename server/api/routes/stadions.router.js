const controller = require('../controllers/stadions.controller');
const upload = require('../uploaders/photo');
module.exports = function(app){
  app.post('/stadions',upload.single('photo'),controller.create)
  app.get('/stadions', controller.list)
  app.patch('/stadions/:id',upload.single('photo'), controller.update)
  app.delete('/stadions/:id',controller.delete)
  app.put('/stadions/:id',controller.update)
}
