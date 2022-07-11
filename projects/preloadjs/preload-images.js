let view = document.querySelector("body");
let progress = document.getElementById("progress");
let gallery = document.getElementById("gallery");

// https://createjs.com/docs/preloadjs/classes/LoadQueue.html
// LoadQueue instance set to true will preload but not append automatically
var queue = new createjs.LoadQueue(false);
// console.log(queue);
// progress bar
// progress event is called each time an image is loaded
queue.on("progress", (event) => {
	// log 'event' to see images load in sequentially
	console.log(event);
	let progress = Math.floor(event.progress * 100);
	this.progress.style.width = progress + "%";
	if (progress == 100) {
		// when images are loaded into cache
		// console.log("all done");
		view.classList.remove("loading");
	}
});
// create image gallery
queue.on("complete", (event) => {
	gallery.classList.add("fadeIn");
	progress.classList.add("fadeOut");
});
queue.on("fileload", handleFileComplete);
queue.loadFile(
	"https://chattanooga-mountain-break.s3.amazonaws.com/P1030953.JPG"
);
queue.loadFile(
	"https://chattanooga-mountain-break.s3.amazonaws.com/P1030941.JPG"
);
queue.loadFile(
	"https://chattanooga-mountain-break.s3.amazonaws.com/P1030931.JPG"
);
queue.loadFile(
	"https://chattanooga-mountain-break.s3.amazonaws.com/P1030894.JPG"
);
// called each time a file is loaded
function handleFileComplete(event) {
	// reference item passed in to load queue
	let item = event.item;
	let type = item.type;
	if (type == createjs.Types.IMAGE) {
		// add in img tag to show uploaded file
		gallery.appendChild(event.result);
	}
}
