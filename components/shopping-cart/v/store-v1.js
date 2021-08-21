if (document.readyState == "complete") {
	// https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
	// make sure body of page is done loading so all elements are generated
	// DOMContentLoaded will fire as soon as document is fully loaded
	// wait for event to fire, then run function
	document.addEventListener("DOMContentLoaded", productPageReady);
} else {
	// if DOMContentLoaded already fired before JS loads
	productPageReady();
}

function productPageReady() {
	// page is loaded - now these functions can act and call other functions
	// remove from cart
	let removeCartItemBtn = document.getElementsByClassName("cart__remove");
	// console.log(removeCartItemBtn);
	for (let i = 0; i < removeCartItemBtn.length; i++) {
		let btn = removeCartItemBtn[i];
		btn.addEventListener("click", removeCartItem);
	}
	// update cart quantity
	let cartQtyInputs = document.getElementsByClassName("cart__qty");
	for (let i = 0; i < cartQtyInputs.length; i++) {
		let input = cartQtyInputs[i];
		// listen for when there is a change in quantity
		input.addEventListener("change", cartQtyChanged);
	}
	// add products to cart button
	let addToCartButtons = document.getElementsByClassName("product__add");
	for (let i = 0; i < addToCartButtons.length; i++) {
		let addBtn = addToCartButtons[i];
		addBtn.addEventListener("click", addToCartClicked);
	}
	// purchase
	document
		.getElementsByClassName("btn__purchase")[0]
		.addEventListener("click", purchaseClicked);
}

function addItemToCart(productTitle, productPrice, productImage) {
	// will add DOM elements after productPageReady() fires
	let cartItem = document.createElement("li");
	cartItem.classList.add("cart__item");
	let cartList = document.getElementsByClassName("cart__list")[0];
	let cartDuplicate = cartList.getElementsByClassName("cart__title");
	for (let i = 0; i < cartDuplicate.length; i++) {
		if (cartDuplicate[i].innerText == productTitle) {
			alert("This item is already added to the cart");
			return; // exit function and prevent executing below
		}
	}
	let cartItemHTML = `
		<figure class="cart__image">
			<img src="${productImage}" alt="Photo by Martin Duggan, Product Designer" />
		</figure>
		<h4 class="cart__title">${productTitle}</h4>
		<p>Price: <span class="cart__price">${productPrice}</span></p>
		<span class="cart__actions">
			<input class="cart__qty" type="number" value="1" />
			<button class="cart__remove">Remove</button>
		</span>
	`;
	// cartItem.innerText = productTitle;
	cartItem.innerHTML = cartItemHTML;
	cartList.append(cartItem);
	// need to call events again as this is a new DOM element
	cartItem
		.getElementsByClassName("cart__remove")[0]
		.addEventListener("click", removeCartItem);
	cartItem
		.getElementsByClassName("cart__qty")[0]
		.addEventListener("change", cartQtyChanged);
}
function removeCartItem(event) {
	// console.log("clicked");
	let btnClicked = event.target;
	// remove parent element
	// can be chained to reach further up DOM tree
	// removes .cart__item
	btnClicked.parentElement.parentElement.remove();
	updateCartTotal();
}
function cartQtyChanged(e) {
	let input = e.target;
	// check if input is valid - positive number only
	if (isNaN(input.value) || input.value <= 0) {
		// can't order less than 1
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
	// console.log(productTitle, productPrice, productImage);
	addItemToCart(productTitle, productPrice, productImage);
	updateCartTotal();
}
function updateCartTotal() {
	let cartList = document.getElementsByClassName("cart__list")[0];
	let cartItem = cartList.getElementsByClassName("cart__item");
	let cartTotal = 0;
	// console.log(cartList, cartItem);
	for (let i = 0; i < cartItem.length; i++) {
		let cartProduct = cartItem[i];
		let cartPrice = cartProduct.getElementsByClassName("cart__price")[0];
		// convert price from string to number
		let convertedPrice = parseFloat(cartPrice.innerText.replace("$", ""));
		let cartQty = cartProduct.getElementsByClassName("cart__qty")[0];
		let convertedQty = cartQty.value;
		// console.log(
		// 	"Price as text node: " + cartPrice,
		// 	"Price as number: " + convertedPrice,
		// 	"Quantity as text node: " + cartQty,
		// 	"Quantity as number: " + convertedQty,
		// 	"Price x Quantity: " + convertedPrice * convertedQty
		// );
		cartTotal = cartTotal + convertedPrice * convertedQty;
	}
	// console.log(cartTotal);
	// round total to 2 decimal places
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
