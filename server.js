const express = require('express');
const bodyParser= require('body-parser');
const uuidv4 = require('uuid/v4');
const MongoClient = require('mongodb').MongoClient;
const product = require('./product.js');
const category = require('./category.js');
const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

var MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017';
var PORT = process.env.PORT || 3000;
var DATABASE = process.env.DATABASE || 'heady';

MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);

    app.listen(PORT, () => {
        console.log('listening on ' + PORT);
    });
    
    var db = client.db(DATABASE);
    app.get('/products', (req, res) => {
        product.find(db, req.query, res);
    });

    app.post('/products', (req, res) => {
        product.save(db, uuidv4(), req.body, res);
    });

    app.put('/products/:id', (req, res) => {
        product.save(db, req.params.id, req.body, res);
    });

    app.get('/categories', (req, res) => {
        category.find(db, res);
    });

    app.post('/categories', (req, res) => {
        category.save(db, req.body, res);
    });
});
