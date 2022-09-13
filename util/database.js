const Sequelize = require('sequelize');

const sequelize = new Sequelize('c2007l_nodejs','root','ab123456..', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;