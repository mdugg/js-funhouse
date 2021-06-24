// variable is set on doc load and doesn't update onchange
// update variable when button is clicked
// let allows for variable to be changed
let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector("#dark-mode-toggle");

const enableDarkMode = () => {
	// add class darkmode to body
	document.body.classList.add("dark-mode");
	// update darkMode in local storage
	// key value pairs of strings
	localStorage.setItem("darkMode", "enabled");
};
const disableDarkMode = () => {
	// remove class
	document.body.classList.remove("dark-mode");
	localStorage.setItem("darkMode", null);
};

// on page load check local storage
// this persists the state
if (darkMode === "enabled") {
	enableDarkMode();
}

// check if dark mode is enabled
// if enabled - turn off
// if disabled - turn on
darkModeToggle.addEventListener("click", () => {
	// update variable on click
	darkMode = localStorage.getItem("darkMode");
	// console.log("toggle");
	// check first
	if (darkMode !== "enabled") {
		enableDarkMode();
		console.log(darkMode);
	} else {
		disableDarkMode();
		console.log(darkMode);
	}
});
