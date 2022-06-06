var contentful = require("contentful");
require("dotenv").config();

var client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_DELIVERY_SECRET,
  space: process.env.CONTENTFUL_SPACE_ID,
});

exports.client = client;
