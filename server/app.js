const express = require('express');
const path = require('path');
const {urlGoogle} = require('./services/google-utils');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const boardRouter = require('./routers/board');
const port = process.env.PORT;
const router = express.Router();
boardRouter(router);
userRouter(router);
taskRouter(router);



require('dotenv').config();
require('./db/db');




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

app.use(router)


app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../public/dist/index.html"));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})