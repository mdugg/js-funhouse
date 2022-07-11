// Progress Element on CSS Tricks https://css-tricks.com/html5-progress-element/
//
// src is kept empty, image fetched using xhr object
// alert("test - this script is running");
function GetImageLoader() {
	// object
	let imageLoader = {};
	// console.log(imageLoader);
	// accepts 2 arguments - url of image + callback
	imageLoader["loadImage"] = function (imageURL, progressUpdateCallback) {
		// create and return a Promise to avoid chaining callbacks
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest();
			// request type is 'GET'
			xhr.open("GET", imageURL, true);
			// arraybuffer is for receiving the stream of image data
			xhr.responseType = "arraybuffer";
			// not directly binding, compute progress first
			xhr.onprogress = function (e) {
				// first check if length is computable
				if (e.lengthComputable) {
					// if computable, check progress
					// convert to integer and calculate percentage
					progressUpdateCallback(
						parseInt((e.loaded / e.total) * 100)
					);
				}
			};
			// when image has been loaded
			// needs to resolve Promise
			xhr.onloadend = function () {
				// 100% value of progress bar
				progressUpdateCallback(100);
				var options = {};
				// fetch all response headers
				var headers = xhr.getAllResponseHeaders();
				console.log(headers);
				// fetch content type of image, create a blob with response data
				// use regular expression to get content type value
				var typeMatch = headers.match(/^Content-Type\:\s*(.*?)$/im);
				// check if type match exists
				if (typeMatch && typeMatch[1]) {
					options.type = typeMatch[1];
				}
				var blob = new Blob([this.response], options);
				resolve(window.URL.createObjectURL(blob));
			};
			// send xhr request
			xhr.send();
		});
	};
	return imageLoader;
}

let myImage = document.getElementById("myImage");
let imageProgress = document.getElementById("imageProgress");
let imageLoader = GetImageLoader();

function updateProgress(progress) {
	imageProgress.value = progress;
}
let featureImage =
	"https://chattanooga-mountain-break.s3.amazonaws.com/IMG_4928.JPG";
let featureImage2 =
	"http://martinduggan.com/assets/img/martin-duggan-profile01-thumb.jpg";
imageLoader.loadImage(featureImage2, updateProgress).then((image) => {
	myImage.src = image;
});
