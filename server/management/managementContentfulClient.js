var contentfulManagement = require("contentful-management");
require("dotenv").config();

function management(token, res) {
  console.log(token);
  var client = contentfulManagement.createClient({
    accessToken: token || process.env.TESTING_MANAGEMENT_KEY,
  });
  if (client !== null) {
    client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space) => {
        // This API call will request an environment with the specified ID
        space
          .getEnvironment("master")
          .then((environment) => {
            return environment;
          })
          .catch(function (err) {
            console.log(
              "managementContentfulClient - getEnvironment (line 15) error:",
              JSON.stringify(err, null, 2)
            );
          });
      })
      .catch(function (err) {
        console.log(
          "managementContentfulClient - getSpace (line 11) error:",
          JSON.stringify(err, null, 2)
        );
      });
  } else {
    console.log(
      "managementContentfulClient - client is null. Probably missing access token. Resetting token"
    );
    res.redirect("/logout");
  }
}

exports.management = management;
