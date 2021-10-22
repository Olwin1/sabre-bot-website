# 📜 Barebones React/Sass/Express/TypeScript Boilerplate

&nbsp;

## 📁 Table of Contents

-   [🧠 Purpose](#-purpose)
-   [👟 Running the Project](#-running-the-project)
-   [💬 Server](#-server)
-   [💻 Client](#-client)
    -   [🙌 Styling the App](#-styling-the-app)
-   [🗄️ Configuration Files](#%EF%B8%8F-configuration-files)
    -   [⁉️ Webpack Config 🤦🤦](#%EF%B8%8F-webpack-config-)
-   [🔐 Closing Remarks](#-closing-remarks)

&nbsp;

## 🧠 Purpose

This project is a Typescript based React JS App That Uses A Express Local API Server As The Backend.  With A Webpack Bundler.  I Gave My Sanity For This...

&nbsp;

## 👟 Running the Project

If you already know the process of cloning a repository then follow the normal process and use the script `npm run dev` to get up and going!

If you're new or are interested in the steps and their purpose, then let's dive on in!

&nbsp;

Optionally:

```bash
npm run start
```

We will use this script in production. We don't need all the auto-restart stuff from the `watch:*` scripts. Just start the server and be done with it.

-   This assumes you have a `dist/server.js` and `public/js/app.js` already built.

&nbsp;

## 💬 Server

The server build process compiles the TypeScript files found in `src/server` into a single bundled JavaScript file (`server.js`) located in the `dist` directory, which is created for us during the process.

This will be where we code all things relating to our database, which will be PostgreSQL. It's where we'll include all of our REST API routes. All of our back-end utilities. While there are tricks to share its code, we **will not be sharing** any code from our `src/server` folder into `src/client`. If you find yourself wanting to import anything directly to your client code _from_ your server code. ✋ Stop ✋ and rethink how you're trying to solve this problem. For all intents and purposes back-end and front-end are entirely separate realms of existence.

&nbsp;

## 💻 Client

The client build process compiles the TypeScript files found in `src/client` into a single bundled JavaScript file (`app.js`) located in the `public/js/` directory, which is created for us during the process.

This will be where we code all things related to our React app and what a user will see and interact with in the browser. That's it. If it needs to ask for any information on the back-end, you will 99% of the time do so via a `fetch` request that hits one of your REST API endpoints.

&nbsp;

#### 🙌 Styling the App

The `src/client` configuration will also build the SASS files found at `src/client/scss` directory. The `index.tsx` imports the `app.scss` file which includes an import for Bulma. Notice how the Bulma import in the `src/client/scss/app.scss` file is at the _bottom_ of the file. This is because our expected overrides are expected above that import. Think of it as "here's my custom Bulma injections 💉 .. and now load Bulma with my changes, mwahaha!"

Thankfully, you can write normal CSS just as you like! Add class selectors, element selecotrs, and id selectors to your hearts 💖 content. There are, however, several SASS tricks you can research on Google, Stack Overflow, Youtube, and etc.

```css
$body-background-color: #06040B;
```

This takes the Bulma variable `body-background-color:` The entire Background Will Now Be That Colour!

&nbsp;

## 🗄️ Configuration Files

-   `.gitignore` is what we use to **not** push certain files or folders to GitHub. This starts with our dependencies and production bundles being ignored. Feel free to add any file that contains sensitive information away from GitHub using this. A common addition would be a `.env` file, for example, that contains our 3rd Party API Keys.

-   `package-lock.json` is automatically generated whenever you run a command that modifies `node_modules` or `package.json`. It describes the exact modification that was made, such that subsequent installs are able to generate identical modifications, regardless of intermediate dependency updates.

-   `package.json` you've seen this one a lot, it's the basic "metadata" relevant to the project and it is used for managing the project's dependencies, scripts, version and a whole lot more.

-   `README.md` the markdown file that displays here in GitHub that you're reading right now. And what I probably use as my reference when I fuck up!

-   `tsconfig.client.json` the TypeScript rules our TSC compiler will follow and allow when building our React app. There are several options to play with to standarize `import` statements, allow the use of `any` (don't do this though lol), but make sure not to remove `"jsx": "react",` by mistake or it won't know what you're trying to write in those `.tsx` files!

-   `tsconfig.server.json` the same as above, basically, except for our server code. We tell it to include the types for `node` and `express` so it can help us write the basics of our server with improved intellisense support and less manual strong typing. Basically it makes our TSC "infer" some of the basic server types for us automatically.

-   `webpack.config.js` the rules, loaders, and plugins our entire build process follows. There's a lot of stuff _bundled_ 🤣🤣 in this one .. so let's break down the high points in its own subsection below.

&nbsp;

#### ⁉️ Webpack Config 🤦🤦

>When I was but a young dev student, I once attended a local meetup about React when it was still fairly new. The speaker was a very experienced dev who was leading our "lunch and learn" discussion. My favorite quote he lead with is forever forged into my memories. "I spent the last week trying to learn more about Webpack so I can talk about it up here today and teach you all. I feel like I know less than when I started."

That sums up my own thoughts better than my own words could. That being said, here's what you're staring at, and we're gonna literally go top down on this sucker:

&nbsp;

```js
const nodeExternals = require('webpack-node-externals');
```

When bundling with Webpack for the backend - you usually _don't want_ to bundle its `node_modules` dependencies. This library creates an externals function that ignores node_modules when bundling in Webpack. So this is used as a "plugin" in the config here: `externals: [nodeExternals()]` in the `serverConfig` object. Basically it's making sure we're not trying to build external stuff by accident that doesn't need to be.

&nbsp;

```js
const serverConfig = { ... }
```

This is the object we create for the compile and bundle process for our `src/server` code.

&nbsp;

```js
mode: process.env.NODE_ENV || 'development',
```

This tells Webpack whether it's in `development` or some other mode, typically `production`. Are we goofing around on our local machines tinkering with a new feature and we want verbose error messages that trace back in source code where the problem occured? Or are we debugging a problem after we deploy our site and wonder why it crashed after we let our friend touch it? Webpack will have different types of outputs depending on this. Note that it defaults to `development` unless we set `NODE_ENV` as an environment variable to `production`.

&nbsp;

```js
module: { ... },
resolve: { ... },
output: { ... },
target: 'node',
```

Don't stress about the guts of these properties, just focus on their general purpose.

-   `module` lets us specify what to do with certain file extensions. If Webpack encounters a `.ts` extension, we provide rules, loaders, and options for it to do certain tasks when building them.
-   `resolve` this deals with how modules are "resolved." As in if we write `import 'lodash'` in ES2015, the resolve options can change where webpack goes to look for 'lodash' for us. You probably won't mess with this much.
-   `output` is where we output our bundle to, which is `dist/server.js`.
-   `target` because JavaScript can be written for both server and browser, webpack offers multiple deployment targets that you can set in your configuration. This is the server object, so we make sure to tell Webpack we're using server JavaScript code.

&nbsp;

```js
const clientConfig = { ... }
```

This is the object we create for the compile and bundle process for our `src/client` code.


&nbsp;

```js
devtool: 'inline-source-map',
```

This _attempts_ to help you when developing your React app. Remember we're going through several "layers" before running our code in the browser. TypeScript React down to JavaScript React down to JavaScript DOM using `React.createElement();` and into the browser. That's a bunch of steps in between what you write and what you see running! This attempts to map back to your original source code what error or what is running the browser.


&nbsp;

## 🔐 Closing Remarks

There are a lot of moving parts even in this simple webapp!

Code, code, and code. Build shit and deploy. Get projects up and running, conceptually finished, and no matter how dumb. You will always learn something new. Challenge yourself to use different CSS Kits and libraries. Try other database connectors. Try React libraries like Redux. Even if you aren't getting paid for it, it's still valuable experience for you. So happy coding, and have some fun!
