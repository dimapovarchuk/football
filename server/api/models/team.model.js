var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;
var TeamSchema = new Schema({
name: {
   type: String,
   required: 'Заповніть назву команди',
},
photo: {
   type: String
},
mainLogoIndex: Number,
date_of_foundation:{
   type: Date,
   required: 'Заповніть поле дати',
},
president:{
   type: String,
},
coach:{
   type: String,
},
site:{
   type: String,
},
email:{
   type: String,
},
stadion: {
   type:String,
},
description: {
   type: String
},
game:{
   type: Number,
   default:0,
},
win:{
   type: Number,
   default:0,
},
draw:{
   type: Number,
   default:0,
},
defeat:{
   type: Number,
   default:0,
},
//   stadion:{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Stadion'
//   }
})
module.exports = mongoose.model('Team', TeamSchema)