import page from "page";

import app from "./app.js";

import home from "./pages/home.html";

// Set up the component hierarchy
page("*", (ctx, next) => {
    ctx.components = [];

    return next();
});

// This page has no children, so isn't a wildcard
page("/", ({ components }, next) => {
    components.push({
        component : home,
        data      : {},
    });

    return next();
});

import one from "./pages/one.html";

// Has children, wildcard!
page("/one*", ({ components }, next) => {
    components.push({
        component : one,
        data      : {
            foo : "Data is set ok",
        },
    });

    return next();
});

import subone from "./pages/one/subone.html";

page("/one/subone", ({ components }, next) => {
    components.push({
        component : subone,
        data      : {},
    });

    return next();
});

import subtwo from "./pages/one/subtwo.html";

page("/one/subtwo", ({ components }, next) => {
    components.push({
        component : subtwo,
        data      : {},
    });

    return next();
});


// Translate component array into svelte state
page("*", ({ components }) => {
    const props = {};

    // data needs to always be an object or else nesting won't work
    components.reduce((prev, { component, data = {} }) => {
        prev.page = {
            child : component,
            props : data,
        };

        return prev.page.props;
    }, props);
    
    app.set(props);
});

// Start routing
page.start({ hashbang : true });
