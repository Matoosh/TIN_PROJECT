const db = require("../models");
const Account = db.accounts;
const Op = db.Sequelize.Op;
jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    Account.findOne()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error " + err
        });
      });
        
    // res.json({
    //     status: x
    // })

    // .then((user) => {
    //     res.json({
    //         status: "Success"
    //     })
    // }).else(
    //     res.json({
    //         status: "No success"
    //     })
    // )
    // Account.findOne({where: {
    //             email: req.body.email
    //         }
    //     }, (err, account) => {
    //     if(err || account?.password != req.body.password ) {
    //         res.status(401).json({
    //             status: "Error",
    //             message: err
    //         })
    //     } else {
    //         let token = jwt.sign(agent.toJSON(), 'secret', { expiresIn: '1h' });
    //         res.json({
    //             status: "Success",
    //             message: "You did it, bastard!",
    //             token
    //         });
    //     }
    // })
}
exports.register =  (req, res) => {
    let account = new Account();
    let name = req.body.fullName.split(' ');
    // let currentDate = new Date();

    account.login = name[0].charAt(0) + name[1];
    account.password = req.body.password;
    account.email = req.body.email;
    account.registerdate = '2021-01-13';//currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    account.role = 'user';

    account.save((err) => {
        if(err) {
            console.log("err", err)
        }
        let token = jwt.sign(agent.toJSON(), 'secret', { expiresIn: '1h' });    
        res.json({
            status: "Success",
            message: "New account created.",
          token
        });
    })


}
exports.logout =  (req, res) => {}