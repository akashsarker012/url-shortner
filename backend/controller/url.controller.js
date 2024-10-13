const {nanoid} = require('nanoid')
const URL = require('../model/url.schema')

const shortUrlController = async (req, res) => {
    const shortID = nanoid(6);

    await URL.create({
        shortid: shortID,
        redirectURL: req.body.url, 
        visitHistory: []})
    res.json({shortID: shortID})
}

module.exports = shortUrlController