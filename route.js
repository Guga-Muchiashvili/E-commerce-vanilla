const route = (event) => {
    event = event || window.event;
    event?.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};



const routes = {
    404: "/pages/404.html",
    '/': '/pages/MainPage.html',
    "/about": "/pages/AboutPage.html",
    "/products": "/pages/Allproducts.html",
    "/contact": "/pages/ContactsPage.html",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    console.log(path);
    const routePath = path || "/main";
    const routeUrl = routes[routePath] || routes[404];

    const html = await fetch(routeUrl).then((data) => data.text());
    console.log(path)

    const mainPageElement = document.getElementById("root");
    if (mainPageElement) {
        mainPageElement.innerHTML = html;
    }
};

window.onpopstate = handleLocation;
(window).route = route;
handleLocation()
export default handleLocation