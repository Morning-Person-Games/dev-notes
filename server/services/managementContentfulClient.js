var contentfulManagement = require("contentful-management");
require("dotenv").config();

var management = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_SECRET,
  space: process.env.CONTENTFUL_SPACE_ID,
});

exports.management = management;
