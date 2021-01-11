module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      releasedate: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.STRING
      },
      imglink: {
        type: Sequelize.STRING
      },
      author_id: {
        type: Sequelize.SMALLINT
      }
    });
  
    return Book;
  };