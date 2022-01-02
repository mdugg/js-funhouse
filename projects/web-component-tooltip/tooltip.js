class Tooltip extends HTMLElement {
	constructor() {
		super();
		this._tooltipIcon;
		this._tooltipVisible = false;
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					position:relative;
					display:flex;
					flex-direction:row;
					transition:all .3s ease-out;
				}
				.fun-tt-icon {
					display:flex;
					justify-content: center;
					align-items: center;
					width:24px;
					height: 24px;
					background-color: #c34141;
				}
				.fun-tt-icon:hover {
					cursor:pointer;
				}
				.fun-tt-icon svg {
					fill: #fff;
					height:16px;
				}
				.fun-tt-content {
					color:white;
					font-size:1.4rem;
					width:30rem;
					padding: 16px;
					background-color:#c34141;
				}
			</style>
			<span class="fun-tt-icon">
				<svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" >
					<path d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z"></path>
				</svg>
			</span>
			`;
	}
	connectedCallback() {
		if (this.hasAttribute("fun-tt-props")) {
			this._tooltipText = this.getAttribute("fun-tt-props");
		}
		this._tooltipIcon = this.shadowRoot.querySelector(".fun-tt-icon");
		this._tooltipIcon.addEventListener(
			"mouseenter",
			this._showTooltip.bind(this)
		);
		this._tooltipIcon.addEventListener(
			"mouseleave",
			this._hideTooltip.bind(this)
		);
		this._render();
	}
	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}
		if (name === "fun-props") {
			this._tooltipText = newValue;
		}
	}
	static get observedAttributes() {
		return ["fun-props"];
	}
	disconnectedCallback() {
		this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
		this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
	}

	_render() {
		let tooltipContainer = this.shadowRoot.querySelector(".fun-tt-content");
		if (this._tooltipVisible) {
			tooltipContainer = document.createElement("div");
			tooltipContainer.classList.add("fun-tt-content");
			tooltipContainer.textContent = this._tooltipText;
			this.shadowRoot.appendChild(tooltipContainer);
		} else {
			if (tooltipContainer) {
				this.shadowRoot.removeChild(tooltipContainer);
			}
		}
	}

	_showTooltip() {
		this._tooltipVisible = true;
		this._render();
	}
	_hideTooltip() {
		this._tooltipVisible = false;
		this._render();
	}
}

customElements.define("fun-tooltip", Tooltip);
