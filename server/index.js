var express = require('express'),
app = express(),
bodyParser = require('body-parser');
jwt = require('jsonwebtoken')
fs = require("fs");
cors = require('cors')
const secret = fs.readFileSync(__dirname + '/private.key')
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('uploads'))
app.use((req, res, next) =>{
    if(req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] == 'JWT'
    ) {
      jwt.verify(req.headers.authorization.split(' ')[1], secret, {algorithm: 'HS256'}, (err, decode) =>{
        if (err) {
          console.log(err)
          req.user = undefined;
        }else{
          req.user = decode
        }
      next()
  
      })
    } else {
      req.user = undefined;
      next()
    }
  })
// var db_url='mongodb+srv://povarchukdima:<password>@cluster0.pxwd0.mongodb.net/<dbname>?retryWrites=true&w=majority';
var db_url='mongodb://localhost/bookmeker';
var mongoose = require('mongoose');
var User = require('./api/models/user')
var teamModels = require('./api/models/team.model')
var stadionsModels = require('./api/models/stadions.model')
var playersModels = require('./api/models/players.model')
var newsModels = require('./api/models/news.model')
mongoose.connect(db_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});
mongoose.set('useCreateIndex', true);
// var userRoutes = require('./api/routes/team.router')
// userRoutes(app)
var userRoutes = require('./api/routes/users')
userRoutes(app)
var teamRoutes = require('./api/routes/team.router')
teamRoutes(app)
var stadionsRoutes = require('./api/routes/stadions.router')
stadionsRoutes(app)
var playersRoutes = require('./api/routes/players.router')
playersRoutes(app)
var newsRoutes = require('./api/routes/news.router')
newsRoutes(app)
app.listen(3000);
console.log('listen on port: 3000')




// var db_url='mongodb://localhost/bookmeker';
// var mongoose = require('mongoose');
// var Team = require('./server/api/models/team.model')



