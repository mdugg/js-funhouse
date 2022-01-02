// HTMLElement is part of the 'light' DOM
class Tooltip extends HTMLElement {
	constructor() {
		super();
		this._tooltipContainer;
		this._tooltipText = "added back in, was removed";
		this.attachShadow({ mode: "open" });
		const template = document.querySelector("#tooltip-template");
		// access shadow dom before it is attached to light dom
		// true = deep clone duplicates nested dom elements, false = shallow clone
		// clone into <template>
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}
	connectedCallback() {
		// if statement needs to be first
		if (this.hasAttribute("fun-text")) {
			this._tooltipText = this.getAttribute("fun-text");
		}
		// query shadow dom
		// text hidden in custom element now displays
		const tooltipIcon = this.shadowRoot.querySelector("span");
		// const tooltipIcon = document.createElement("span");
		// tooltipIcon.textContent = " (?)";
		tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
		tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
		// appendChild hooks to ShadowDom, not LightDom
		this.shadowRoot.appendChild(tooltipIcon);
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
