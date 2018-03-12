# Giphy Buddy

Giphy Buddy project app with React/Redux.

<https://playgroundreact.firebaseapp.com/>

## Requirements

Install the following.

* [Yarn >= 1.3.2](https://yarnpkg.com)

```shell
brew install yarn
```

## Setup

From the app's root directory, install the app's Node package dependencies.

```shell
yarn install
```

Initialize Firebase and populate your Firebase project configuration.

```shell
"
  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: ""
  };
" > ./src/actions/index.js
```

## Development server

Run `yarn start` from the app's root directory for a development server.

Navigate to `http://localhost:3000/`. The app will automatically reload if you
change any of the source files.
