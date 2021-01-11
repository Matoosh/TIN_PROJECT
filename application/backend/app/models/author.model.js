module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define("author", {
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
  
    return Author;
  };