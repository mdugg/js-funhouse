// DOM elements must be ready
// remember: DOM and HTML page / render are different
// 'load' used to be used more
// initializing project
// MVC MVVM

/*
    make JS less verbose
    JS is very flexible

    create an alias/wrapper for document.querySelector()
    similar to jQuery
    global variable
        const $ = () => document.querySelector.call(this, arguments);
        const $$ = () => document.querySelectorAll.call(this, arguments);

    can also use underscore const _
    create own library
    eg: 
        const _ = {
            domready: (e) => {
            
            }
        };

        _.domready =

    alias for event listeners:    
        HTMLElement.prototype.on = (a, b, c) => this.addEventListener(a, b, c);

    remove listener:
        HTMLElement.prototype.off = (a, b) => this.removeEventListener(a, b);

    HTMLElement.prototype.$ = (s) => this.querySelector(s);
    HTMLElement.prototype.$ = (s) => this.querySelectorAll(s);
*/
// import modules and chain methods

import Router from "./services/Router.js";
import Store from "./services/Store.js";
import API from "./services/API.js";

// Web Components Imports
// import all web components
// can optionally declare the define here
// register components
import MenuPage from "./components/MenuPage.js";
import OrderPage from "./components/OrderPage.js";
import DetailsPage from "./components/DetailsPage.js";
import { loadData } from "./services/Menu.js";

const $ = () => document.querySelector.call(this, arguments);
const $$ = () => document.querySelectorAll.call(this, arguments);
HTMLElement.prototype.on = () => this.addEventListener.call(this, arguments);
HTMLElement.prototype.off = () =>
	this.removeEventListener.call(this, arguments);
HTMLElement.prototype.$ = () => this.querySelector.call(this, arguments);
HTMLElement.prototype.$ = () => this.querySelectorAll.call(this, arguments);

// make Store and Router global
// pattern to attach to window object for global access
window.app = {};
app.router = Router;
app.store = Store;

// wait for event for manipulation
// window.addEventListener("DOMContentLoaded", async () => {
window.addEventListener("DOMContentLoaded", () => {
	// initialize router
	app.router.init();
	// go to API and store menu
	loadData();
});

navigator.serviceWorker.register("/serviceworker.js");

// renderTest()
//  test that we can call from the console that will render a list of categories from the loaded data.

// react to cart changes from a global level
// update the badge on the cart icon
// use DOM events, listen for data changes, and react
window.addEventListener("appcartchange", (event) => {
	const badge = document.getElementById("badge");
	// const qty = app.store.cart.length;
	const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
	badge.textContent = qty;
	badge.hidden = qty == 0;
});
/*
    - ADD button calls add to cart
    - add to cart is creating a new array with new cart
    - Proxy detects the change
    - Proxy broadcasts a DOM event over the window
    - this event is listened for across the app
*/
