var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;
var PlayersSchema = new Schema({
    PIB: {
        type: String,
        required: 'Введіть ініціали',
    },
    number: {
        type: Number,
        required: 'Введіть номер гравця',
    },
    position:{
        type: String,
        required: 'Введіть позицію гравця',
    },
    date_of_birth:{
        type: Date,
    },
    country:{
        type: String,
    },
    personal_reserve:{
        type: String,
    },
    goals_scored:{
        type: Number,
    },
    game:{
        type: Number,
    },
    yellow_carts:{
        type: Number,
    },
    red_carts:{
        type: Number,
    },
    description:{
        type: String
    },
    photo:{
        type: String
    },
    minutes_of_fiels:{
        type: Number
    }
})

module.exports = mongoose.model('Players', PlayersSchema)
