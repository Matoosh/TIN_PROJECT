module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define("author", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      birth: {
        type: Sequelize.DATEONLY
      },
      imglink: {
        type: Sequelize.STRING
      }
    });
  
    // Author.associate = function(models) {
    //   Author.hasMany(models.Books, {as: 'books'})
    // }
    return Author;
  };