const db = require("../models");
const Account = db.accounts;
const Op = db.Sequelize.Op;
jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    Account.findOne(
      {
        where: {
          email: req.body.email
        }
      }
    ).then(data => {
      if(data != null) {
        if(data?.password == req.body.password) {
          let token = jwt.sign(data.toJSON(), 'secret', { expiresIn: '1h' });
          res.json({
              status: "Success",
              message: "You did it, bastard!",
              token
          });
        } else {
          res.send({
            error: "Password is incorrect!",
          })
        }
      } else {
        res.send({
          error: "Request is empty",
        })
      }
    }).catch(err => {
      res.send({
        error: "Error",
        message: err
      })
    })
}
exports.register =  (req, res) => {
    Account.findOne(
      {
        where: {
          email: req.body.email
        }
      }
    ).then(data => {
      if(data != null) {
        if(data.email == req.body.email) {
          res.status(422).json({
            status: "The email was used for another account!"
          });
        }
      } else {
        let name = req.body.fullName.split(' ');
        let currentDate = new Date();
        let nickname = (name[0].charAt(0) + name[1]).toLowerCase();
        Account.build({
          login: nickname,
          password: req.body.password,
          email: req.body.email,
          registerdate: currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate(),
          role: 'user'
        }).save().then(data => {
          let token = jwt.sign(data.toJSON(), 'secret', { expiresIn: '1h' });
          res.json({
              status: "success",
              message: "You did it, bastard!",
              token
          });
        }).catch(e => {
            res.status(409).json({
              status: "Conflict"
            });
          })
      }
    })
}
exports.logout =  (req, res) => {
  res.json({
      message: 'Success logout',
  });
}