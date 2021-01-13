module.exports = app => {
    const auth = require("../controllers/auth.controller");
    var router = require("express").Router();
  
    router.post("/login", auth.login);
    router.post("/register", auth.register);
    router.post("/logout", auth.logout);
    
    app.use('/api/auth', router);
  };