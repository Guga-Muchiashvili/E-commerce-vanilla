import About from "./scripts/pages/About";
import Contacts from "./scripts/pages/contact";
import mainpage, { fetchBrendList } from "./scripts/pages/MainPage";
import Products, { Productsfetch } from "./scripts/pages/Products";

const route = (event, destiny) => {
    event = event || window.event;
    event?.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "/pages/404.html",
    '/': mainpage,
    "/about": About,
    "/products": Products,
    "/contact": Contacts,
};

const handleLocation = async () => {
    const path = window.location.pathname;

    const routePath = path || "/";
    const routeUrl = routes[routePath] || routes[404];
    const mainPageElement = document.getElementById("root");
    if (mainPageElement) {
        mainPageElement.innerHTML = routeUrl;
    }
    if(routePath == '/'){
        fetchBrendList()
    }
    if(routePath == '/products'){
        Productsfetch()
    }
};

window.onpopstate = handleLocation;
(window).route = route;
handleLocation()

export default handleLocation