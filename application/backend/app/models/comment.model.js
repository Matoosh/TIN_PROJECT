module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      comment: {
        type: Sequelize.STRING
      },
      created: {
        type: Sequelize.DATEONLY
      },
      account_id: {
        type: Sequelize.INTEGER
      },
      book_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return Comment;
  };