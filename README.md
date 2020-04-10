# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.


## Get started

Remix this app on Glitch and you should be ready to go!

When the Glitch runs `npm run build`, this app uses rollup to package everything.

When `npm run start` is run, this app uses [sirv](https://github.com/lukeed/sirv) to serve the static site.


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```