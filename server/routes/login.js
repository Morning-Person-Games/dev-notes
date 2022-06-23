const express = require("express");
const router = express.Router();
const axios = require("axios");
const clientID = process.env.CONTENTFUL_OAUTH_ID;
const redirect_uri = process.env.CONTENTFUL_OAUTH_REDIRECT_URI;

//I guess I'm holding on to hope theres a way to use contentful oauth without getting the token from a hash:
router.use((req, res, next) => {
  axios
    .get(
      `https://be.contentful.com/oauth/authorize?response_type=token&client_id=${clientID}&redirect_uri=${redirect_uri}&scope=content_management_manage`,
      { responseType: "json" }
    )
    .then((response) => {
      var token = response.headers["set-cookie"][0].split(";");
      req.tokenData = {
        token: token[0].substring(18),
        expires: token[2].substring(9),
      };
      next();
    });
});

router.get("/", function (req, res) {
  if (req.tokenData) {
    res.json(req.tokenData);
  } else {
    console.log("no token data found");
    return res.status(401).json({ error: "unset" });
  }
});

module.exports = router;
