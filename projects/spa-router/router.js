const route = (event) => {
	// capture click event for link and prevent default
	event = event || window.event;
	event.preventDefault();
	// history API
	// update URL but nothing else
	window.history.pushState({}, "", event.target.href);
	handleLocation();
};
const root = "http://127.0.0.1:5500/projects/spa-router/";
const routes = {
	404: "./404.html",
	"/projects/spa-router/overview": "./overview.html",
	"/projects/spa-router/customers": "./customers.html",
	"/projects/spa-router/orders": "./orders.html",
};
const handleLocation = async () => {
	// capture path name of current location
	const path = window.location.pathname;
	console.log(path);
	// go to route or 404
	const route = routes[path] || routes[404];
	console.log(route);
	// load in html of route
	const html = await fetch(route).then((data) => data.text());
	// display in html
	document.getElementById("main").innerHTML = html;
};
// forward and back in the browser
window.onpopstate = handleLocation;
// global access to route function
window.route = route;
// handle landing page for app
handleLocation();

// const menu = document.querySelectorAll(".menu-item");
// console.log(menu);
