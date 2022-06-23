var contentfulManagement = require("contentful-management");
require("dotenv").config();

// TODO use this to minimize code in create.js. I'm personally missing syntax knowledge atm and need to move on:
function getEnvironment(token) {
  var client = contentfulManagement.createClient({
    accessToken: token,
  });
  if (client !== null) {
    client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space) => {
        // This API call will request an environment with the specified ID
        space
          .getEnvironment("master")
          .then((environment) => environment)
          .catch(function (err) {
            console.log(
              "managementContentfulClient - getEnvironment (line 21) error:",
              JSON.stringify(err, null, 2)
            );
            return res.status(401).json({ error: "environment" });
          });
      })
      .catch(function (err) {
        console.log(
          "managementContentfulClient - getSpace (line 28) error:",
          JSON.stringify(err, null, 2)
        );
        return res.status(401).json({ error: "environment" });
      });
  } else {
    console.log(
      "managementContentfulClient - client is null. Probably missing access token. Try Resetting token"
    );
  }
}

module.exports = {
  getEnvironment,
};
