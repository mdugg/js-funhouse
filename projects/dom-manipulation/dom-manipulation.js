// append()
const btnAppend = document.getElementById("btnAppend");
btnAppend.addEventListener("click", (event) => {
	const appendId = document.getElementById("append");
	appendId.append(
		"This text string does not need an HTML node to be inserted.",
		"This is a second parameter"
	);
});
// appendChild()
const btnAppendChild = document.getElementById("btnAppendChild");
btnAppendChild.addEventListener("click", (event) => {
	const appendChildId = document.getElementById("appendChild");
	appendChildId.appendChild(span);
});
