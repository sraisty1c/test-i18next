# Test Repo (i18next, React, Typescript, Jest/Enzyme, Webpack)

`esModuleInterop: false`

`import * as i18next from 'i18next'`

---

This repo is a full explanation with a working example of `esModuleInterop: false` (NOT RECOMMENDED):
https://github.com/rosskevin/test-i18next/tree/non-esmoduleinterop-ts-loader

and a companion branch of `esModuleInterop: true` (RECOMMENDED).
https://github.com/rosskevin/test-i18next/tree/esmoduleinterop

I want to be clear: this is not a _typescript problem_, it is one that _typescript exposes_. Webpack insists on specific loader semantics, nodejs is stuck in commonjs loading semantics, libraries offer various bundles for consumer optimization (commonjs, esm), and test tools have a different runtime than web browsers.

`esModuleInterop: false` says:

> I know what I am doing, I care about the differences and I want it to break.

This IS NOT what userland typically wants. If you are not an expert user that wants to master the module types differences in imports and manipulation of module loading for jest and webpack, then DO NOT use this setting. If you want it to just work, typescript is quite awesome, it covers all of these differences noted above with a simple `esModuleInterop: true`.

---

A lot of background here:
https://github.com/i18next/react-i18next-gitbook/issues/63#issuecomment-547144241

Using typescript's `esModuleInterop: false` where you are saying effectively:

> I know the difference between commonjs and esm modules, I care about how they are imported and exported, and I want to break if there is a difference.

This has implications that most people don't care, or want to know about.

This issue particularly affects i18next among many other dependencies because it uses `export default` (strongly discouraged in my opinion) as well as offers `commonjs`, `esm`, `umd` (quite nice in my opinion).

- Is this dependency `esm`? `commonjs`?
- Does it use `export default`? `export {named}`? `module.exports =`? `module.exports = {named}`

Do you care about this? really? If not, **use** `esModuleInterop: true` and `allowSyntheticDefaults: true` **and be done with all of this.**

## Still here?

I assume you **REALLY** want to make `esModuleInterop: false` work, I have found one reliable way to do so for all of the tech, see this code.

Namely:

1. Use ts-loader before babel and FORCE `es5` production
2. Alter webpack `mainFields` to FORCE `main` resolution of commonjs modules before `module` (`esm`)

If you do this, it will work for all. Do I recommend this? ABSOLUTELY NOT. I DO NOT but it is your prerogative.

# Test all of it

These scripts are setup to expediently test all stages of this process. THIS IS NOT a starter project, but an example to verify working status.

```
cd <PROJECTDIR>
npm install
npm run start
```

Then navigate to http://localhost:3000

## TL;DR

- recommended settings are better indicated by the `esmoduleinterop` branch which is much simpler and **JUST WORKS**. https://github.com/rosskevin/test-i18next/tree/esmoduleinterop
- libraries can prevent this sort of thing entirely by using named exports. There is no incompatibility in resolution past/present. I repeat, do not use `export default` and this entire problem disappears, both in js and typescript land.
- this is not a "typescript" problem, but it is [one that typescript exposes](https://github.com/i18next/react-i18next-gitbook/issues/63#issuecomment-547147927). One such example is from a non-typescript commonjs library loading issue in webpack https://github.com/webpack/webpack/issues/5756.
