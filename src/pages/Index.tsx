import {ApplicationComponent} from "../views/ApplicationComponent";
import * as React from "react";
import * as reactdom from "react-dom";

async function main() {
    reactdom.render(
        <ApplicationComponent/>,
        document.getElementById("react-entry-point"),
    );
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main, false);
} else {
    main();
}
