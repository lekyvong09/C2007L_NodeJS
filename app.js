const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/**
 * filter / middleware / interceptor
 */
app.use(bodyParser.urlencoded({extended: false}));

app.get('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"/><button type="submit">Add Product</button></form>');
});

app.post('/product', (req, res, next) => {
    console.log(req.body.title);
    res.redirect('/');
});

app.get('/', (req, res, next) => {
    res.send('<h1>Hello from express</h1>');
});


app.listen(3001);