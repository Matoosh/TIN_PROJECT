module.exports = app => {
    const account = require("../controllers/account.controller");
  
    var router = require("express").Router();
  
    router.post("/", account.create);
  
    router.get("/", account.findAll);
    
    router.get("/:id", account.findOne);
  
    router.put("/:id", account.update);
  
    router.delete("/:id", account.delete);
  
    router.delete("/", account.deleteAll);
  
    app.use('/api/account', router);
  };