import globalNav from "./GlobalNav.js";

class GlobalHeader extends HTMLElement {
	constructor() {
		super();
		this.funNavBtn;
		this.mobileNavVisible = false;
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			<style>
				.md-brand {
					fill: #B5F100;
					transition: all .3s ease-out;
				}
				.md-brand__type {
					fill: #000;
					transition: all .3s ease-out;
				}

				.fun__title-block {
					display: flex;
					flex-direction: row;
					justify-content: center;
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
				.fun-nav__btn:hover .md-brand {
					fill: #38b9ad;
				}
				.fun-nav__btn.active .md-brand {
					fill: #000;
				}
				.fun-nav__btn.active .md-brand__type {
					fill: #B5F100;
				}
				.fun__nav {
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
					background-color: rgba(255,255,255,.95);
					overflow-y: scroll;
				}
				.fun__nav.active {
					visibility: visible;
					opacity:1;
					transform: scale(1,1);
				}
				.fun__nav-title {
					font-size: 4rem;
					margin-top: 0;
				}
				.fun__nav-subtitle {
					text-transform: uppercase;
				}
				.fun__nav-subtitle span {
					background-color: #B5F100;
					padding-left: .8rem;
					padding-right: .8rem;
				}
				.fun__nav-list {
					width: 100%;
					max-width: 60rem;
					list-style: none;
					padding: 0;
					margin: 0;
				}
				.fun__nav-item {
				}
				.fun__nav-link {
					font-size: 1.4rem;
					color: #000;
					display:flex;
					flex-wrap: wrap;
					text-decoration: none;
					position: relative;
				}
				.fun__nav-link .group {
					display:flex;
					flex-direction: column;
					flex-wrap: wrap;
					padding:.8rem 0;
					transition: all .3s ease-out;
					transform: translateX(0);
				}
				.fun__nav-link:before {
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
				.fun__nav-link:hover .group {
					transform: translateX(1.6rem);
				}
				.fun__nav-link:hover:before {
					transform: scaleY(1);
				}
				.fun__nav-link .title {
					font-size: 2rem;
					font-weight: 600;
				}
				.fun__nav-link strong {
					color: #38b9ad;
					font-size: 1.2rem;
					text-transform: uppercase;
					letter-spacing: .05rem;
					margin-right: .8rem;
				}
				.fun__nav-link .description {
					margin-bottom: .8rem;
				}
				.fun__nav-link .tags {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
				}
				.fun__nav-link .tags span {
					background-color: #eee;
					padding-left: .8rem;
					padding-right: .8rem;
					margin: 0 .8rem .8rem 0;
					border-radius: 1.2rem;
					white-space: no-wrap;
				}
				.fun__biog {
					max-width: 40rem;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					font-size: 1.6rem;
				}
				.fun__biog .profile {
					border: .8rem solid #B5F100;
					height: 20rem;
					width: 20rem;
					border-radius: 50%;
					overflow: hidden;
					padding: 0;
					margin: 0;
				}
				.fun__biog .profile img {
					display: block;
					width: 100%;
					transform: scale(200%, 200%);
				}
				.fun__biog a {
					display: inline-block;
					border-bottom: 2px dashed #ccc;
					transition: all .3s ease-out;
					color: inherit;
					text-decoration: none;
				}
				.fun__biog a:hover {
					border-bottom-color: #B5F100;
				}
				.fun__biog .md-linkedin {
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
				.fun__biog .md-linkedin:hover {
					border: 2px solid #B5F100;
				}
				.fun__biog .md-linkedin svg {
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
			<div class="fun__title-block">
				<h1 class="visually-hidden">JS-Funhouse</h1>
				<button class="fun-nav__btn">
					<svg class="md-brand" viewBox="0 0 60 60">
						<rect x="0" y="0" width="60" height="60">
						</rect>
						<path class="md-brand__type" fill-rule="nonzero" d="M15.6777344,56 L15.6777344,42.6845703 L15.7363281,42.6845703 L20.2041016,52.9384766 L22.8994141,52.9384766 L27.3671875,42.6845703 L27.4404297,42.6845703 L27.4404297,56 L30.6777344,56 L30.6777344,34.6425781 L27.6162109,34.6425781 L21.6103516,48.5585938 L15.4873047,34.6425781 L12.4404297,34.6425781 L12.4404297,56 L15.6777344,56 Z M42.4257812,56 C44.0273438,56 45.3798828,55.6484375 46.4833984,54.9453125 C47.5966797,54.2910156 48.4658203,53.4609375 49.0908203,52.4550781 C49.3251953,52.0742188 49.5253906,51.7080078 49.6914062,51.3564453 C49.8476562,50.9951172 49.9648438,50.5849609 50.0429688,50.1259766 C50.1992188,49.2711972 50.2819393,47.8022309 50.2911305,45.7190778 L50.2919922,45.3212891 C50.2919922,43.1630859 50.2382812,41.6445312 50.1308594,40.765625 C49.9941406,39.8867188 49.6669922,39.046875 49.1494141,38.2460938 C47.7041016,35.8632812 45.5361328,34.6621094 42.6455078,34.6425781 L35.1748047,34.6425781 L35.1748047,56 L42.4257812,56 Z M42.2792969,52.9384766 L38.4121094,52.9384766 L38.4121094,37.7041016 L42.2792969,37.7041016 C43.9199219,37.6650391 45.1894531,38.265625 46.0878906,39.5058594 C46.5273438,40.0039062 46.8056641,40.6533203 46.9228516,41.4541016 C47.0048828,42.2014974 47.0486328,43.4082682 47.0541016,45.0744141 L47.0546875,45.4384766 C47.0546875,47.3427734 47.0107422,48.6416016 46.9228516,49.3349609 C46.8251953,50.0380859 46.5957031,50.6191406 46.234375,51.078125 C45.4140625,52.3183594 44.0957031,52.9384766 42.2792969,52.9384766 Z">
						</path>
					</svg>
				</button>
			</div>
			<nav class="fun__nav">
				<section class="fun__nav-inner">
					<h1 class="fun__nav-title">JS-Funhouse</h1>
					<h2 class="fun__nav-subtitle"><span>Projects:</span></h2>
					<ul class="fun__nav-list"> 
					</ul>
				</section>
				<aside class="fun__biog">
					<figure class="profile">
						<img 
							loading="lazy"
							src="https://md-profile-pics.s3.amazonaws.com/2017-ponce-city-crop-800.jpg" 
							alt="Martin Duggan profile pic in Ponce City Market, Atlanta" />
					</figure>
					<p>hey! my name is Martin Duggan and this is my space to explore all things JavaScript... and have a little fun while doing so.</p>
					<p>I'm a Product Designer who works on e-commerce and software projects. I currently live in Atlanta, Georgia but am from Ireland.</p>
					<p>I work with <a href="https://try.commentsold.com" target="_blank">CommentSold</a> helping retailers grow their Live Selling business with SaaS products and native apps.</p>
					<p>
						<a class="md-linkedin"
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
		`;
	}
	connectedCallback() {
		let navigation = globalNav
			.map((obj) => {
				return `
				<li class="fun__nav-item">
					<a class="fun__nav-link" href="${obj.linkURL}">
						<span class="group">
							<span class="title">${obj.linkName}</span>
							<span class="description">${obj.desc}</span>
							<span class="published"> 
								<strong>Published:</strong> 
								${obj.month}-${obj.year}
							</span>
						</span>
					</a>
				</li>
			`;
			})
			.join("");
		this.shadowRoot.querySelector(".fun__nav-list").innerHTML = navigation;
		this.funNavBtn = this.shadowRoot.querySelector(".fun-nav__btn");
		this.funNavMenu = this.shadowRoot.querySelector(".fun__nav");
		this.funNavBtn.addEventListener("click", this.showNav.bind(this));
	}
	showNav() {
		this.funNavMenu.classList.toggle("active");
		this.funNavBtn.classList.toggle("active");
	}
}

window.customElements.define("fun-nav", GlobalHeader);

//
// <span class="tags">
// 	<strong>Tags:</strong>$
// 	{obj.tags
// 		.map((tag) => {
// 			return `<span>${tag}</span>`;
// 		})
// 		.join("")}
// </span>;
