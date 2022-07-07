## Setup

There's a bit of setup so bear with me:

1. After cloning `npm install`
2. Fill out the CONTENTFUL_DELIVERY_SECRET from the [Contentful API Keys page](https://app.contentful.com/spaces/73ald6l92kz4/api/keys/5BaafGMxncKTY4QubHvDlU)
3. `cd client npm install` (Probably easiest in a separate tab/window)
4. In project root, copy the .sample-env file and rename it .env.
5. Start the node server: `npm start`
6. Start React in ./client: `npm start`

npm install -g contentful-cli
Settings > API keys > Content management tokens > Generate personal token
contentful login --management-token <management-token>

## For Contentful management api access and content entry:

Contentful requires https to access their OAuth. I couldn't find the exact place I created my certs but a quick google search shoup pop up with how to create https certs locally. After creating the certs, I'd suggest copying example-local.js in ./server/ and renaming it local.js. Theres already a npm command `npm run local` that you can use INSTEAD of npm start for running your local server. This creates an extra port 3080 that runs https and can be used to get an access key from contentful. The downside of the 3080 port is that it is only running a pre-built version of react. What I do is go to https://localhost:3080/oauth/authenticate. This will save your access token to your react localStorage. You can then copy that key (Chrome devtools -> Application -> Storage -> Local Storage -> https://localhost:3080 -> "token") and go to http://localhost:3000/oauth/redirect#access_token=PASTE_ACCESS_TOKEN_HERE. This should use the same token and save it to your local development version of react.

## Tips

### Use Tags Sparingly and Name your Topic Titles Carefully

I almost took out tags entirely because in all honesty, titles will work best when they function a bit like tags ()

## Future Goals / Improvements

- Solution UX overhaul allowing adding additional Solutions and searching for existing Solutions to add to a Topic.
- Separate repo to setup with external search engine (Contentful suggests Algolia)
-
- Public/Private categories to hide any or all Topics behind Contentful login.
- Pinned Topics to keep go to Solutions easy to access.
- Shortcuts for less mouse more typing.
- Read more / Fetch limitting/optimization
- Better and more error messages for when problems arise.
- Optimization: Caching and better component setup for less re-rendering.

### On Request / Based On Usage

- Host on Heroku without CLI. For users that are used to working through CLI. I don't know how possible this is but _I want it_
- Locale customization: I'd basically hop on improvements needed to improve UX for other languages the moment it was requested.
- Multi-category search: While I do think that categories should define what is being searched, and you can already accomplish this on contentfuls end, I can see having a easy-access back-up being helpful.
- Browser Extension? Haven't researched this much but was given this suggestion and it seems interesting to have a tool to quickly throw a topic onto the site from the current webpage. An alternate form of bookmarking if you will.
- Topic URL Routes: I haven't really felt the urge/need for this but it could be nice if expanded views of individual topics were available by URL. Slug field is already available for this functionality.
