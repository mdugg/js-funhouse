/* 
    why need initialization
    'go:' will ask router to go to new URL
        we might want to change page but not history in browser
        don't want user to go back
        eg login form, back button shouldn't route back
            logout button is not going back in history
*/

const Router = {
	init: () => {
		// prevent nav link default, reaching to server
		document.querySelectorAll("a.navlink").forEach((a) => {
			a.addEventListener("click", (event) => {
				event.preventDefault();
				console.log("Link clicked");
				/*
                    need to call go
                    how do I now where I am right now?
                    read href property, many ways to do this
                        const url = a.href 
                        const url = a.getAttribute("href")
                    properties and attributes are not exactly the same
                    'a' is a variable used from outer function 1 - closure
                        const url = event.target.href;
                        const url = event.target.getAttribute("href")
                */
				const href = event.target.getAttribute("href");
				Router.go(href);
			});
		});
		// It listen for history changes
		// event handler for URL changes
		// if user clicks back button, set addToHistory=false to prevent adding
		window.addEventListener("popstate", (event) => {
			Router.go(event.state.route, false);
		});
		// Process initial URL
		// check the initial URL
		// is it a deep link ? starting point isn't always the home screen
		Router.go(location.pathname);
	},
	// react to URLs
	go: (route, addToHistory = true) => {
		console.log(`Going to ${route}`);
		// do something in the DOM
		// do we want to add to history ?
		if (addToHistory) {
			// add lots of options here like scroll position etc
			history.pushState({ route }, "", route);
		}
		let pageElement = null;
		switch (route) {
			case "./projects/spa-coffee-masters/":
				// pageElement = document.createElement("h1");
				// pageElement.textContent = "Menu";
				pageElement = document.createElement("menu-page");
				break;
			case "./projects/spa-coffee-masters/order":
				pageElement = document.createElement("order-page");
				break;
			default:
				// regular expressions are frequently used for dynamic URLs
				// product-23 product/23 - whatever URL pattern
				if (
					route.startsWith("./projects/spa-coffee-masters/product-")
				) {
					pageElement = document.createElement("details-page");
					pageElement.dataset.productId = route.substring(
						route.lastIndexOf("-") + 1
					);
				}
				break;
		}
		/* 
            clear any existing content or JS will just keep adding elements
            easy method if it's just a string:
		        document.querySelector("main").innerHTML = "";
            also use .childNodes or .children and .remove() method
            
        */
		// document.querySelector("main").appendChild(pageElement);
		// wrap in if so else can be a 404
		if (pageElement) {
			// get current page element
			let currentPage = document.querySelector("main").firstElementChild;
			if (currentPage) {
				let fadeOut = currentPage.animate(
					[{ opacity: 1 }, { opacity: 0 }],
					{ duration: 200 }
				);
				fadeOut.addEventListener("finish", () => {
					currentPage.remove();
					document.querySelector("main").appendChild(pageElement);
					let fadeIn = pageElement.animate(
						[{ opacity: 0 }, { opacity: 1 }],
						{ duration: 200 }
					);
				});
			} else {
				document.querySelector("main").appendChild(pageElement);
			}
		}
		// reset scroll position when changing route
		window.scrollX = 0;
	},
};

export default Router;
