var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;
var StadionsSchema = new Schema({
    name: {
        type: String,
        required: 'Заповніть назву стадіону',
    },
    photo:[{
        type: String
    }],
    adress:{
        type: String,
        required: 'Заповніть поле адреси',
    },
    capacity:{
        type: Number
    },
    size: [{
        type: Number,
    }],
    lighting:{
        type: Number,
    },
    description:{
        type: String
    }
})

module.exports = mongoose.model('Stadions', StadionsSchema)