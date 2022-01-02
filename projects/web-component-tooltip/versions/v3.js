// HTMLElement is part of the 'light' DOM
class Tooltip extends HTMLElement {
	constructor() {
		super();
		this._tooltipContainer;
		this.attachShadow({ mode: "open" });
	}
	connectedCallback() {
		const tooltipIcon = document.createElement("span");
		tooltipIcon.textContent = " (?)";
		tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
		tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
		// appendChild hooks to ShadowDom, not LightDom
		this.shadowRoot.appendChild(tooltipIcon);
		if (this.hasAttribute("fun-text")) {
			this._tooltipText = this.getAttribute("fun-text");
		}
	}
	_showTooltip() {
		this._tooltipContainer = document.createElement("div");
		this._tooltipContainer.textContent = this._tooltipText; // props
		this._tooltipContainer.style.backgroundColor = "black";
		this._tooltipContainer.style.color = "white";
		this._tooltipContainer.style.position = "absolute";
		this._tooltipContainer.style.zIndex = "10";
		// same
		this.shadowRoot.appendChild(this._tooltipContainer);
	}
	_hideTooltip() {
		// append and remove access shadow root
		this.shadowRoot.removeChild(this._tooltipContainer);
	}
}

customElements.define("funhouse-tooltip", Tooltip);
