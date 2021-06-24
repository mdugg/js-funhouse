localStorage.setItem("name", "Marty");
localStorage.getItem("name");
// localStorage.removeItem("name");

sessionStorage.setItem("name", "Duggz");
sessionStorage.getItem("name");

document.cookie = "name=Duggz; expires=" + new Date(2025, 0, 1).toUTCString();

// https://www.debugcn.com/en/article/46461637.html
// https://codepen.io/Bes7weB/pen/KKgRNjV?editors=0010
// How LocalStorage and Event Delegation work. #JavaScript30 15/30
// https://www.youtube.com/watch?v=YL1F4dCUlLc&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=16
// LocalStorage for beginners (HTML and Javascript)
// https://www.youtube.com/watch?v=rVyTjFofok0

/*===== EXPANDER MENU  =====*/
const showMenu = (toggleId, navbarId, bodyId) => {
	const toggle = document.getElementById(toggleId),
		navbar = document.getElementById(navbarId),
		bodypadding = document.getElementById(bodyId);

	if (toggle && navbar) {
		toggle.addEventListener("click", () => {
			navbar.classList.toggle("expander");

			bodypadding.classList.toggle("body-pd");
		});
	}
};
showMenu("nav-toggle", "navbar", "body-pd");

/*===== LINK ACTIVE  =====*/
const linkColor = document.querySelectorAll(".nav__link");

function colorLink() {
	linkColor.forEach((l) => l.classList.remove("active"));
	this.classList.add("active");

	// Added this to read data attribute
	let this_index = this.getAttribute("data-nav_link_index");
	localStorage.setItem("active_nav_link", this_index);
}
linkColor.forEach((l, i) => {
	l.addEventListener("click", colorLink);

	// Added this to set data attribute
	l.setAttribute("data-nav_link_index", i);

	// Added this to add the active class
	if (localStorage.getItem("active_nav_link") == i) {
		l.classList.add("active");
	} else if (localStorage.getItem("active_nav_link") !== null) {
		l.classList.remove("active");
	}
});

/*===== COLLAPSE MENU  =====*/
const linkCollapse = document.getElementsByClassName("collapse__link");
var i;

for (i = 0; i < linkCollapse.length; i++) {
	linkCollapse[i].addEventListener("click", function () {
		const collapseMenu = this.nextElementSibling;
		collapseMenu.classList.toggle("showCollapse");

		const rotate = collapseMenu.previousElementSibling;
		rotate.classList.toggle("rotate");
	});
}
