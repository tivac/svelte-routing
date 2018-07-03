# svelte-routing

This is an attempt to wire together [`svelte`](https://github.com/sveltejs/svelte/) and [`page`](https://www.npmjs.com/package/page) in a way that allows for smartly nested components much like you'd get with something like [`abstract-state-router`](https://github.com/TehShrike/abstract-state-router).

The general idea:

1. A route that matches everything runs first and creates an array on the context object
1. Every route below that one pushes a `{ component, <data> }` object onto that array
1. There's a final wildcard route that turns the array into nested objects and sets that into the `svelte` app
1. Svelte components that nested children use `<svelte:component this={page.child} {...page.props}>`

You can see all of this happening within `/src/routes.js`.
