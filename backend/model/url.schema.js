const mongoose = require('mongoose');

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
    visitHistory: [{
        type: Number
    }]
}, {
    timestamps: true 
});

module.exports = mongoose.model('Url', urlSchema);
