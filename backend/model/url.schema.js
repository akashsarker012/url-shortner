const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortid: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory : [{
        timestamp: {
            type: Number,
        },
    }],
    timestamps: {
        type: Number
    }

})

module.exports = mongoose.model('Url', urlSchema)