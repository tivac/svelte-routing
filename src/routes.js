import page from "page";

import app from "./app.js";

import home from "./pages/home.html";

page("/", () => {
    app.set({
        page : home,
        data : {},
    });
});

import one from "./pages/one.html";

page("/one", () => {
    app.set({
        page : one,
        data : {
            foo : "Data is set ok",
        },
    });
});

// Start routing
page.start({ hashbang : true });
