const route = (event) => {
    event = event || window.event;
    event?.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

import About from "./scripts/pages/About";
import Contacts from "./scripts/pages/contact";
import mainpage from "./scripts/pages/MainPage";
import Products from "./scripts/pages/Products";

const routes = {
    404: "/pages/404.html",
    '/': mainpage,
    "/about": About,
    "/products": Products,
    "/contact": Contacts,
};

console.log(About)
const handleLocation = async () => {
    const path = window.location.pathname;

    const routePath = path || "/";
    const routeUrl = routes[routePath] || routes[404];
    const mainPageElement = document.getElementById("root");
    if (mainPageElement) {
        mainPageElement.innerHTML = routeUrl;
    }
};

window.onpopstate = handleLocation;
(window).route = route;
handleLocation()
export default handleLocation