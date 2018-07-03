import page from "page";

import App from "./app.html";

const app = new App({
    target : document.body,
    data   : {
        page : false,
    },
});

page.start({ hashbang : true });
