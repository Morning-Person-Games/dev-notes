var client = require("./contentfulClient").client;

function getThemes(query) {
  query = query || {};
  query.content_type = "theme";
  return client.getEntries(query);
}

module.exports = {
  getThemes,
};
