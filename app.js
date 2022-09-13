const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exceptionController = require('./controllers/exception-controller');
const multer = require('multer');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

/**
 * filter / middleware / interceptor
 */
app.use(bodyParser.urlencoded({extended: false}));

const fileStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'images')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(exceptionController.handle404);

sequelize.sync()
    .then(result => {
        app.listen(3001);
    })
    .catch(err => console.log(err));
