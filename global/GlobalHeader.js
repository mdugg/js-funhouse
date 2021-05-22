const template = document.createElement("template");
template.innerHTML = `
	<style>
		.md-icon {
			display:flex;
			flex-direction:row;
			justify-content:flex-start;
			height: 4.8rem;
			margin-left:1.6rem;
		}
		.title-site {
			font-size:2.8rem;
			padding:1.6rem;
			margin-top:2.4rem;
			margin-bottom:0;
		}
		.fun-nav-list {
			list-style:none;
			padding:0;
			margin:0;
		}
		.fun-nav-list a {
			color:#000;
			font-size:1.4rem;
			line-height:1.2;
			padding:1.6rem;
			display:block;
			border-bottom:1px solid #eee;
			text-decoration:none;
			transition:all .3s ease-out;
		}
		.fun-nav-list a:hover {
			background-color:#B5F100;
		}
	</style>
	<a class="md-icon" href="/">
		<svg viewBox="0 0 60 60">
			<g>
				<rect fill="#B5F100" x="0" y="0" width="60" height="60"></rect>
				<path d="M15.6777344,56 L15.6777344,42.6845703 L15.7363281,42.6845703 L20.2041016,52.9384766 L22.8994141,52.9384766 L27.3671875,42.6845703 L27.4404297,42.6845703 L27.4404297,56 L30.6777344,56 L30.6777344,34.6425781 L27.6162109,34.6425781 L21.6103516,48.5585938 L15.4873047,34.6425781 L12.4404297,34.6425781 L12.4404297,56 L15.6777344,56 Z M42.4257812,56 C44.0273438,56 45.3798828,55.6484375 46.4833984,54.9453125 C47.5966797,54.2910156 48.4658203,53.4609375 49.0908203,52.4550781 C49.3251953,52.0742188 49.5253906,51.7080078 49.6914062,51.3564453 C49.8476562,50.9951172 49.9648438,50.5849609 50.0429688,50.1259766 C50.1992188,49.2711972 50.2819393,47.8022309 50.2911305,45.7190778 L50.2919922,45.3212891 C50.2919922,43.1630859 50.2382812,41.6445312 50.1308594,40.765625 C49.9941406,39.8867188 49.6669922,39.046875 49.1494141,38.2460938 C47.7041016,35.8632812 45.5361328,34.6621094 42.6455078,34.6425781 L35.1748047,34.6425781 L35.1748047,56 L42.4257812,56 Z M42.2792969,52.9384766 L38.4121094,52.9384766 L38.4121094,37.7041016 L42.2792969,37.7041016 C43.9199219,37.6650391 45.1894531,38.265625 46.0878906,39.5058594 C46.5273438,40.0039062 46.8056641,40.6533203 46.9228516,41.4541016 C47.0048828,42.2014974 47.0486328,43.4082682 47.0541016,45.0744141 L47.0546875,45.4384766 C47.0546875,47.3427734 47.0107422,48.6416016 46.9228516,49.3349609 C46.8251953,50.0380859 46.5957031,50.6191406 46.234375,51.078125 C45.4140625,52.3183594 44.0957031,52.9384766 42.2792969,52.9384766 Z" id="MD" fill="#000000" fill-rule="nonzero"></path>
			</g>
		</svg>
	</a>
	<h1 class="title-site">JS-Funhouse</h1>
	<nav>
		<ul class="fun-nav-list"> </ul>
	</nav>
`;

class GlobalHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		let globalNav = [
			{
				linkName: "Web Component - tooltip",
				linkURL: "components/web-component-tooltip/index.html",
			},
			// {
			// 	linkName: "Object entries",
			// 	linkURL: "components/object-entries/index.html",
			// },
			// {
			// 	linkName: "Map an object",
			// 	linkURL: "components/object-map/index.html",
			// },
		];
		let navConcat = globalNav
			.map(function (e) {
				return (
					"<li>" +
					'<a href="./' +
					e.linkURL +
					'">' +
					e.linkName +
					"</a>" +
					"</li>"
				);
			})
			.join("");
		this.shadowRoot.querySelector(".fun-nav-list").innerHTML = navConcat;
	}
}

window.customElements.define("fun-nav", GlobalHeader);
