import globalNav from "./GlobalNav.js";

class GlobalHeader extends HTMLElement {
	constructor() {
		super();
		// this.funNavBtn;
		this.mobileNavVisible = false;
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					--md-brand-primary: #B5F100;
					--md-brand-secondary: #38b9ad;
				}
				.fun-topbar {
					display: flex;
					flex-direction: row;
					justify-content: center;
				}
				.fun-topbar__brand {
					fill: var(--md-brand-primary);
					transition: all .3s ease-out;
				}
				.fun-topbar__brand--type {
					fill: #000;
					transition: all .3s ease-out;
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
				.fun-nav__btn:hover .fun-topbar__brand {
					fill: var(--md-brand-secondary);
				}
				.fun-nav__btn.active .fun-topbar__brand {
					fill: #000;
				}
				.fun-nav__btn.active .fun-topbar__brand--type {
					fill: var(--md-brand-primary);
				}

				.fun-nav__modal,
				.fun-nav__modal--screen {
					visibility: hidden;
					opacity:0;
					transform-origin: top center;
					transform: scale(.9,.9);
					transition: all .3s ease-out;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: flex-start;
					position: fixed;
					top: 6rem;
					left: 6rem;
					bottom: 6rem;
					right: 6rem;
					z-index:999;
					padding: 8rem;
					background-color: rgba(255,255,255,.90);
					overflow: hidden;
				}
				.fun-nav__modal--screen {
					top:0;
					right:0;
					bottom:0;
					left:0;
					height:100vh;
					width:100vw;
					z-index:990;
					background-color: transparent;
				}
				.fun-nav__modal--screen:hover {
					cursor: pointer;
				}
				.fun-nav__modal.active,
				.fun-nav__modal--screen.active {
					visibility: visible;
					opacity:1;
					transform: scale(1,1);
				}
				.fun-nav__inner {
					width: 100%;
					max-width: 60rem;
					height: 100%;
					overflow: hidden;
  					box-shadow: inset 0 -10px 10px -10px rgba(00,00,00,.1);
				}
				.fun-nav__title {
					font-size: 4rem;
					margin-top: 0;
				}
				.fun-nav__title--link {
					color: inherit;
					display: inline-block;
					text-decoration: none;
					position: relative;
				}
				.fun-nav__title--link:hover:before {
					transform: scaleX(1);
				}
				.fun-nav__title--link:before {
					content:'';
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: .8rem;
					background-color: var(--md-brand-primary); 
					transition: all .3s ease-out;
					transform: scaleX(0);
					transform-origin: center;
				}
				.fun-nav__subtitle {
					text-transform: uppercase;
				}
				.fun-nav__subtitle span {
					background-color: #B5F100;
					padding-left: .8rem;
					padding-right: .8rem;
				}
				.fun-nav__list {
					display:flex;
					flex-direction: column;
					height: calc(100% - 14rem);
					overflow-y: scroll;
					list-style: none;
					padding: 0 2.4rem 0 0;
					margin: 0;
				}
				.fun-nav__link {
					font-size: 1.4rem;
					color: #000;
					display:flex;
					flex-wrap: wrap;
					text-decoration: none;
					position: relative;
				}
				.fun-nav__link .group {
					display:flex;
					flex-direction: column;
					flex-wrap: wrap;
					padding:.8rem 0;
					transition: all .3s ease-out;
					transform: translateX(0);
				}
				.fun-nav__link:before {
					position: absolute;
					top: 0;
					left: 0;
					width: .8rem;
					height: 100%;
					background-color: #B5F100;
					transition: all .3s ease-out;
					transform: scaleY(0);
					content:'';
				}
				.fun-nav__link:hover .group {
					transform: translateX(1.6rem);
				}
				.fun-nav__link:hover:before {
					transform: scaleY(1);
				}
				.fun-nav__link--title {
					font-size: 1.8rem;
					font-weight: 600;
					margin-bottom:.4rem;
				}
				.fun-nav__link--key {
					color: #38b9ad;
					font-size: 1.2rem;
					text-transform: uppercase;
					letter-spacing: .05rem;
					margin-right: .8rem;
				}
				.fun-nav__link--description {
					margin-bottom: .4rem;
				}
				.fun-biog {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					font-size: 1.6rem;
					margin-left: 4rem;
					width: calc(50% - 4rem);
					max-width: 40rem;
				}
				.fun-biog__profile {
					border: .8rem solid var(--md-brand-primary);
					height: 20rem;
					width: 20rem;
					border-radius: 50%;
					overflow: hidden;
					padding: 0;
					margin: 0;
				}
				.fun-biog__profile img {
					display: block;
					width: 100%;
					transform: scale(200%, 200%);
				}
				.fun-biog a {
					display: inline-block;
					border-bottom: 2px dashed #ccc;
					transition: all .3s ease-out;
					color: inherit;
					text-decoration: none;
				}
				.fun-biog a:hover {
					border-bottom-color: #B5F100;
				}
				.fun-biog .fun-biog__linkedin {
					display: flex;
					align-items: center;
					font-weight: 600;
					line-height: 4rem;
					border: 2px dashed #ccc;
					border-radius: 2rem;
					padding-left: 4rem;
					padding-right: 4rem;
					transition: all .3s ease-out;
				}
				.fun-biog .fun-biog__linkedin:hover {
					border: 2px solid var(--md-brand-primary);
				}
				.fun-biog .fun-biog__linkedin svg {
					height: 2.4rem;
					margin-right: .8rem;
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
			<div class="fun-topbar">
				<h1 class="visually-hidden">JS-Funhouse</h1>
				<button class="fun-nav__btn" data-nav='modal'>
					<svg class="fun-topbar__brand" viewBox="0 0 60 60">
						<rect x="0" y="0" width="60" height="60">
						</rect>
						<path class="fun-topbar__brand--type" fill-rule="nonzero" d="M15.6777344,56 L15.6777344,42.6845703 L15.7363281,42.6845703 L20.2041016,52.9384766 L22.8994141,52.9384766 L27.3671875,42.6845703 L27.4404297,42.6845703 L27.4404297,56 L30.6777344,56 L30.6777344,34.6425781 L27.6162109,34.6425781 L21.6103516,48.5585938 L15.4873047,34.6425781 L12.4404297,34.6425781 L12.4404297,56 L15.6777344,56 Z M42.4257812,56 C44.0273438,56 45.3798828,55.6484375 46.4833984,54.9453125 C47.5966797,54.2910156 48.4658203,53.4609375 49.0908203,52.4550781 C49.3251953,52.0742188 49.5253906,51.7080078 49.6914062,51.3564453 C49.8476562,50.9951172 49.9648438,50.5849609 50.0429688,50.1259766 C50.1992188,49.2711972 50.2819393,47.8022309 50.2911305,45.7190778 L50.2919922,45.3212891 C50.2919922,43.1630859 50.2382812,41.6445312 50.1308594,40.765625 C49.9941406,39.8867188 49.6669922,39.046875 49.1494141,38.2460938 C47.7041016,35.8632812 45.5361328,34.6621094 42.6455078,34.6425781 L35.1748047,34.6425781 L35.1748047,56 L42.4257812,56 Z M42.2792969,52.9384766 L38.4121094,52.9384766 L38.4121094,37.7041016 L42.2792969,37.7041016 C43.9199219,37.6650391 45.1894531,38.265625 46.0878906,39.5058594 C46.5273438,40.0039062 46.8056641,40.6533203 46.9228516,41.4541016 C47.0048828,42.2014974 47.0486328,43.4082682 47.0541016,45.0744141 L47.0546875,45.4384766 C47.0546875,47.3427734 47.0107422,48.6416016 46.9228516,49.3349609 C46.8251953,50.0380859 46.5957031,50.6191406 46.234375,51.078125 C45.4140625,52.3183594 44.0957031,52.9384766 42.2792969,52.9384766 Z">
						</path>
					</svg>
				</button>
			</div>
			<nav class="fun-nav__modal">
				<section class="fun-nav__inner">
					<h1 class="fun-nav__title">
						<a class="fun-nav__title--link" href="/">JS-Funhouse</a>
					</h1>
					<h2 class="fun-nav__subtitle">
						<span>Projects:</span>
					</h2>
					<ul class="fun-nav__list"> 
					</ul>
				</section>
				<aside class="fun-biog">
					<figure class="fun-biog__profile">
						<img 
							loading="lazy"
							src="https://md-profile-pics.s3.amazonaws.com/2017-ponce-city-crop-800.jpg" 
							alt="Martin Duggan profile pic in Ponce City Market, Atlanta" />
					</figure>
					<p>hey! my name is Martin Duggan and this is my space to explore all things vanilla JS... and have a little fun while doing so.</p>
					<p>I'm a Product Designer who works on eCommerce and software projects. I am Irish but currently live in Atlanta, Georgia.</p>
					<p>
						<a class="fun-biog__linkedin"
							href="https://www.linkedin.com/in/martinduggan" 
							target="_blank">
							<svg aria-hidden="true" viewBox="0 0 448 512">
								<path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
							</svg>
							Linkedin
						</a>
					</p>
				</aside>
			</nav>
			<div class="fun-nav__modal--screen" data-nav='modal'></div>
		`;
	}
	connectedCallback() {
		let navigation = globalNav
			.map((obj) => {
				return `
				<li class="fun-nav-item">
					<a class="fun-nav__link" href="${obj.linkURL}">
						<span class="group">
							<span class="fun-nav__link--title">${obj.linkName}</span>
							<span class="fun-nav__link--description">${obj.desc}</span>
							<span class="fun-nav__link--published"> 
								<strong class="fun-nav__link--key">Published:</strong> 
								${obj.month}-${obj.year}
							</span>
						</span>
					</a>
				</li>
			`;
			})
			.join("");
		this.shadowRoot.querySelector(".fun-nav__list").innerHTML = navigation;

		this.main = document.querySelector("main");
		this.funNavBtn = this.shadowRoot.querySelector(".fun-nav__btn");
		this.funNavModal = this.shadowRoot.querySelector(".fun-nav__modal");
		this.funNavModalScreen = this.shadowRoot.querySelector(
			".fun-nav__modal--screen"
		);
		// this.funNavBtn.addEventListener("click", this.showNavModal.bind(this));
		this.toggleModal =
			this.shadowRoot.querySelectorAll("[data-nav='modal']");
		this.toggleModal.forEach((element) => {
			element.addEventListener("click", this.showNavModal.bind(this));
		});
		// console.log(this.toggleModal);
	}
	showNavModal() {
		this.main.classList.toggle("fun-blur");
		this.funNavBtn.classList.toggle("active");
		this.funNavModal.classList.toggle("active");
		this.funNavModalScreen.classList.toggle("active");
		// console.log(this.toggleModal);
	}
}

window.customElements.define("fun-nav", GlobalHeader);
