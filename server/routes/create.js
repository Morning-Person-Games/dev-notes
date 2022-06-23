const express = require("express");
const router = express.Router();
//const getEnvironment = require("../management/managementClient").getEnvironment;
var contentfulManagement = require("contentful-management");
require("dotenv").config();

router.use((req, res, next) => {
  console.log(req.body);
  const { token } = req.body;
  if (token) {
    req.client = contentfulManagement.createClient({
      accessToken: token,
    });
  }
  next();
});

router.post("/tags", (req, res, next) => {
  console.log("create tags");
  const { tags } = req.body;
  const promises = [];
  if (req.client && tags) {
    req.client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space) => {
        space
          .getEnvironment("master")
          .then((environment) => {
            tags.forEach((tag) => {
              promises.push(
                environment.createTag(tag.id, tag.name, tag.visibility)
              );
            });
            Promise.allSettled(promises)
              .then((results) => {
                res.send(results);
                next();
              })
              .catch((results) => {
                results.forEach((result) =>
                  console.log(JSON.stringify(result, null, 2))
                );
                return res
                  .status(401)
                  .json({ error: "failed", result: results });
              });
          })
          .catch(function (err) {
            console.log(
              "managementContentfulClient - getEnvironment (line 21) error:",
              JSON.stringify(err, null, 2)
            );
            return res.status(401).json({ error: "environment" });
          });
      })
      .catch(function (err) {
        console.log(
          "managementContentfulClient - getSpace (line 28) error:",
          JSON.stringify(err, null, 2)
        );
        return res.status(401).json({ error: "environment" });
      });
  } else {
    return res.status(401).json({ error: "No tags found in request" });
  }
});

router.post("/solutions", (req, res, next) => {
  console.log("create solutions");
  const { solutions } = req.body;
  const promises = [];
  if (req.client && solutions) {
    req.client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space) => {
        space
          .getEnvironment("master")
          .then((environment) => {
            solutions.forEach((solution) => {
              var fields = {
                fields: {
                  id: {
                    "en-US": solution.id,
                  },
                  title: {
                    "en-US": solution.title,
                  },
                  description: {
                    "en-US": solution.description,
                  },
                },
              };
              promises.push(
                environment
                  .createEntry("solution", fields)
                  .then((entry) => entry.publish())
              );
            });
            Promise.allSettled(promises)
              .then((results) => {
                res.send(results);
                next();
              })
              .catch((results) => {
                results.forEach((result) =>
                  console.log(JSON.stringify(result, null, 2))
                );
                return res
                  .status(401)
                  .json({ error: "failed", result: results });
              });
          })
          .catch(function (err) {
            console.log(
              "managementContentfulClient - getEnvironment (line 21) error:",
              JSON.stringify(err, null, 2)
            );
            return res.status(401).json({ error: "environment" });
          });
      })
      .catch(function (err) {
        console.log(
          "managementContentfulClient - getSpace (line 28) error:",
          JSON.stringify(err, null, 2)
        );
        return res.status(401).json({ error: "environment" });
      });
  } else {
    return res.status(401).json({ error: "No solutions found in request" });
  }
});

/*
  req:
    contentToAdd = {
      newTags,
      newImages,
      newSolutions,
      newTopic,
    }; 
*/
router.post("/topic", (req, res, next) => {
  console.log("create a topic");
  const { topic } = req.body;
  console.log(topic);
  if (req.client && topic) {
    req.client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space) => {
        space
          .getEnvironment("master")
          .then((environment) => {
            var fields = {
              metadata: {
                tags: topic.tags,
              },
              fields: {
                title: {
                  "en-US": topic.title,
                },
                slug: {
                  "en-US": topic.slug,
                },
                category: {
                  "en-US": topic.category,
                },
                solutions: {
                  "en-US": topic.solutions,
                },
              },
            };
            console.log(fields);
            environment.createEntry("topic", fields).then((entry) => {
              entry.publish().then((results) => {
                console.log(results);
                res.send(results);
                next();
              });
            });
          })
          .catch(function (err) {
            console.log(
              "managementContentfulClient - getEnvironment (line 21) error:",
              JSON.stringify(err, null, 2)
            );
            return res.status(401).json({ error: "environment" });
          });
      })
      .catch(function (err) {
        console.log(
          "managementContentfulClient - getSpace (line 28) error:",
          JSON.stringify(err, null, 2)
        );
        return res.status(401).json({ error: "environment" });
      });
  } else {
    return res.status(401).json({ error: "No solutions found in request" });
  }
});

// app.post("/api/login", (req, res) => {
//   if (req.body.password !== process.env.DEVNOTES_PASS) {
//     return res.status(422).json({ errors: "Incorrect Password" });
//   } else {
//     res.send("loggedInBB");
//   }
// });

module.exports = router;
