const express = require('express');
const bodyParser= require('body-parser');
const uuidv4 = require('uuid/v4');
const MongoClient = require('mongodb').MongoClient;
const product = require('./product.js');
const category = require('./category.js');
var db;

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);

    db = client.db('heady');
    app.listen(3000, () => {
        console.log('listening on 3000');
    });
    
    app.get('/products', (req, res) => {
        product.find(db, req.query, res);
    });

    app.post('/products', (req, res) => {
        product.save(db, uuidv4(), req.body, res);
    });

    app.put('/products/:id', (req, res) => {
        product.save(db, req.params.id, req.body, res);
    });

    app.post('/categories', (req, res) => {
        category.save(db, req.body, res);
    });
});
