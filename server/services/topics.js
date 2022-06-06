var client = require("./contentfulClient").client;

function getTopics(query) {
  query = query || {};
  query.content_type = "topic";
  return client.getEntries(query);
}

function getTopicsInCategory(id) {
  return getTopics({ "fields.categories.sys.id[in]": id });
}
module.exports = {
  getTopics,
  getTopicsInCategory,
};
