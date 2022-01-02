class Tooltip extends HTMLElement {
	constructor() {
		super();
		// - not mounted on DOM - initialised in memory only - needs to be moved :
		// const tooltipIcon = document.createElement("span");
		// tooltipIcon.textContent = " (?)";
		// this.appendChild(tooltipIcon);
		this._tooltipContainer;
	}
	connectedCallback() {
		const tooltipIcon = document.createElement("span");
		tooltipIcon.textContent = " (?)";
		tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
		tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
		this.appendChild(tooltipIcon);
	}

	// underscore is a convention to use function only within component / private
	_showTooltip() {
		// const tooltipContainer = document.createElement("div");
		// tooltipContainer.textContent = "This is the tooltip text";
		// 'this' stores in class property, makes available to all methods in class
		this._tooltipContainer = document.createElement("div");
		this._tooltipContainer.textContent = "This is the tooltip text";
		this.appendChild(this._tooltipContainer);
	}
	_hideTooltip() {
		this.removeChild(this._tooltipContainer);
	}
}

customElements.define("funhouse-tooltip", Tooltip);
