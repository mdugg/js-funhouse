import {
	clearSearchText,
	setSearchFocus,
	showClearTextButton,
	clearPushListener,
} from "./searchBar.js";
import {
	deleteSearchResults,
	buildSearchResults,
	clearStatsLine,
	setStatsLine,
} from "./searchResults.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";

document.addEventListener("readystatechange", (event) => {
	if (event.target.readyState === "complete") {
		initApp(); // page has loaded fully
	}
});

const initApp = () => {
	// set the focus immediately on text input
	setSearchFocus();
	// 3 listeners for the clear text button
	const search = document.getElementById("searchInput");
	search.addEventListener("input", showClearTextButton);
	const clear = document.getElementById("clearButton");
	clear.addEventListener("click", clearSearchText);
	// listen for the enter key:
	clear.addEventListener("keydown", clearPushListener);

	// 1 listener on the form:
	const form = document.getElementById("searchBarForm");
	form.addEventListener("submit", submitTheSearch);
};

// procedural workflow function
// call other functions in order needed
// on submit event :
const submitTheSearch = (event) => {
	event.preventDefault(); // prevent form from re-loading the page
	// delete search results and show new results
	deleteSearchResults();
	// process the search
	processTheSearch();
	// set the focus event searchBar.js
	setSearchFocus();
};

// procedural, so not inside a module
// async function interacts with Wikipedia API
const processTheSearch = async () => {
	// clear the stats line
	clearStatsLine();
	const searchTerm = getSearchTerm();
	// if search input is empty exit script, no API call yet
	if (searchTerm === "") return;
	// but if it's not...
	// start the async await process and wait for results
	const resultArray = await retrieveSearchResults(searchTerm); // defined in dataFunctions.js
	// are there results ?
	if (resultArray.length) buildSearchResults(resultArray); // build search results
	// set stats line
	setStatsLine(resultArray.length);
};
