const db = require("../models");
const Book = db.books;
const Author = db.authors;
const Comment = db.comments;
const Account = db.accounts;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.author_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }

    const book = {
        title: req.body.title,
        description: req.body.description,
        releasedate: req.body.releasedate,
        status: req.body.status,
        imglink: req.body.imglink,
        author_id: req.body.author_id
    };


    Book.create(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Book"
            });
        });
};
exports.getBooks = async (req, res) => {
  Book.findAll({
    include: [{
      model: Author,
      as: 'authors'
    }]
  }).then(data => {
    res.send(data);
  });
}


exports.findOne = async (req, res) => {
    const id = req.params.id;
  
    Book.findByPk(id, {
      include: [{
        model: Author,
        as: 'authors'
      },
      {
        model: Comment,
        as: 'comments',
        include: {
          model: Account,
          as: 'accounts'
        }
      }]
    }).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: "Error retrieving Book with id=" + id
      });
    });
};

exports.update = async (req, res) => {
    const id = req.params.id;
  
    Book.update({
      title: req.body.title,
      description: req.body.description,
      releasedate: req.body.releasedate,
      author_id: req.body.author_id,
    }, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Book was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Book with id=" + id
        });
      });
};

exports.delete = async (req, res) => {
    const id = req.params.id;
  
    Comment.destroy({
      where: {book_id: id}
    }).then(count => {
      Book.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              status: "success",
              message: "Book was deleted successfully!"
            });
          } else {
            res.send({
              status: "danger",
              message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            status: "danger",
            message: "Could not delete Book with id=" + id
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        status: "danger",
        message: "Book  wasn't deleted. Something was wrong with comments which are connected to the book." + err
      });
    });
};

exports.deleteAll = async (req, res) => {
    Book.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Books were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all books."
        });
      });
};