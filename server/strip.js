const express = require("express");
const router = express.Router();
const removeMd = require("remove-markdown");

// get all tags and pass them to the formatter
router.post("/", (req, res, next) => {
  if (req.body && req.body.markdown) {
    console.log("Stripping markdown from string");
    const stripped = removeMd(req.body.markdown);
    res.json(stripped);
    next();
  } else {
    return res
      .status(401)
      .json({ error: "No markdown string given in request" });
  }
});

module.exports = router;
