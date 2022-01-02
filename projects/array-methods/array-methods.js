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

// some() method
const someMethod = products.some((product) => {
	return product.price <= 100;
});
const hasInexpensiveProducts = () => {
	const yup = "Yes, there are products available for less than $50";
	const nope = "No, there are not products available for less than $50";
	const someResult = document.getElementById("someResult");
	if (someMethod === true) {
		// return (someResult.innerHTML = yup);
		return (someResult.innerText = yup);
		// return (someResult.textContent = yup);
		// return someResult.insertAdjacentHTML("afterbegin", yup);
		// return someResult.appendChild(yup) error - not a node;
		// return someResult.createTextNode(yup); error - not a function
	} else {
		return (someResult.innerText = nope);
	}
};
hasInexpensiveProducts(someMethod);

// every() method
const everyMethod = products.every((product) => {
	return product.price <= 500;
});
const expensiveProducts = () => {
	const yup = "Yes, all products are less than $500";
	const nope = "No, there are products which are more expensive than $500";
	const everyResult = document.getElementById("everyResult");
	if (everyMethod === true) {
		return (everyResult.innerText = yup);
	} else {
		return (everyResult.innerText = nope);
	}
};
expensiveProducts(everyMethod);

// reduce() method
const reduceMethod = products.reduce((currentTotal, product) => {
	return product.price + currentTotal;
}, 0 /* second parameter is the starting point */);
const reduceResult = () => {
	const resultText = "The total cost of inventory is $" + reduceMethod;
	const reduceResultDOM = document.getElementById("reduceResult");
	return reduceResultDOM.insertAdjacentHTML("afterbegin", resultText);
};
reduceResult(reduceMethod);

// includes() method
const productNames = products.map((product) => {
	return product.name;
});
const productSearchString = "Bike";
const includesMethod = productNames.includes(productSearchString);
const includesResult = () => {
	const yup = `Yes, there is a ${productSearchString} in stock`;
	const nope = `No, we don't have a ${productSearchString} in stock`;
	const includesResultDOM = document.getElementById("includesResult");
	if (includesMethod === true) {
		return (includesResultDOM.innerText = yup);
	} else {
		return (includesResultDOM.innerText = nope);
	}
};
includesResult(includesMethod);
