const express = require("express");
const router = express.Router();
const topics = require("../services/topics.js");
const categories = require("../services/categories.js");
const tags = require("../services/tags.js");
const solutions = require("../services/solutions.js");
const formatter = require("../services/formatter.js");
require("dotenv").config();

// get categories and topics together to correctly format them for react/client
router.use(function (req, res, next) {
  // get categories
  categories
    .getCategories()
    .then(function (categoryCollection) {
      topics
        .getTopics()
        .then(function (topicsCollection) {
          // get tags
          tags
            .getTags()
            .then(function (tagCollection) {
              req.content = {
                topics: formatter.formatMainTopicsList(
                  categoryCollection.items,
                  topicsCollection.items
                ),
                tags: formatter.formatTags(tagCollection.items),
              };
              // finish fetching
              next();
            })
            .catch(function (err) {
              console.log(
                "content.js - getTag (router.use()) error:",
                JSON.stringify(err, null, 2)
              );
              next();
            });
        })
        .catch(function (err) {
          console.log(
            "content.js - getTopics (router.use()) error:",
            JSON.stringify(err, null, 2)
          );
          next();
        });
    })
    .catch(function (err) {
      console.log(
        "content.js - getCategories (router.use()) error:",
        JSON.stringify(err, null, 2)
      );
      next();
    });
});

router.get("/", function (req, res, next) {
  res.json({
    topics: req.content.topics ? req.content.topics : [],
    tags: req.content.tags ? req.content.tags : [],
    spaceID: process.env.CONTENTFUL_SPACE_ID,
  });
});

module.exports = router;
