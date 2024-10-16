const express = require('express');
const { shortUrlController ,getUrl} = require('../controller/url.controller');
const router = express.Router();

router.post( '/shorturl',shortUrlController);
router.get('/:shortid', getUrl);

module.exports = router