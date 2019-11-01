# esModuleInterop explanation

This is a working test repo with i18next, React, Typescript, Jest/Enzyme, Webpack

---

`esModuleInterop: false`

`import * as i18next from 'i18next'`

---

This repo is a full explanation with a working example of `esModuleInterop: false` (NOT RECOMMENDED):
https://github.com/rosskevin/test-i18next/tree/non-esmoduleinterop-ts-loader

and a companion branch of `esModuleInterop: true` (RECOMMENDED).
https://github.com/rosskevin/test-i18next/tree/esmoduleinterop

---

I want to be clear: this is not a _typescript problem_, it is one that _typescript exposes_. Webpack insists on specific loader semantics, nodejs is stuck in commonjs loading semantics, libraries offer various bundles for consumer optimization (commonjs, esm), and test tools have a different runtime than web browsers.

`esModuleInterop: false` says:

> I know the difference between commonjs and esm modules, I care about the semantics of how they are imported and exported, I care about how each of my runtimes are going to load those modules, and I want to break if there is a difference.

This has implications that most people don't care, or want to know about.

This IS NOT what a user typically wants. If you are not an expert user that wants to master the module types differences in imports and manipulation of module loading for jest and webpack, then DO NOT use this setting. If you want it to just work, typescript is quite awesome, it covers all of these differences noted above with a simple `esModuleInterop: true`.

## Background

This stemmed from a new user sample: https://github.com/i18next/react-i18next-gitbook/issues/63#issuecomment-547144241

This issue shows up in i18next repo often for new users I think for a few reasons:

1.  i18next is very popular and one of the first libraries added to new efforts
2.  i18next uses `export default` in addition to other named exports from the index and offers `commonjs` as well as `esm` builds
3.  typescript defaults `esModuleInterop: false` instead of the easier path of `true`

i18next is certainly not alone, this is a problem will show up in many dependencies, but it just hits i18next very early because it is very early in any runtime setup.

## Gory details

A combination of things make this difficult to understand, it is actually an entire set of circumstances that makes different syntaxes and modules incompatible:

1. node uses `commonjs` dependencies (e.g. jest)
1. webpack prioritizes `esm` `module` dependencies over `main` `commonjs`
1. `import * as` is valid ecmascript
1. typescript transpilation often targets `es2015`, allowing babel to deal with the rest.
1. `esModuleInterop: false` with `import * as i18n from 'i18next'` generates `var i18n = require("i18next")` which does not resolve the `module.default`. This is NOT a valid import for an `esm` module, but it is for a `commonjs` module.
1. `esModuleInterop: true` with `import i18n from 'ii18next'` generates `const i18next_1 = __importDefault(require("i18next"));`. Critically, this generated `__importDefault` helper is triggered to resolve the `default` module and works for BOTH `commonjs` and `esm` modules.

Many libraries `export default` (strongly discouraged in my opinion) as well as offer `commonjs`, `esm`, `umd` (quite nice in my opinion).

If you use `esModuleInterop: false` then you have to know and manipulate for:

- Is this dependency `esm`? `commonjs`?
- Does it use `export default`? `export {named}`? `module.exports =`? `module.exports = {named}`
- Am I running it with node (`commonjs`) or webpack (default priority is `esm` then `commonjs`)

## Still here?

Do you care about this? really? If not, **use** `esModuleInterop: true` and `allowSyntheticDefaults: true` **and be done with all of this.**

I assume you then **REALLY** want to make `esModuleInterop: false` work, I have found one reliable way to do so for all of the various module types and loaders, both jest/node and webpack.

Namely:

1. Use ts-loader before babel and FORCE `target: es5` production via `tsconfig.json`
2. Alter webpack `mainFields` to FORCE `main` resolution of commonjs modules before `module` (`esm`)

If you do this, it will work for jest and webpack. Do I recommend this? ABSOLUTELY NOT. I DO NOT but it is your prerogative.

# Test all of it

These scripts are setup to expediently test all stages of this process. THIS IS NOT a starter project, but an example to verify working status.

```
cd <PROJECTDIR>
npm install
npm run start
```

Then navigate to http://localhost:3000

## TL;DR

- Use `esModuleInterop: true`, it is much simpler and **JUST WORKS**. https://github.com/rosskevin/test-i18next/tree/esmoduleinterop
- Libraries can prevent this sort of thing entirely by using **named** exports only - no default exports. There is no incompatibility in resolution past/present.
- I repeat, do not use `export default` and this entire problem disappears, both in js and typescript land.
- This is not a "typescript" problem, but it is [one that typescript exposes](https://github.com/i18next/react-i18next-gitbook/issues/63#issuecomment-547147927). One such example is from a non-typescript commonjs library loading issue in webpack https://github.com/webpack/webpack/issues/5756.
