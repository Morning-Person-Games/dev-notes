[Setup](#setup) | [Description / Tips](#description--tips) | [Local Setup](#local-setup)

Dev Notes is a digital journal streamlined to quickly jot down important thoughts and quickly find them later — like a searchable list of bookmarks, or a simple blog with much less overhead.

**Try out the demo [here](https://dev-notes-demo.herokuapp.com/).**

## Setup

I would love for this to not be as threatening to non-devs down the line, but until then here's extra specific instructions.
If you want to check Dev Notes out locally see: [Local Setup](#Local-Setup).

### Prerequisites

- [A Contentful account](https://www.contentful.com/sign-up/)
- [Contentful's CLI tool](https://www.contentful.com/developers/docs/tutorials/cli/installation/)

### Git Repo and Contentful Setup

- First off: `$ git clone https://github.com/Morning-Person-Games/dev-notes.git`
- `$ git remote add personal http://github.com/YOU/YOUR_REPO`
  - Optional: `$ git fetch upstream` for easier access to any updates!
- `$ git push origin main`
- If you haven't created a Contentful account already, [go ahead and do that](https://www.contentful.com/sign-up/).
- Create a new empty Space from your [Contentful app home](https://app.contentful.com/) (new accounts have access to one free Space).
- On your new empty Contentful Space navigate to Settings -> API Keys -> Content Management Tokens and generate a new personal token.
- Take that token and run: `$ contentful login --management-token <management-token-here> `
- In the project root:`$ contentful space import --space-id <space-id-here> --contentFile dev_notes_export.json`
  - If you're looking for your Space ID most URL paths within your Contentful Space start with `/spaces/SPACE-ID-HERE/...`

As long as that went well, your Contentful Space should be ready for hosting.

### Hosting

There's a lot of options here, but I'm using Heroku. There's also a couple ways to set it up in Heroku but in generally its pretty simple. You'll need to connect a Heroku app to your personal git branch of Dev Notes and then set up your Environment Variables (Apps -> Settings: Config Vars section). You'll need to input the following into Config Vars:

- CONTENTFUL_DELIVERY_SECRET: On Contentful go to your Space -> Settings -> API KEYS -> Add API Key. You can also find your SPACE ID here
- CONTENTFUL_SPACE_ID: See above.
- CONTENTFUL_OAUTH_ID: Set OAuth up [here](https://app.contentful.com/account/profile/developers/applications/new)
- CONTENTFUL_OAUTH_REDIRECT_URI: WhateverYourDomainIs.com/oauth/redirect

I'd love for this whole process to be way more accessible but that's a chunk of time I'm not willing to spend without interest.

## Description / Tips

Every **Note** has a title or **Topic**, can have any number of **Solutions** and/or **Tags**, and are categorized in... **Categories**.

**Solutions** are the text body(s) of a Topic. I'd bet 75% of mine are stackoverflow links. Also! Pasting a url to an image will automatically render the image in the content list.

**Tags**... well everyone knows tags by now. I like to make broader Topics and use less Tags, but Tags are still good in a pinch.

**Categories** define which topics can be found when you start typing in the search bar, so they are very impactful. If you find that you're not sure what category a Topic would be found in, it is likely you should make them more broad. I'm currently using Game Dev, Web Dev, and Misc as my current categories (Misc will be used sparingly and typically for keyboard shortcuts in various apps).

### Why not use \_\_\_?

**This very well could not be the right tool to help you.**
I found that I hate finding where I placed a bookmark, a giant google doc is awful to read through, and I don't want to spend 5 minutes just to logging in just to make a new entry... so here's my solution. With that in mind, I made Dev Notes for myself, and it is specifically designed with what I think will help my memory best. I'm constantly trying to minimize the amount I depend on ~~dumb luck~~ remembering anything off-hand. For me, simply dumping links in a giant doc has been immensely helpful and relieved a ton of stress of late.

### Settings / Themes
A selection of preset themes and fonts, as well as a font-size are all availble as settings to customize the appearance of Dev Notes. If you'd like to add your own theme you can do so in Contentful by creating a Theme content type. While the theme form can be a bit overwhelming, the majority of the colors will calculate relative to the Primary and Highlight colors. But of course you can dive deeper into color customization and thats why the rest of the fields are available!

![Screenshot 2022-07-23 134656](https://user-images.githubusercontent.com/2497844/180622402-42d19803-606b-4964-b9b6-fb2d650d4553.png)

## Local Setup

If you plan on messing with the project locally there's a few things you'll need to do:

1. Copy and rename `.example-env` to `.env `
2. In Contentful go to Settings -> API Keys and create one for yourself.
3. Set `CONTENTFUL_DELIVERY_SECRET` in `.env` to your new **Content Delivery API - access token**.
4. Set `CONTENTFUL_SPACE_ID` to your Contentful Space ID.
5. Probably best to do a `npm install && cd client/ && npm install` for good measure.
6. `npm start` in root, and in a separate instance `npm start` in `./client/` then you're all set!

### If you want to use Contentful content management API:

1. Copy and rename `/server/example-local.js` to `/server/local.js`.
2. Create an SSL Certificate through whatever means. Just make sure to fix the file names/locations in your `local.js` line 8-10
3. [Create a Contentful OAuth App](https://app.contentful.com/account/profile/developers/applications/new) with Read and Manage access (it does not need to be Confidential).
   Your redirect should look like this: https://localhost:3080/oauth/redirect
4. Hook up those new values into each of the follow OAuth environment variables: `CONTENTFUL_OAUTH_ID`, `CONTENTFUL_OAUTH_SECRET`, `CONTENTFUL_OAUTH_REDIRECT_URI`
5. Now run `npm run local` instead of start for your node server.
6. This parts a bit weird but its the best I could do with Contentful giving the access key through the URL: go to https://localhost:3080/login. This will not correctly log you, but you should see see your key in the URL. Adjust that URL so you keep the access_token but are back on your local React instance (should look something like: http://localhost:3000/oauth/redirect#access_token=TOKEN)
