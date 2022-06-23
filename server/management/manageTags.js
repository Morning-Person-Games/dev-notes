const getEnvironment = require("./managementClient").getEnvironment;

function createTagPromise(token, { id, name, visibility }) {
  var environment = getEnvironment(token);
  //res.redirect("/logout");
  return environment.createTag(id, name, visibility);
}

contentToAdd = {
  newTags,
  newImages,
  newSolutions,
  newTopic,
};
function createTagsPromises(token, tags) {
  var environment = getEnvironment(token);
  const newTagPromises = [];
  tags.forEach((tag) => {
    newTagPromises.push(environment.createTag(token, tag));
  });
}

module.exports = {
  createTagPromise,
  createTagsPromises,
};
