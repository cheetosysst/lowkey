# Lowkey

Lowkey is a typing test inspired by [Monkeytype](https://monkeytype.com/).

This is project is made as a side project, it is not meant for competitive type tests.

[DEMO](https://lowkey.thect.cc) deployed on vercel

## Getting Started

```bash
npm i

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## TODO

- Add wordset
- Upload test result to database
- Convert to ts
- Upgrade to next 13
- Reorganize components

I decided to convert this project to fully (or at least partially) working typing test, to use as my school assignment. So that's why you see me using databases directly instead of using a database.

I still want to add more wordset, but as for now it is a low priority task.

And on the topic of type safety, you see a lot of code here that is, to put it politely, less than ideal. I would love to make it typesafe, but I'm in a hurry to make this work before the semester ends.

For now, the demo is deployed on vercel, and I planned to keep it this way in the long term. But, I do want to make this database and hosting provider agnostic in the future, which means I will have to convert the current database implementation to use an ORM.

You can still use it without a database, the test itself does require any database connection to be present.
