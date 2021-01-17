const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },

  define: {
    timestamps: false,
    logging: true
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.accounts = require("./account.model.js")(sequelize, Sequelize);
db.authors = require("./author.model.js")(sequelize, Sequelize);
db.books = require("./book.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);

db.authors.hasMany(db.books, {as: 'books', foreignKey: {name: 'author_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
db.books.belongsTo(db.authors, {as: 'authors', foreignKey: {name: 'author_id', allowNull: false} } );

db.books.hasMany(db.comments, {as: 'comments', foreignKey: {name: 'book_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
db.comments.belongsTo(db.books, {as: 'books', foreignKey: {name: 'book_id', allowNull: false} } );

db.accounts.hasMany(db.comments, {as: 'comments', foreignKey: {name: 'account_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
db.comments.belongsTo(db.accounts, {as: 'accounts', foreignKey: {name: 'account_id', allowNull: false} } );

module.exports = db;
