import API from "./API.js";

// upgrade function to async
// how can we detect that the store has changed ?
// how can we 'react'
export async function loadData() {
	const data = await API.fetchMenu();
	app.store.menu = data;
}

export async function getProductById(id) {
	if (app.store.menu == null) {
		await loadData();
	}
	for (let c of app.store.menu) {
		for (let p of c.products) {
			if (p.id == id) {
				return p;
			}
		}
	}
	return null;
}
