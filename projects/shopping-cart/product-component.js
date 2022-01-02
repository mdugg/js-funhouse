import productsObj from "./products.js";

let productConcat = productsObj
	.map(function (obj) {
		return `
			<li class="product__item">
				<div class="product__content">
					<figure class="product__image-block"></figure>
						<img 
							loading="lazy" 
							class="product__image" 
							src="${obj.url}"
							alt="${obj.alt}" />
					</figure>
					<h3 class="product__title">${obj.title}</h3>
					<p class="product__desc">
						${obj.desc}
					</p>
					<p class="product__desc">
						Price: $
						<span class="product__price">
							${obj.price}
						</span>
					</p>
				</div>
				<span class="button__group">
					<button class="product__add">
						Add to cart
					</button>
				</span>
			</li>`;
	})
	.join("");
document.querySelector(".product__list").innerHTML = productConcat;
