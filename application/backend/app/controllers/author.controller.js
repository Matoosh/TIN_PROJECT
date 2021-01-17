const db = require("../models");
const Author = db.authors;
const Book = db.books;
const Op = db.Sequelize.Op;

// Create and Save a new Author
exports.create = (req, res) => {
    if (!req.body.first_name || !req.body.last_name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }

    const author = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth: req.body.birth,
        imglink: req.body.imglink
    };

    Author.create(author)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Author"
            });
        });
};

exports.findAll = (req, res) => {
    Author.findAll({
      include: [{
        model: Book,
        as: 'books'
      }]
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving authors."
        });
      });  
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Author.findByPk(id,
    {
      include: [{
        model: Book,
        as: 'books'
      }]
    }).then(data => {
      res.send(data);
    }).catch(error => {
      res.status(500).send({
        message: "Error retrieving Author with id=" + id
      });
    })
};

exports.findOneById = (id) => {
  let result;
  Author.findOne({
    where: {
      id: id
    }
  }).then(data => {
    result = data;
  })
  return result;
}

exports.update = (req, res) => {
    const id = req.params.id;
  
    Author.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Author was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Author with id=${id}. Maybe Author was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Author with id=" + id
        });
      });
  
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Author.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Author was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Author with id=${id}. Maybe Author was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Author with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Author.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Authors were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all authors."
        });
      });
};
