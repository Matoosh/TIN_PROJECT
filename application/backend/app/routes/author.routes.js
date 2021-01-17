module.exports = app => {
    const author = require("../controllers/author.controller");
  
    var router = require("express").Router();
  
    router.post("/", author.create);
    router.get("/", author.findAll);
    router.get("/:id", author.findOne);
    router.put("/:id", author.update);
    router.delete("/:id", author.delete);
    router.delete("/", author.deleteAll);
    
    app.use('/api/author', router);
  };