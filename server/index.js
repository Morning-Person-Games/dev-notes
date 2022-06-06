const path = require("path");
const express = require("express");
//const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();
//const categories = require("./routes/categories.js");
const topics = require("./routes/topics.js");
//const solutions = require("./routes/solutions.js");

//app.use(cors());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use("/api/topics", topics);

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// app.get("/api/topics", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// TODO smarter api call for homepage?
// app.get("/api/home", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post("/api/login", (req, res) => {
  if (req.body.password !== process.env.DEVNOTES_PASS) {
    return res.status(422).json({ errors: "Incorrect Password" });
  } else {
    res.send("loggedInBB");
  }
});
