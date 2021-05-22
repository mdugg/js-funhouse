// extend specific element, not generic HTML el
class ConfirmLink extends HTMLAnchorElement {
	// use shadowroot
	connectedCallback() {
		this.addEventListener("click", (e) => {
			if (confirm("Do you really want to leave?")) {
				e.preventDefault();
			}
		});
	}
}

customElements.define("fun-confirm-link", ConfirmLink, { extends: "a" });
