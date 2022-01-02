class Tooltip extends HTMLElement {
	constructor() {
		super();
		this._tooltipContainer;
	}
	connectedCallback() {
		const tooltipIcon = document.createElement("span");
		tooltipIcon.textContent = " (?)";
		tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
		tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
		this.appendChild(tooltipIcon);
		// props - pass data into component
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
		this.appendChild(this._tooltipContainer);
	}
	_hideTooltip() {
		this.removeChild(this._tooltipContainer);
	}
}

customElements.define("funhouse-tooltip", Tooltip);
