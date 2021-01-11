module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      comment: {
        type: Sequelize.STRING
      },
      birth: {
        type: Sequelize.DATEONLY
      },
      account_id: {
        type: Sequelize.SMALLINT
      },
      book_id: {
        type: Sequelize.SMALLINT
      }
    });
  
    return Comment;
  };