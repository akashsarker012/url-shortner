const express = require('express')
const app = express()
const port = 3000
const path = require('path');
require('dotenv').config();
const connectDB = require('./db/db');
connectDB();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})