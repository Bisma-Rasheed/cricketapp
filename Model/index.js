const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PW = process.env.DB_PW;
const DB_USER = process.env.DB_USER;
const DB_DIALECT = process.env.DB_DIALECT;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PW, {
    host: DB_HOST,
    dialect: DB_DIALECT
});

sequelize.authenticate()
.then(()=>{
    console.log('Connected to database');
}).catch(err=>{
    console.log(err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.userModel = require('./userModel')(sequelize, DataTypes);
//db.playerModel = require('./playerModel')(sequelize, DataTypes);

db.sequelize.sync({force: false});
console.log('syncing..');

module.exports = db;

