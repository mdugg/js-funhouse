class Tooltip extends HTMLElement {
	constructor() {
		super();
		this._tooltipIcon;
		this._tooltipVisible = false;
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			<style>
				div {
					background-color:red;
					color:white;
					position:absolute;
					z-index:10;
				}
				.highlight {
					background-color:red;
				}
				::slotted(.highlight) {
					color:#fff;
					background-color:green!important;
				}

				:host {
					position:relative;
					background: var(--color-primary, #ccc);
				}
				:host(.conditional-class) {
					border:1px solid orange;
				}
				:host-context(p) { }
			</style>
			<slot></slot> 
			<span>i</span>
			`;
	}
	connectedCallback() {
		if (this.hasAttribute("fun-props")) {
			this._tooltipText = this.getAttribute("fun-props");
		}
		this._tooltipIcon = this.shadowRoot.querySelector("span");
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
		let tooltipContainer = this.shadowRoot.querySelector("div");
		if (this._tooltipVisible) {
			tooltipContainer = document.createElement("div");
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
