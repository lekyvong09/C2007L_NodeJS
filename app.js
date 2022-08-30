const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

/**
 * filter / middleware / interceptor
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => res.status(404).sendFile(path.join(__dirname, 'views', '404.html')));

app.listen(3001);