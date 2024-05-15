import About from "./scripts/pages/About";
import Contacts from "./scripts/pages/contact";
import mainpage, { fetchBrendList } from "./scripts/pages/MainPage";
import Products from "./scripts/pages/Products";

const route = (event, destiny) => {
    event = event || window.event;
    event?.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
    if (destiny == "home") {
        fetchBrendList()
    }
};

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

window.addEventListener('popstate', console.log('sdawd'))
export default handleLocation