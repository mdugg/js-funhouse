import productsObj from "./products.js";

let productConcat = productsObj
	.map(function (obj) {
		return `
			<li class="product__item">
				<div class="product__content">
					<figure class="product__image-block"></figure>
						<img 
							class="product__image" 
							src="${obj.url}"
							alt="${obj.alt}" />
					</figure>
					<!-- color swatch -->
					<h3 class="product__title">${obj.title}</h3>
					<p class="product__desc">
						${obj.desc}
					</p>
					<p>	<strong>Price</strong>
						<span class="product__price">
							$${obj.price}
						</span>
					</p>
				</div>
				<span class="button__group">
					<button class="product__add">
						<svg viewBox="0 0 24 24" 
							fill="none" 
							stroke="currentColor" 
							stroke-width="2" 
							stroke-linecap="round" 
							stroke-linejoin="round" >
								<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
								<line x1="3" y1="6" x2="21" y2="6"></line>
								<path d="M16 10a4 4 0 0 1-8 0"></path>
						</svg>
						Add to cart
					</button>
				</span>
			</li>`;
	})
	.join("");
document.querySelector(".product__list").innerHTML = productConcat;
