class Tooltip extends HTMLElement {
	constructor() {
		super();
		this._tooltipContainer;
		this._tooltipIcon;
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
		// make tooltipIcon references available outside this function scope
		// make class property
		// const tooltipIcon = this.shadowRoot.querySelector("span");
		this._tooltipIcon = this.shadowRoot.querySelector("span");
		this._tooltipIcon.addEventListener(
			"mouseenter",
			this._showTooltip.bind(this)
		);
		this._tooltipIcon.addEventListener(
			"mouseleave",
			this._hideTooltip.bind(this)
		);
		// this.shadowRoot.appendChild(tooltipIcon);
		this.style.position = "relative";
	}
	attributeChangedCallback(name, oldValue, newValue) {
		// console.log(name, oldValue, newValue);
		// performance check:
		if (oldValue === newValue) {
			return;
		}
		if (name === "fun-props") {
			this._tooltipText = newValue;
		}
	}
	// read only from light dom
	static get observedAttributes() {
		// only add in array what attr need to be watched
		return ["fun-props"];
	}
	// lifecycle hook for when custom element is removed from DOM
	// clean up event listeners on dismounting from DOM
	// cancel http requests
	// log message to statistics server
	disconnectedCallback() {
		// console.log("Disconnected!");
		this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
		this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
	}

	_showTooltip() {
		this._tooltipContainer = document.createElement("div");
		this._tooltipContainer.textContent = this._tooltipText;
		this.shadowRoot.appendChild(this._tooltipContainer);
	}
	_hideTooltip() {
		this.shadowRoot.removeChild(this._tooltipContainer);
	}
}

customElements.define("funhouse-tooltip", Tooltip);
