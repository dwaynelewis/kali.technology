'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/contact', (req, res, next) => {

    res.json(req.body);

});


app.post('/api/newsletter', (req, res, next) => {

    res.json(req.body);

});



app.listen(3000);