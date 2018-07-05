import page from "page";

import app from "./app.js";

import home from "./pages/home.html";
import other from "./pages/other.html";
import things from "./pages/things.html";
import thing from "./pages/thing.html";
import subthing from "./pages/subthing.html";

const handler = (component, data = {}) =>
    ({ components, params }, next) => {
        components.push({
            component,
            data : Object.assign(data, params),
        });

        return next();
    };

// Set up the component hierarchy
page("*", (ctx, next) => {
    ctx.components = [];

    return next();
});

// This page has no children, so isn't a wildcard
page("/", handler(home));
page("/other", handler(other));
page("/things", handler(things, { foo : "This is a foo value" }));
page("/things/:thing/*", handler(thing));
page("/things/:thing/subthing/", handler(subthing));


// Translate component array into svelte state
page("*", ({ components }) => {
    const props = {};

    // data needs to always be an object or else nesting won't work
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

    console.log("state", app.get());
});

// Enforce exact matches only
page.strict(true);

// Start routing
page.start({ hashbang : true });
