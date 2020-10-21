const express = require('express');
const userRouter = require('./routers/user');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT;
require('./db/db');
require('./services/google-utils');
const {urlGoogle} = require('./services/google-utils');



const app = express();
app.use(express.static(path.join(__dirname, "../public/dist")));
app.get('/google/url', (req, res) => {
    res.send(urlGoogle())
})

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

app.use(userRouter);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../public/dist/index.html"));
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})