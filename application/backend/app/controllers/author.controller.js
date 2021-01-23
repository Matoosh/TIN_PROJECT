const db = require("../models");
const Author = db.authors;
const Book = db.books;
const Op = db.Sequelize.Op;

// function isAuthorExist (first, last) {
//   var counter = 0;
//   Author.findAndCountAll({
//     where: {
//       first_name: first,
//       last_name: last
//     },
//     offset: 10,
//     limit: 2
//  })
//  .then(result => {
//    console.log("result: "+result.count);
//    counter = result.count;
//  });
//  console.log("counter: "+counter);
//  return counter;
 
// }

exports.create = (req, res) => {
    if (!req.body.first_name || !req.body.last_name) {
        res.status(400).send({
          status: "danger",
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

    Author.findAndCountAll({
      where: {
        first_name: author.first_name,
        last_name: author.last_name
      },
      offset: 10,
      limit: 2
    }).then(result => {
     if(result.count != 0) {
        res.send({
          status: "danger",
          message: "The autor already exists!"
        });
     } else {
        Author.create(author).then(data => {
            res.send({
              status: "success",
              message: "The author has been created!",
              data
            });
        })
        .catch(err => {
            res.status(500).send({
                status: "danger",
                message:
                err.message || "Some error occurred while creating the Author"
            });
        });
     }
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
            status: "success",
            message: "Author was updated successfully."
          });
        } else {
          res.send({
            status: "danger",
            message: `Cannot update Author with id=${id}. Maybe Author was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          status: "danger",
          message: "Error updating Author with id=" + id
        });
      });
  
};

exports.delete = (req, res) => {
    const id = req.params.id;
    // const author_id = req.params.author_id;
    
    Book.findAndCountAll({
      where: {
        author_id: id
      },
      offset: 10,
      limit: 2
    }).then(result => {
      if(result.count != 0) {
        res.send({
          status: "danger",
          message: "The author has books assigned."
        });
      } else {
        Author.destroy({
          where: { id: id }
        }).then(num => {
          if (num == 1) {
            res.send({
              status: "success",
              message: "Author was deleted successfully!"
            });
          } else {
            res.send({
              status: "danger",
              message: `Cannot delete Author with id=${id}. Maybe Author was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            status: "danger",
            message: "Could not delete Author with id=" + id
          });
        });
    }
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
