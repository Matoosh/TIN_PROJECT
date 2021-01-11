module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define("author", {
      login: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      registerdate: {
        type: Sequelize.DATEONLY
      },
      role: {
        type: Sequelize.STRING
      }
    });
  
    return Author;
  };