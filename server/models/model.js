const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        required: true,
        type: String
    },
    startdate: {
        required: true,
        type: Date
    }
}, {collection: 'users'})

const Echo = new Schema({
    name: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date
    },
    echo: {
        required: true,
        type: String
    }
}, {collection: 'echos'})

module.exports = {
    user: mongoose.model('User', User),
    echo: mongoose.model('Echo', Echo)
}