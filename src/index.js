const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const dbConnect = require('./queries');
const auth = require('./auth');
const functions = require('./functions');

dbConnect.startConnection()

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.listen(port, () => {
    console.log('App running on port ' + port);
});

app.post('/generateToken', auth.signJWT);

app.get('/checkValidity', auth.getToken, functions.checkVoucherValidity);

app.get('/checkValue', auth.getToken, functions.checkVoucherVal);

app.post('/finish', dbConnect.endConnection);