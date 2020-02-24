'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { getTodos, getData, handle404 } = require('./handlers');
const { stock, customers } = require('./data/promo');

const PORT = process.env.PORT || 4000;

//const getTodos = (req, res) => {
//    res.render("pages/todos");
//};

//const getData = (req, res) => {
//    res.render("pages/data");
//};

// exercise 2
const getOrder = (req, res) => {
    res.send('pages/order', {
        stock: stock,
        customers: customers
    })
}

const getOrderConf = (req, res) => {
    res.render('pages/order-confirmation', {
        stock: stock,
        customers, customers
    })
}

const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(morgan('tiny'))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

// endpoints
//exercise 1
app.get('/todos', getTodos)
app.get('/data', getData)


// exercise 2
app.get('/order', getOrder)
app.get('/order-confirmation', getOrderConf)

// app.use(handle404)

app.get('*', (req, res) => res.send('Dang. 404.'))
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));