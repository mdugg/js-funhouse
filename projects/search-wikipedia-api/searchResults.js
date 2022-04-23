export const deleteSearchResults = () => {
	const parentElement = document.getElementById("searchResults");
	let child = parentElement.lastElementChild;
	while (child) {
		parentElement.removeChild(child);
		child = parentElement.lastElementChild;
	}
};

export const buildSearchResults = (resultArray) => {
	resultArray.forEach((result) => {
		const resultItem = createResultItem(result);
		const resultContents = document.createElement("div");
		resultContents.classList.add("result__content");
		if (result.img) {
			const resultImage = createResultImage(result);
			resultContents.append(resultImage);
		}
		const resultText = createResultText(result);
		resultContents.append(resultText);
		resultItem.append(resultContents);
		const searchResults = document.getElementById("searchResults");
		searchResults.append(resultItem);
	});
};
// helper functions
const createResultItem = (result) => {
	const resultItem = document.createElement("li");
	resultItem.classList.add("result__card");
	const resultTitle = document.createElement("h3");
	resultTitle.classList.add("result__title");
	const link = document.createElement("a");
	link.href = `https://en.wikipedia.org/?curid=${result.id}`;
	link.textContent = result.title;
	link.target = "_blank";
	resultTitle.append(link);
	resultItem.append(resultTitle);
	return resultItem;
};
const createResultImage = (result) => {
	const resultImage = document.createElement("figure");
	resultImage.classList.add("result__image");
	const img = document.createElement("img");
	img.src = result.img;
	img.alt = result.title;
	resultImage.append(img);
	return resultImage;
};
const createResultText = (result) => {
	const resultText = document.createElement("div");
	resultText.classList.add("result__text");
	const resultDescription = document.createElement("p");
	resultDescription.classList.add("result__description");
	resultDescription.textContent = result.text;
	resultText.append(resultDescription);
	return resultText;
};

export const clearStatsLine = () => {
	document.getElementById("stats").textContent = "";
};
// receive number of results
export const setStatsLine = (numberOfResults) => {
	const statLine = document.getElementById("stats");
	// anything other than 0 is true
	// gets resultArray.length passed in
	if (numberOfResults) {
		statLine.textContent = `Displaying ${numberOfResults} results.`;
	} else {
		statLine.textContent = `Sorry, no results`;
	}
};
