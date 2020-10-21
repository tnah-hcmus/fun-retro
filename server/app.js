const express = require('express');
const userRouter = require('./routers/user');
require('dotenv').config();

const port = process.env.PORT;
require('./db/db');
require('./services/google-utils');
const {urlGoogle} = require('./services/google-utils');



const app = express();

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})