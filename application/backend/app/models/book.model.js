module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
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
        type: Sequelize.INTEGER
      }
    });
    return Book;
  };