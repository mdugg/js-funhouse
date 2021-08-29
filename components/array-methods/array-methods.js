// https://www.youtube.com/watch?v=R8rmfD9Y5-c
// original list
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
// create HTML of original list
const originalList = products
	.map((product) => {
		return `
        	<dt class="name">${product.name}</dt>
        	<dd class="price">US$ ${product.price}</dd>
    	`;
	})
	.join("");
document.getElementById("productList").innerHTML = originalList;

// filter() method
const filteredProducts = products.filter((product) => {
	return product.price <= 100;
});
// console.log(filteredProducts);
const filterList = filteredProducts
	.map((product) => {
		return `
        	<dt class="name">${product.name}</dt>
        	<dd class="price">$ ${product.price}</dd>
    	`;
	})
	.join("");
document.getElementById("filterList").innerHTML = filterList;

// find() method
// syntax 1
const foundProduct = products.find((product) => {
	return product.name === "Book";
});
// console.log(foundProduct);
// syntax 2
// function findProduct(product) {
// 	return product.name === "Book";
// }
// console.log(products.find(findProduct));
// syntax 3
// const foundProduct = products.find(({ name }) => name === "Book");
// wrap Object in an Array before using map() method
const foundToArray = [foundProduct];
// console.log("foundToArray: " + foundToArray);
const foundItem = foundToArray
	.map((product) => {
		return `
			<dt class="name">${product.name}</dt>
        	<dd class="price">$ ${product.price}</dd>
		`;
	})
	.join("");
document.getElementById("findList").innerHTML = foundItem;

// forEach() method
products.forEach((product) => {
	// console.log(product.price * 0.2);
	// const discount = product.price * 0.2;
	// const dt = document.createElement("dt");
	// const dd = document.createElement("dd");
	// const dtName = document.createTextNode(`${product.name}`);
	// const ddPrice = document.createTextNode(`${product.price}`);
	// const ddDiscount = document.createTextNode(`${product.price * 0.8}`);
	// const dlRow = dt.appendChild(dtName);
	const dlRow = `	<dt>${product.name}</dt>
					<dd><span style="text-decoration:line-through;">$${product.price}</span>
						<span>Sale: $${product.price * 0.8}</span>
					</dd>`;
	const dl = document.getElementById("loopList");
	// dl.appendChild(dlRow);
	// dl.innerHTML = dlRow;
	dl.insertAdjacentHTML("afterbegin", dlRow);
	/*
		beforebegin - before element
		afterbegin - first child
		beforeend - last child
		afterend - after element
	*/
});
