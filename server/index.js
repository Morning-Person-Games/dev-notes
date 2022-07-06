const path = require("path");
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();

const content = require("./routes/content.js");
const strip = require("./routes/strip");
const topicsService = require("./services/topics.js");

app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use("/api/content", content);
app.use("/api/strip", strip);

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.write("<h1>Publically Available Content</h1>");
  topicsService.getTopics().then((topicsCollection) => {
    res.json(topicsCollection.items);
  });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
