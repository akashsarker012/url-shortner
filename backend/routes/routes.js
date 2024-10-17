const express = require('express');
const { shortUrlController ,getUrl, getAllUrls} = require('../controller/url.controller');
const router = express.Router();

router.post( '/shorturl',shortUrlController);
router.get('/:shortid', getUrl);
router.get('/api/getallurls', getAllUrls);

module.exports = router