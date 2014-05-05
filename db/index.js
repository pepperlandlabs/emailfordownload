var dbConfig = require('./config');
var Sequelize = require("sequelize");

var env = process.env.NODE_ENV;
var password = dbConfig[env].password ? dbConfig[env].password : null;

var sequelize = new Sequelize(
    dbConfig[env].database, 
    dbConfig[env].user, 
    password, 
    { 
        logging: true 
    }
);

module.exports = sequelize;