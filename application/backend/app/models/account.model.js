module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
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
  
    return Account;
  };