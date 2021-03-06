const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.comment || !req.body.account_id || !req.body.book_id) {
        res.status(400).send({
          status: "danger",
          message: "Content can not be empty!"
        });
        return;
    }

    // let currentDate = new Date().toLocaleString("pl-PL");
    let currentDate = new Date();
    const comment = {
        comment: req.body.comment,
        created: currentDate.getTime(),
        account_id: req.body.account_id,
        book_id: req.body.book_id
    };

    Comment.create(comment)
        .then(data => {
            res.send({
                status: "success",
                message: "Comment was added",
                data
            });
        })
        .catch(err => {
            res.status(500).send({
                status: "danger",
                message: err.message || "Some error occurred while creating the Comment"
            });
        });
};
exports.findAll = (req, res) => {
    Comment.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving comments."
        });
      });  
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Comment.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Comment with id=" + id
        });
      });
};

exports.deleteCommentsFromBook = (data) => {
    const bookId = data.params.id;
    Comment.destroy({
      where: {
        book_id: bookId
      }.then(count => {
        if(count == 1) return true;
      })
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
  
    Comment.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Comment was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Comment with id=" + id
        });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Comment.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            status: "success",
            message: "Comment was deleted successfully!"
          });
        } else {
          res.send({
            status: "danger",
            message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          status: "danger",
          message: "Could not delete Comment with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Comment.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ 
          message: `${nums} Comments were deleted successfully!` }
        );
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all comments."
        });
      });
};