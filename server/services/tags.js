var client = require("./contentfulClient").client;

function getTags(query) {
  query = query || {};
  return client.getTags(query);
}

module.exports = {
  getTags,
};
