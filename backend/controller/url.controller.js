const { nanoid } = require('nanoid')
const URL = require("../model/url.schema");

const shortUrlController = async (req, res) => {
  const shortID = nanoid(6);
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  await URL.create({
    shortid: shortID,
    redirectURL: req.body.url,
    visitHistory: [],
  });

  res.json({ id: shortID });
};

const getUrl = async (req, res) => {
  const shortid = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    { shortid: shortid },
    {$push: { visitHistory: {timestamp: Date.now()} }},
    { new: true }
  )
  if (!entry) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.redirect(entry.redirectURL);
};

module.exports = {shortUrlController, getUrl};
