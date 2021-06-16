const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./config/mongo');
var category = require('./cat-product/category');
var product = require('./cat-product/product');


var app = express();
app.use(bodyParser.json());
app.use('/api', category);
app.use('/api', product);
app.listen(3000, () => console.log('Server started at port : 3000'));
