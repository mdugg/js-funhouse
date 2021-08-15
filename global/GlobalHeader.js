import globalNav from "./GlobalNav.js";

class GlobalHeader extends HTMLElement {
	constructor() {
		super();
		this.mobileNavBtn;
		this.mobileNavVisible = false;
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			<style>
				.md {
					display:flex;
					flex-direction:row;
					justify-content:flex-start;
					width: 4.8rem;
					height: 4.8rem;
					margin-left:1.6rem;
				}
				.fun__title {
					font-size:2.8rem;
					padding:1.6rem;
					margin-top:2.4rem;
					margin-bottom:0;
				}
				.fun__nav-list {
					list-style:none;
					padding:0;
					margin:0;
				}
				.fun__nav-link {
					color:#000;
					font-size:1.4rem;
					line-height:1.2;
					padding:1.6rem;
					display:block;
					border-bottom:1px solid #eee;
					text-decoration:none;
					transition:all .3s ease-out;
				}
				.fun__nav-link:hover {
					background-color:#B5F100;
				}
				.fun-nav__btn {
					display:none;
					flex-direction:column;
					justify-content:center;
					position: fixed;
					top: .8rem;
					right: 1.6rem;
					z-index: 1000;
					width: 4.8rem;
					height: 4.8rem;
					border-radius: 50%;
					padding: 0;
					margin: 0;
					outline: none;
					border: none;
					background-color: #fff;
				}
				.fun-nav__btn svg {
					stroke: #000;
					stroke-width: 4px;
					stroke-linecap: round;
					stroke-linejoin: round;
					fill: none;
					transition: all .3s ease-out;
				}
				.fun-nav__btn:hover svg {
					stroke: #b5f100;
					cursor: pointer;
				}
				.fun-nav__btn svg path {
					transition: stroke-dasharray .85s ease 0s, stroke-dashoffset .85s ease 0s;
					transition: stroke-dasharray var(--duration, .85s) var(--easing, ease) var(--delay, 0s), stroke-dashoffset var(--duration, .85s) var(--easing, ease) var(--delay, 0s);
					stroke-dasharray: 26px 100px;
					stroke-dasharray: var(--array-1, 26px) var(--array-2, 100px);
					stroke-dashoffset: 126px;
					stroke-dashoffset: var(--offset, 126px);
					transform: translateZ(0)
				}
				.fun-nav__btn svg path:nth-child(2) {
					--duration: 0.7s;
					--easing: ease-in;
					--offset: 100px;
					--array-2: 74px
				}
				.fun-nav__btn svg path:nth-child(3) {
					--offset: 133px;
					--array-2: 107px
				}
				.fun-nav__btn.active svg path {
					--offset: 57px
				}
				.fun-nav__btn.active svg path:first-child,
				.fun-nav__btn.active svg path:nth-child(3) {
					--delay: 0.15s;
					--easing: cubic-bezier(0.2, 0.4, 0.2, 1.1)
				}
				.fun-nav__btn.active svg path:nth-child(2) {
					--duration: 0.4s;
					--offset: 2px;
					--array-1: 1px
				}
				.fun-nav__btn.active svg path:nth-child(3) {
					--offset: 58px
				}
				@media screen and (max-width: 960px){
					.fun__title-block {
						display:flex;
						justify-content: flex-start;
					}
					.fun__title {
						margin-top: 0;
					}
					.fun__nav {
						visibility: hidden;
						opacity:0;
						transform: scale(.9,.9);
						transition: all .3s ease-out;
						display: flex;
						justify-content: center;
						position: fixed;
						top: 2rem;
						left: 2rem;
						bottom: 2rem;
						right: 2rem;
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
					.fun-nav__btn {
						display: flex;
					}
				}
			</style>
			<div class="fun__title-block">
				<a class="md" href="/js-funhouse">
					<svg viewBox="0 0 60 60">
						<g>
							<rect fill="#B5F100" x="0" y="0" width="60" height="60">
							</rect>
							<path d="M15.6777344,56 L15.6777344,42.6845703 L15.7363281,42.6845703 L20.2041016,52.9384766 L22.8994141,52.9384766 L27.3671875,42.6845703 L27.4404297,42.6845703 L27.4404297,56 L30.6777344,56 L30.6777344,34.6425781 L27.6162109,34.6425781 L21.6103516,48.5585938 L15.4873047,34.6425781 L12.4404297,34.6425781 L12.4404297,56 L15.6777344,56 Z M42.4257812,56 C44.0273438,56 45.3798828,55.6484375 46.4833984,54.9453125 C47.5966797,54.2910156 48.4658203,53.4609375 49.0908203,52.4550781 C49.3251953,52.0742188 49.5253906,51.7080078 49.6914062,51.3564453 C49.8476562,50.9951172 49.9648438,50.5849609 50.0429688,50.1259766 C50.1992188,49.2711972 50.2819393,47.8022309 50.2911305,45.7190778 L50.2919922,45.3212891 C50.2919922,43.1630859 50.2382812,41.6445312 50.1308594,40.765625 C49.9941406,39.8867188 49.6669922,39.046875 49.1494141,38.2460938 C47.7041016,35.8632812 45.5361328,34.6621094 42.6455078,34.6425781 L35.1748047,34.6425781 L35.1748047,56 L42.4257812,56 Z M42.2792969,52.9384766 L38.4121094,52.9384766 L38.4121094,37.7041016 L42.2792969,37.7041016 C43.9199219,37.6650391 45.1894531,38.265625 46.0878906,39.5058594 C46.5273438,40.0039062 46.8056641,40.6533203 46.9228516,41.4541016 C47.0048828,42.2014974 47.0486328,43.4082682 47.0541016,45.0744141 L47.0546875,45.4384766 C47.0546875,47.3427734 47.0107422,48.6416016 46.9228516,49.3349609 C46.8251953,50.0380859 46.5957031,50.6191406 46.234375,51.078125 C45.4140625,52.3183594 44.0957031,52.9384766 42.2792969,52.9384766 Z" id="MD" fill="#000000" fill-rule="nonzero"></path>
						</g>
					</svg>
				</a>
				<h1 class="fun__title">JS-Funhouse</h1>
				<button class="fun-nav__btn">
					<svg viewBox="0 0 62 48">
						<path d="M19,15 L45,15 C70,15 58,-2 49,7 L19,37"></path>
						<path d="M19,24 L45,24 C61.2371586,24 57,49 41,33 L32,24"></path>
						<path d="M45,33 L19,33 C-8,33 6,-2 22,14 L45,37"></path>
					</svg>
				</button>
			</div>
			<nav class="fun__nav">
				<ul class="fun__nav-list"> 
				</ul>
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
		this.mobileNavBtn = this.shadowRoot.querySelector(".fun-nav__btn");
		this.mobileMenu = this.shadowRoot.querySelector(".fun__nav");
		this.mobileNavBtn.addEventListener(
			"click",
			this.toggleMobileNav.bind(this)
		);
	}
	toggleMobileNav() {
		// console.log("mobile nav visible");
		// console.log(this.mobileMenu);
		// if ((this.mobileNavVisible = true)) {
		// 	this.mobileMenu.classList.add("active");
		// } else {
		// 	this.mobileMenu.classList.remove("active");
		// }
		this.mobileMenu.classList.toggle("active");
		this.mobileNavBtn.classList.toggle("active");
	}
}

window.customElements.define("fun-nav", GlobalHeader);
