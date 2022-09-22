# Lowkey

Lowkey is a typing test inspired by [Monkeytype](https://monkeytype.com/).

This is project is made as a side project, it is not meant for competitive type tests.

[DEMO](lowkey.thect.cc)

## Getting Started

Open [next.config.js](next.config.js:5) in a text editor, delete the `basePath` line. This value is added to make sure it build's propely on github pages, but it needs to be removed whem running locally.

```bash
npm i

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## TODO

This is still a WIP, missing most functionalities you'd expecte in a modern web-base typing test website.

I'm still implementing basic type test part. I want to connect it to serveices like firebase in the future, to save test scores (up to a certain amount).

We need a (or multiple) common english wordset, and the wordset itself must be clear without copyright issue.
