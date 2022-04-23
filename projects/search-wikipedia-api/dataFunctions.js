export const getSearchTerm = () => {
	// get value from search text input and get rid of white space
	const rawSearchTerm = document.getElementById("searchInput").value.trim();
	// regex for multiple spaces in a row within search term / phrase
	const regex = /[ ]{2,}/gi;
	// replace multiple spaces with 1 space
	const searchTerm = rawSearchTerm.replaceAll(regex, " ");
	return searchTerm;
};

export const retrieveSearchResults = async (searchTerm) => {
	const wikiSearchString = getWikiSearchString(searchTerm);
	const wikiSearchResults = await requestData(wikiSearchString);
	// define empty array
	// array will remain empty if hasOwnProperty is false
	let resultArray = [];
	if (wikiSearchResults.hasOwnProperty("query")) {
		// search for the property in the JSON - true false
		// if true has the query property
		// if false will skip past this
		resultArray = processWikiResults(wikiSearchResults.query.pages);
	}
	return resultArray;
};

const getWikiSearchString = (searchTerm) => {
	// tell Wikipedia API the maximum amount of characters we want back
	const maxChars = getMaxChars();
	const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
	/* parameters more readable...
    https://en.wikipedia.org/w/api.php
        ?action=query // type of action
            &generator=search // other options, allows search of more than 1 property
                &gsrsearch=${searchTerm} // saves having to do multiple queries, packages images and text
                &gsrlimit=20 // limit amount of results
            &prop=pageimages|extracts
                &exchars=${maxChars} 
                &exintro
                &explaintext
                &exlimit=max
            &format=json
            &origin=* // wildcard helps be unauthenticated and avoid CORS error
    */
	// eg: https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=Dachsund&gsrlimit=20&prop=pageimages|extracts&exchars=30&exintro&explaintext&exlimit=max&format=json&origin=*
	const searchString = encodeURI(rawSearchString);
	return searchString;
};

// max characters based on screen width
const getMaxChars = () => {
	// from either...
	const width = window.innerWidth || document.body.clientWidth;
	let maxChars;
	if (width < 414) maxChars = 65;
	if (width >= 414 && width < 1400) maxChars = 100;
	if (width >= 1400) maxChars = 130;
	return maxChars;
};

// helper function
const requestData = async (searchString) => {
	try {
		const response = await fetch(searchString);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error(err);
	}
};

const processWikiResults = (results) => {
	const resultArray = [];
	// get the pages key from the API
	Object.keys(results).forEach((key) => {
		const id = key;
		const title = results[key].title;
		const text = results[key].extract;
		const img = results[key].hasOwnProperty("thumbnail")
			? results[key].thumbnail.source
			: null;
		// build object to pass in to result array
		const item = {
			id: id,
			title: title,
			img: img,
			text: text,
		};
		// then push objects into the array...
		resultArray.push(item);
		// ends loop
	});
	return resultArray;
};
