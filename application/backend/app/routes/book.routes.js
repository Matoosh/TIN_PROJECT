module.exports = app => {
    const book = require("../controllers/book.controller");
  
    var router = require("express").Router();
  
    router.post("/", book.create);
    router.get("/", book.getBooks);
    router.get("/:id", book.findOne);
    router.put("/:id", book.update);
    router.delete("/:id", book.delete);
    router.delete("/", book.deleteAll);
    
    app.use('/api/book', router);
  };