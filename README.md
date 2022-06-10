I believe these are the steps needed to setup a local envrionment:

Currently using node v16.15.0.

1. `npm install`
2. Fill out the CONTENTFUL_DELIVERY_SECRET from the [Contentful API Keys page](https://app.contentful.com/spaces/73ald6l92kz4/api/keys/5BaafGMxncKTY4QubHvDlU)
3. `cd client npm install` (Probably easiest in a separate tab/window)
4. In project root, copy the .sample-env file and rename it .env.
5. Start the node server: `npm start`
6. Start React in ./client: `npm start`

## For Contentful management api access and content entry:

Contentful requires https to access their OAuth. I couldn't find the exact place I created my certs but a quick google search shoup pop up with how to create https certs locally. After creating the certs, I'd suggest copying example-local.js in ./server/ and renaming it local.js. Theres already a npm command `npm run local` that you can use INSTEAD of npm start for running your local server. This creates an extra port 3080 that runs https and can be used to get an access key from contentful. The downside of the 3080 port is that it is only running a pre-built version of react. What I do is go to https://localhost:3080/oauth/authenticate. This will save your access token to your react localStorage. You can then copy that key (Chrome devtools -> Application -> Storage -> Local Storage -> https://localhost:3080 -> "token") and go to http://localhost:3000/oauth/redirect#access_token=PASTE_ACCESS_TOKEN_HERE. This should use the same token and save it to your local development version of react.
