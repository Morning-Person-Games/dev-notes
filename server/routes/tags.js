var express = require("express");
var router = express.Router();
var tags = require("../services/tags.js");
var formatter = require("../services/formatter.js");

// get all tags and pass them to the formatter
router.use(function (req, res, next) {
  tags
    .getTags()
    .then(function (tagCollection) {
      req.tags = formatter.formatTags(tagCollection.items);
      next();
    })
    .catch(function (err) {
      console.log(
        "tags.js - getTag (router.use()) error:",
        JSON.stringify(err, null, 2)
      );
      next();
    });
});

router.get("/", function (req, res, next) {
  res.json(req.tags);
});

module.exports = router;
