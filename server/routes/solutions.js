var express = require("express");
var router = express.Router();
var solutions = require("../services/solutions.js");
var formatter = require("../services/formatter.js");

// get all tags and pass them to the formatter
router.use(function (req, res, next) {
  solutions
    .getSolutions()
    .then(function (solutionCollection) {
      req.solutions = formatter.formatSolutions(solutionCollection.items);
      next();
    })
    .catch(function (err) {
      console.log(
        "solutions.js - getSolutions (router.use()) error:",
        JSON.stringify(err, null, 2)
      );
      next();
    });
});

router.get("/", function (req, res, next) {
  res.json(req.tags);
});

module.exports = router;
