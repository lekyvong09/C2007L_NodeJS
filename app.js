const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exceptionController = require('./controllers/exception-controller');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

/**
 * filter / middleware / interceptor
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(exceptionController.handle404);

app.listen(3001);