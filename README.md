# svelte-routing

This is an attempt to wire together [`svelte`](https://github.com/sveltejs/svelte/) and [`page`](https://www.npmjs.com/package/page) in a way that allows for smartly nested components much like you'd get with something like [`abstract-state-router`](https://github.com/TehShrike/abstract-state-router).

## Approach Details

1. A route that matches everything runs first and creates an array on the context object
```js
page("*", ({ context, next }) => {
  context.components = [];
  
  return next();
});
```
2. Routes after the first wildcard push a `{ component, <data> }` object onto that array
```js
page("/route", ({ context, next }) => {
    context.components.push({
        component : /* ... */
        data      : /* ... */
    });
    
    return next();
});
```
3. There's a final wildcard route that turns the array into nested objects and sets that into the `svelte` app

```js
components.reduce((prev, { component, data = {} }) => {
    prev.page = {
        child : component,
        // Setting page to null is important to avoid stale state
        // bugs when moving up & down the tree
        props : Object.assign(data, { page : null }),
    };

    return prev.page.props;
}, props);

app.set(props);
```

4. Components that nest children then use `<svelte:component this={page.child} {...page.props}>` to pass along the nested component/object mixes to their children.

## Nested Components via Wildcard Routes

By using nested routes with trailing wildcards you can get persistent nested UI components, with all the svelte lifecycle hooks working like you'd expect.

```js
page("/route/*", ...);

// The component for the previous route still exists if you
// navigate from /route to /route/subroute, it isn't recreated
page("/route/subroute", ...);
```

You can see all of this happening within [`/src/routes.js`](https://github.com/tivac/svelte-routing/blob/master/src/routes.js).
