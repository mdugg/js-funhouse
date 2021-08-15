// https://www.youtube.com/watch?v=R8rmfD9Y5-c

// filter method
const products = [
	{ name: "Bike", price: 100 },
	{ name: "TV", price: 200 },
	{ name: "Album", price: 10 },
	{ name: "Book", price: 5 },
	{ name: "Phone", price: 500 },
	{ name: "Computer", price: 1000 },
	{ name: "Keyboard", price: 25 },
	{ name: "Desk", price: 600 },
];
const filteredProducts = products.filter((product) => {
	return product.price <= 100;
});
// create DOM lists
let filterList01 = products
	.map((product) => {
		return `
        <dt class="name">${product.name}</dt>
        <dt class="price">US$ ${product.price}</dt>
    `;
	})
	.join("");
document.querySelector(".list__filter--original").innerHTML = filterList01;

let filterList02 = filteredProducts
	.map((product) => {
		return `
        <dt class="name">${product.name}</dt>
        <dt class="price">$ ${product.price}</dt>
    `;
	})
	.join("");
document.querySelector(".list__filter--filtered").innerHTML = filterList02;
