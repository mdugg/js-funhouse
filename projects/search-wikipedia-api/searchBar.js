export const setSearchFocus = () => {
	document.getElementById("searchInput").focus();
};

export const showClearTextButton = () => {
	const search = document.getElementById("searchInput");
	const clear = document.getElementById("clearButton");
	// if value length is greater than 0 statement is true
	if (search.value.length) {
		clear.classList.remove("visually-hidden");
		clear.classList.add("button__search-clear");
	} else {
		clear.classList.add("visually-hidden");
		clear.classList.remove("button__search-clear");
	}
};

export const clearSearchText = (event) => {
	event.preventDefault;
	document.getElementById("searchInput").value = "";
	const clear = document.getElementById("clearButton");
	clear.classList.add("visually-hidden");
	clear.classList.remove("button__search-clear");
	setSearchFocus();
};

export const clearPushListener = (event) => {
	if (event.key === "Enter" || event.key === " ") {
		event.preventDefault();
		document.getElementById("clearButton").click();
	}
};
