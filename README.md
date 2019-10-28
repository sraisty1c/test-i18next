# Test Repo (i18next, React, Typescript, Jest/Enzyme, Webpack)
This test repo reproduces issues that we are seeing with moving our React-Typescript project from using i18next v17.1.0 and react-i18next 10.13.1 to current versions (i18next v17.3.1 & react-i18next v10.13.2).

Everything worked before with the older versions, but we can't seem to get rid of type error occurring in our i18n.ts file, where we import the i18next instance, then we initialize it, and re-export it.

The error we see is: "Uncaught TypeError: i18n.use is not a function at Object../src/app/i18n.ts (i18n.ts:9)"

Basically, depending on how I import i18next into my i18n.ts file, either:
1) the web app fails in the browser with this type error,  but my jest/enzyme integration tests pass,
OR
2) the web app works fine (no error) but all my jest/enzyme tests fail with the aforementioned type error.

## My attempts to fix this:

1) If I do the following in my i18n.js , then the tests pass but the web app fails in the browser:
```
import * as i18n from 'i18next';
```

2) If I do this instead, then the web app works, but tests fail:
```
import i18n from 'i18next';
```

3) If I do this (which I saw suggested in [this thread](https://github.com/i18next/i18next/issues/1177)), it fails in the browser but tests pass:
```
import * as i18nextDefault from 'i18next'
const i18n: typeof i18nextDefault = require('i18next');
```

4)  Setting tconfig's 'esModuleInterop' to TRUE works:  the web app works AND the tests all pass, but unfortunately I cannot use this project-wide setting because it causes dozens of other libraries used by our project to fail.

I have a sample repo that reproduces the problem here:


# To test the webapp

```
cd <PROJECTDIR>
npm install
npm run build
npm run start
```
Then navigate to http://localhost:3000

# To run the Jest/Enzyme integration tests
```
cd <PROJECTDIR>
npm run test
```
