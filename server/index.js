const path = require("path");
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();
const clientID = process.env.CONTENTFUL_OAUTH_ID;
const redirect_uri = process.env.CONTENTFUL_OAUTH_REDIRECT_URI;

const content = require("./routes/content.js");
const create = require("./routes/create");
const strip = require("./routes/strip");
const topicsService = require("./services/topics.js");
const themesService = require("./services/themes.js");

app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use("/api/content", content);
app.use("/api/create", create);
app.use("/api/strip", strip);

app.get("/login", (req, res) => {
  res.redirect(
    `https://be.contentful.com/oauth/authorize?response_type=token&client_id=${clientID}&redirect_uri=${redirect_uri}&scope=content_management_manage`
  );
});

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  topicsService.getTopics().then((topicsCollection) => {
    res.json(topicsCollection.items);
  });
});
app.get("/api/themes", (req, res) => {
  themesService.getThemes().then((themesCollection) => {
    const themesList = [];
    themesCollection.items.forEach((theme) => {
      // default only on contentful as an example:
      if (theme.fields.title !== "Default") {
        themesList.push(theme.fields);
      }
    });
    res.json(themesList);
  });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
