class Tooltip extends HTMLElement {
	constructor() {
		super();
		this._tooltipContainer;
		this.attachShadow({ mode: "open" });
		// innerHTML different to appendChild - prepares content before lifecycle
		// scoped styles
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
				// special selectors:
				// Shadow DOM projection for slots
				// passed in content still remains as Light DOM node
				// important implication for styling
				// ::slotted(*) universal selector
				// Light DOM styling higher specificity
				::slotted(.highlight) {
					color:#fff;
					background-color:green!important;
				}

				:host {
					// variable has fallback
					background: var(--color-primary, #ccc);
				}

				// conditional selector or attr
				:host(.conditional-class) {
					border:1px solid orange;
				}

				// conditional if component is within a html context
				// component with a <p>
				:host-context(p) {
					
				}

			</style>
			<slot></slot> 
			<span>i</span>
			`;
	}
	connectedCallback() {
		// props text is extracted when the component gets mounted to the DOM - not 'reactive'
		// needs attributeChangedCallback below
		if (this.hasAttribute("fun-props")) {
			this._tooltipText = this.getAttribute("fun-props");
		}
		const tooltipIcon = this.shadowRoot.querySelector("span");
		tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
		tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
		this.shadowRoot.appendChild(tooltipIcon);
		this.style.position = "relative";
	}
	// lifecycle hook that gets executed when an observed attr gets updated
	attributeChangedCallback(name, oldValue, newValue) {
		console.log(name, oldValue, newValue);
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
