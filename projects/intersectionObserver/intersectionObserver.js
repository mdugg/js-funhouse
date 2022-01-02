// generate a card
const productList = document.querySelector(".product-list");
const productItem = document.createElement("li");
productItem.classList.add("card");
const productCardContent =
	'<article class="content"><figure class="image"><svg class="icon" viewBox="0 0 640 512"><path d="M639.7 157.6c-1.406-12.7-7.718-24.06-17.81-32.02L486.9 19C471.3 6.75 451.8 0 431.1 0H208c-19.84 0-39.34 6.75-54.87 19L18.11 125.6C8.013 133.5 1.701 144.9 .2948 157.6c-1.406 12.64 2.25 25.06 10.28 34.98l49.97 61.61c16.53 20.44 46.78 23.7 67.31 7.438l32.15-25.38V448c0 35.3 12.72 64 47.1 64h207.1c35.28 0 63.1-28.7 63.1-64V236.3l32.15 25.36c20.56 16.33 50.81 13.02 67.31-7.406l49.97-61.63C637.5 182.7 641.1 170.3 639.7 157.6zM381.7 32C374.6 59.53 349.7 80 320 80S265.4 59.53 258.3 32H381.7zM604.6 172.4l-49.97 61.64c-5.531 6.875-15.75 7.891-22.62 2.438l-83.97-66.25V448c0 17.64-14.34 32-31.1 32H208c-17.66 0-15.1-14.36-15.1-32V170.3L108 236.5c-6.937 5.5-17.09 4.359-22.62-2.469l-49.97-61.63C32.82 169.2 31.64 165.2 32.11 161.1c.4687-4.109 2.531-7.828 5.812-10.42l135-106.6C182.8 36.31 195.3 32 208 32h17.62C233.3 77.31 272.5 112 320 112s86.71-34.69 94.38-80h17.59c12.72 0 25.19 4.312 35.09 12.12l135 106.6c3.281 2.609 5.344 6.328 5.812 10.44C608.4 165.2 607.2 169.2 604.6 172.4z"/></svg></figure><div class="text"><h3 class="title">Product Title</h3><p class="description">Description of the product.</p></div></article>';
productItem.innerHTML = productCardContent;
productList.append(productItem);

const productCards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			entry.target.classList.toggle("show", entry.isIntersecting);
			// add remove class when visibility true false
			if (entry.isIntersecting) observer.unobserve(entry.target);
			// when loaded stop observing
		});
	}, // options:
	{
		// only set to true when entire element is in viewport
		// threshold is an options argument between 0 to 1 , acts as a percentage
		threshold: 1, // 100% of element must be in viewport
		rootMargin: "-120px", // makes root container smaller
		// rootMargin can also start the creation of new lazy load elements before visible
		// root: document.querySelector(".fun__main"),
	}
);
// lazy load new cards infinitely on scroll
const lastCardObserver = new IntersectionObserver((entries) => {
	const lastCard = entries[0];
	if (!lastCard.isIntersecting) return;
	// only observe if last card is visible
	loadNewCards();
	lastCardObserver.unobserve(lastCard.target);
	lastCardObserver.observe(document.querySelector(".card:last-child"));
}, {});
lastCardObserver.observe(document.querySelector(".card:last-child"));

// observer.observe(cards[0]);
productCards.forEach((productCard) => {
	observer.observe(productCard);
});

// dynamically add cards
function loadNewCards() {
	for (let i = 0; i < 1; i++) {
		const newProductItem = document.createElement("li");
		newProductItem.classList.add("card");
		newProductItem.innerHTML = productCardContent;
		productList.append(newProductItem);
		observer.observe(newProductItem);
	}
}
