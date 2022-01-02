// if (document.readyState == "complete") {
// 	document.addEventListener("DOMContentLoaded", productPageReady);
// } else {
// 	productPageReady();
// }
// document.addEventListener("DOMContentLoaded", productPageReady);
// document.setTimeout(productPageReady, 5000);
// document.onreadystatechange = function () {
// 	if (document.readyState === "complete") {
// 		productPageReady();
// 	}
// };
document.onreadystatechange = function () {
	if (document.readyState === "complete") {
		var imgs = document.images,
			len = imgs.length,
			counter = 0;

		[].forEach.call(imgs, function (img) {
			if (img.complete) incrementCounter();
			else img.addEventListener("load", incrementCounter, false);
		});

		function incrementCounter() {
			counter++;
			if (counter === len) {
				productPageReady();
				console.log(imgs);
			}
		}
	}
};

function productPageReady() {
	// alert("DOM Content Loaded");
	let removeCartItemBtn = document.getElementsByClassName("cart__remove");
	for (let i = 0; i < removeCartItemBtn.length; i++) {
		let btn = removeCartItemBtn[i];
		btn.addEventListener("click", removeCartItem);
	}
	let cartQtyInputs = document.getElementsByClassName("cart__qty");
	for (let i = 0; i < cartQtyInputs.length; i++) {
		let input = cartQtyInputs[i];
		input.addEventListener("change", cartQtyChanged);
	}
	let addToCartButtons = document.getElementsByClassName("product__add");
	for (let i = 0; i < addToCartButtons.length; i++) {
		let addBtn = addToCartButtons[i];
		addBtn.addEventListener("click", addToCartClicked);
	}
	document
		.getElementsByClassName("btn__purchase")[0]
		.addEventListener("click", purchaseClicked);
}

function addItemToCart(productTitle, productPrice, productImage) {
	let cartItem = document.createElement("li");
	cartItem.classList.add("cart__item");
	let cartList = document.getElementsByClassName("cart__list")[0];
	let cartDuplicate = cartList.getElementsByClassName("cart__title");
	for (let i = 0; i < cartDuplicate.length; i++) {
		if (cartDuplicate[i].innerText == productTitle) {
			alert("This item is already added to the cart");
			return;
		}
	}
	let cartItemHTML = `
		<figure class="cart__image">
			<img src="${productImage}" alt="Photo by Martin Duggan, Product Designer" />
		</figure>
		<h4 class="cart__title">${productTitle}</h4>
		<p>$<span class="cart__price">${productPrice}</span></p>
		<span class="cart__actions">
			<input class="cart__qty" type="number" value="1" />
			<button class="cart__remove">Remove</button>
		</span>
	`;
	cartItem.innerHTML = cartItemHTML;
	cartList.append(cartItem);
	cartItem
		.getElementsByClassName("cart__remove")[0]
		.addEventListener("click", removeCartItem);
	cartItem
		.getElementsByClassName("cart__qty")[0]
		.addEventListener("change", cartQtyChanged);
}
function removeCartItem(event) {
	let btnClicked = event.target;
	btnClicked.parentElement.parentElement.remove();
	updateCartTotal();
}
function cartQtyChanged(e) {
	let input = e.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}
function addToCartClicked(e) {
	let addBtn = e.target;
	let product = addBtn.parentElement.parentElement;
	let productTitle =
		product.getElementsByClassName("product__title")[0].innerText;
	let productPrice =
		product.getElementsByClassName("product__price")[0].innerText;
	let productImage = product.getElementsByClassName("product__image")[0].src;
	addItemToCart(productTitle, productPrice, productImage);
	updateCartTotal();
}
function updateCartTotal() {
	let cartList = document.getElementsByClassName("cart__list")[0];
	let cartItem = cartList.getElementsByClassName("cart__item");
	let cartTotal = 0;
	for (let i = 0; i < cartItem.length; i++) {
		let cartProduct = cartItem[i];
		let cartPrice = cartProduct.getElementsByClassName("cart__price")[0];
		let convertedPrice = parseFloat(cartPrice.innerText.replace("$", ""));
		let cartQty = cartProduct.getElementsByClassName("cart__qty")[0];
		let convertedQty = cartQty.value;
		cartTotal = cartTotal + convertedPrice * convertedQty;
	}
	cartTotal = Math.round(cartTotal * 100) / 100;
	document.getElementsByClassName("cart__total-price")[0].innerText =
		"$" + cartTotal;
}
function purchaseClicked() {
	alert("Thank you for your purchase");
	let cartList = document.getElementsByClassName("cart__list")[0];
	while (cartList.hasChildNodes()) {
		cartList.removeChild(cartList.firstChild);
	}
	updateCartTotal();
}
