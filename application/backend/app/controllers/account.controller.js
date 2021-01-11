const db = require("../models");
const Account = db.accounts;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.login || !req.body.password || !req.body.email) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        let currentDate = new Date();
        const account = {
            login: req.body.login,
            password: req.body.password,
            email: req.body.email,
            registerdate: currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate(),
            role: 'user'
        }
        Account.create(account)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the account"
            });
        });
};
exports.findAll = (req, res) => {
    Account.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving accounts."
        });
      }); 
};
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Account.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Account with id=" + id
        });
      });
};
exports.update = (req, res) => {
    const id = req.params.id;
  
    Account.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Account was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Account with id=${id}. Maybe Account was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Account with id=" + id
        });
      });
};
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Account.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Account was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Account with id=${id}. Maybe Account was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Account with id=" + id
        });
      });
};
exports.deleteAll = (req, res) => {
    Account.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Accounts were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all accounts."
        });
      });
};