// this service gets called from both of the ADD buttons - on menu and detail pages

import { getProductById } from "./Menu.js";

export function placeOrder() {
	alert(
		"Your order will be ready under the number " +
			parseInt(Math.random() * 100)
	);
	app.store.menu = [];
}

export async function addToCart(id) {
	const product = await getProductById(id);
	const results = app.store.cart.filter(
		(prodInCart) => prodInCart.product.id == id
	);
	if (results.length == 1) {
		// product is already in the cart
		// update current item
		app.store.cart = app.store.cart.map((p) =>
			p.product.id == id ? { ...p, quantity: p.quantity + 1 } : p
		);
	} else {
		// else it's a new product
		// wrong in how we setup the Proxy in Store.js
		// return a new array, not change the existing
		// app.store.cart.push({ product, quantity: 1 });
		// assign a new array to the cart:
		app.store.cart = [...app.store.cart, { product, quantity: 1 }];
	}
}

export function removeFromCart(id) {
	app.store.cart = app.store.cart.filter(
		(prodInCart) => prodInCart.product.id != id
	);
}
