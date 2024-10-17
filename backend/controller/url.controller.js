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
    { $inc: { visitHistory: 1 } },
    { new: true }
  )
  if (!entry) {
    return res.json({ error: "URL not found" });
  }

  res.redirect(entry.redirectURL);
};

const getAllUrls = async (req, res) => {
  try {
    const url = await URL.find().sort({ createdAt: -1 }).limit(1);
    res.json(url);
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
}
};

module.exports = {shortUrlController, getUrl, getAllUrls};
