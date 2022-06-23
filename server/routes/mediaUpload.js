const express = require("express");
const router = express.Router();
var contentfulManagement = require("contentful-management");
require("dotenv").config();
const multer = require("multer");
const upload = multer();

router.post("/image", upload.any(), (req, res, next) => {
  console.log("POST /image/");
  const { token, title, description } = req.body;
  if (token) {
    req.client = contentfulManagement.createClient({
      accessToken: token,
    });
    if (req.files) {
      var img = {
        fields: {
          title: {
            "en-US": title,
          },
          description: {
            "en-US": description,
          },
          file: {
            "en-US": {
              contentType: req.files[0].mimetype,
              fileName: req.files[0].originalname,
              file: req.files[0].buffer,
            },
          },
        },
      };
      req.client
        .getSpace(process.env.CONTENTFUL_SPACE_ID)
        .then((space) => {
          space
            .getEnvironment("master")
            .then((environment) => {
              environment
                .createAssetFromFiles(img)
                .then((asset) => {
                  asset
                    .processForLocale("en-US")
                    .then((asset) => {
                      asset.publish();
                      res.send(asset);
                      next();
                    })
                    .catch((err) => {
                      console.log(
                        "managementContentfulClient - processForLocale error:",
                        JSON.stringify(err, null, 2)
                      );
                      return res.status(401).json({ error: "failed" });
                    });
                })
                .catch((err) => {
                  console.log(
                    "managementContentfulClient - createAssetFromFiles error:",
                    JSON.stringify(err, null, 2)
                  );
                  return res.status(401).json({ error: "failed" });
                });
            })
            .catch((err) => {
              console.log(
                "managementContentfulClient - getEnvironment (line 21) error:",
                JSON.stringify(err, null, 2)
              );
              return res.status(401).json({ error: "environment" });
            });
        })
        .catch((err) => {
          console.log(
            "managementContentfulClient - getSpace (line 28) error:",
            JSON.stringify(err, null, 2)
          );
          return res.status(401).json({ error: "environment" });
        });
    } else {
      return res.status(401).json({ error: "image" });
    }
  }
});

module.exports = router;
