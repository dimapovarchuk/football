const controller = require('../controllers/news.controller');
const upload = require('../uploaders/photo');
module.exports = function(app){
  app.post('/news',upload.single('photo'),controller.create)
  app.get('/news', controller.list)
  app.patch('/news/:id',upload.single('photo'),controller.patch)
  app.delete('/news/:id',controller.delete)
  app.put('/news/:id',controller.update)
}
