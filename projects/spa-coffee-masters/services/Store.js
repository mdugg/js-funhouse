import API from "./API.js";

const Store = {
	//    null = we don't have it yet
	menu: null,
	cart: [],
};

const proxiedStore = new Proxy(Store, {
	set(target, property, value) {
		target[property] = value;
		if (property == "menu") {
			// use window because there are ShadowDOM documents
			window.dispatchEvent(new Event("appmenuchange"));
		}
		if (property == "cart") {
			window.dispatchEvent(new Event("appcartchange"));
		}
		return true;
	},
	get(target, property) {
		return target[property];
	},
});
// export default Store;
export default proxiedStore;
// similar to higher-order component design pattern
