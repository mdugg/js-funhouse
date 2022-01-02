import globalNav from "./GlobalNav.js";

class GlobalHeader extends HTMLElement {
	constructor() {
		super();
		this.funNavBtn;
		this.mobileNavVisible = false;
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			<style>
				.fun__title-block {
					display: flex;
					flex-direction: row;
					justify-content: center;
				}
				.md {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					margin-left: 1.6rem;
				}
				.fun-nav__btn {
					border-style: none;
					width: 4.8rem;
					height: 4.8rem;
					margin: 0;
					padding: 0;
				}
				.fun-nav__btn:hover {
					cursor: pointer;
				}
				.fun__nav {
					visibility: hidden;
					opacity:0;
					transform-origin: top center;
					transform: scale(.9,.9);
					transition: all .3s ease-out;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					position: fixed;
					top: 6rem;
					left: 6rem;
					bottom: 6rem;
					right: 6rem;
					z-index:999;
					padding: 2.4rem 0;
					overflow-y: scroll;
					background-color: rgba(255,255,255,.95);
				}
				.fun__nav.active {
					visibility: visible;
					opacity:1;
					transform: scale(1,1);
				}
				.fun__nav-title {
					font-size: 2.4rem;
				}
				.fun__nav-list {
					list-style: none;
					padding: 0;
					margin: 0;
				}
				.fun__nav-item {

				}
				.fun__nav-link {
					font-size: 2.4rem;
					text-decoration: none;
					color: #002aff;
					transition: all .3s ease-out;
					transform: translateX(0);
					display:flex;
					padding:.8rem 0;
				}
				.fun__nav-link:hover {
					transform: translateX(1.6rem);
				}
				.visually-hidden,
				.visually-hidden-focusable:not(:focus):not(:focus-within) {
					position: absolute !important;
					width: 1px !important;
					height: 1px !important;
					padding: 0 !important;
					margin: -1px !important;
					overflow: hidden !important;
					clip: rect(0, 0, 0, 0) !important;
					white-space: nowrap !important;
					border: 0 !important;
				}
				@media screen and (max-width: 960px){
				}
			</style>
			<div class="fun__title-block">
				<h1 class="visually-hidden">JS-Funhouse</h1>
				<button class="fun-nav__btn">
					<svg viewBox="0 0 60 60">
						<g>
							<rect fill="#B5F100" x="0" y="0" width="60" height="60">
							</rect>
							<path d="M15.6777344,56 L15.6777344,42.6845703 L15.7363281,42.6845703 L20.2041016,52.9384766 L22.8994141,52.9384766 L27.3671875,42.6845703 L27.4404297,42.6845703 L27.4404297,56 L30.6777344,56 L30.6777344,34.6425781 L27.6162109,34.6425781 L21.6103516,48.5585938 L15.4873047,34.6425781 L12.4404297,34.6425781 L12.4404297,56 L15.6777344,56 Z M42.4257812,56 C44.0273438,56 45.3798828,55.6484375 46.4833984,54.9453125 C47.5966797,54.2910156 48.4658203,53.4609375 49.0908203,52.4550781 C49.3251953,52.0742188 49.5253906,51.7080078 49.6914062,51.3564453 C49.8476562,50.9951172 49.9648438,50.5849609 50.0429688,50.1259766 C50.1992188,49.2711972 50.2819393,47.8022309 50.2911305,45.7190778 L50.2919922,45.3212891 C50.2919922,43.1630859 50.2382812,41.6445312 50.1308594,40.765625 C49.9941406,39.8867188 49.6669922,39.046875 49.1494141,38.2460938 C47.7041016,35.8632812 45.5361328,34.6621094 42.6455078,34.6425781 L35.1748047,34.6425781 L35.1748047,56 L42.4257812,56 Z M42.2792969,52.9384766 L38.4121094,52.9384766 L38.4121094,37.7041016 L42.2792969,37.7041016 C43.9199219,37.6650391 45.1894531,38.265625 46.0878906,39.5058594 C46.5273438,40.0039062 46.8056641,40.6533203 46.9228516,41.4541016 C47.0048828,42.2014974 47.0486328,43.4082682 47.0541016,45.0744141 L47.0546875,45.4384766 C47.0546875,47.3427734 47.0107422,48.6416016 46.9228516,49.3349609 C46.8251953,50.0380859 46.5957031,50.6191406 46.234375,51.078125 C45.4140625,52.3183594 44.0957031,52.9384766 42.2792969,52.9384766 Z" 
							id="MD" fill="#000000" fill-rule="nonzero">
							</path>
						</g>
					</svg>
				</button>
			</div>
			<nav class="fun__nav">
				<div class="fun__nav-inner">
					<h1 class="fun__nav-title">JS-Funhouse</h1>
					<ul class="fun__nav-list"> 
					</ul>
				</div>
			</nav>
		`;
	}
	connectedCallback() {
		// console.log("Global header added to DOM");
		let navConcat = globalNav
			.map(function (e) {
				return `
				<li class="fun__nav-item">
					<a class="fun__nav-link" href="${e.linkURL}">
						${e.linkName}
					</a>
				</li>
			`;
			})
			.join("");
		this.shadowRoot.querySelector(".fun__nav-list").innerHTML = navConcat;
		this.funNavBtn = this.shadowRoot.querySelector(".fun-nav__btn");
		this.funNavMenu = this.shadowRoot.querySelector(".fun__nav");
		this.funNavBtn.addEventListener("click", this.showNav.bind(this));
	}
	showNav() {
		// console.log("mobile nav visible");
		// console.log(this.funNavMenu);
		// if ((this.mobileNavVisible = true)) {
		// 	this.funNavMenu.classList.add("active");
		// } else {
		// 	this.funNavMenu.classList.remove("active");
		// }
		this.funNavMenu.classList.toggle("active");
		this.funNavBtn.classList.toggle("active");
	}
}

window.customElements.define("fun-nav", GlobalHeader);
