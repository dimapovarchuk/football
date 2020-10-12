var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;
var NewsSchema = new Schema({
title: {
   type: String,
   required: 'Заповніть заголовок новини',
},
photo: {
   type: String
},
create_at:{
    type: Date,
    default: Date.now
},
title_text:{
    type: String,
},
description:{
   type: String,
},
//   stadion:{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Stadion'
//   }
})
module.exports = mongoose.model('News', NewsSchema)