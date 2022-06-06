var express = require("express");
var router = express.Router();
var topics = require("../services/topics.js");
var categories = require("../services/categories.js");
var formatter = require("../services/formatter.js");

/* router params */
// router.param('slug', function (req, res, next, slug) {
//   products.getProduct(slug).then(function (product) {
//     req.product = product.items[0]
//     next()
//   }).catch(function (err) {
//     console.log('products.js - getProduct (line 7) error:', JSON.stringify(err,null,2))
//     next()
//   })
// })

// router.use(function (req, res, next) {
//   topics
//     .getTopics()
//     .then(function (topicCollection) {
//       req.topics = topicCollection.items;
//       next();
//     })
//     .catch(function (err) {
//       console.log(
//         "topics.js - getTopics (line 17) error:",
//         JSON.stringify(err, null, 2)
//       );
//       next();
//     });
// });

// router.get("/:slug", function (req, res, next) {
//   res.render("product", {
//     title: req.product.fields.productName,
//     product: req.product,
//   });
// });

router.use(function (req, res, next) {
  categories
    .getCategories()
    .then(function (categoryCollection) {
      topics
        .getTopics()
        .then(function (topicsCollection) {
          req.topics = formatter.formatMainTopicsList(
            categoryCollection.items,
            topicsCollection.items
          );
          next();
        })
        .catch(function (err) {
          console.log(
            "index.js - getTopics (router.use()) error:",
            JSON.stringify(err, null, 2)
          );
          next();
        });
    })
    .catch(function (err) {
      console.log(
        "index.js - getCategories (router.use()) error:",
        JSON.stringify(err, null, 2)
      );
      next();
    });
});

router.get("/", function (req, res, next) {
  res.json(req.topics);
});

module.exports = router;
