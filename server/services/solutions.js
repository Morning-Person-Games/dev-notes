var client = require("./contentfulClient").client;

function getSolutions(query) {
  query = query || {};
  query.content_type = "solution";
  return client.getEntries(query);
}

module.exports = {
  getSolutions,
};
