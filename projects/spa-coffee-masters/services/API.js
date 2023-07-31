/*
    singleton
    .then and .catch
    or 
    async await
    fetch API first delivers an http response, not yet 'the data'
    await for the response to be parsed as JSON

*/

const API = {
	// url: "https://firtman.github.io/coffeemasters/api/menu.json",
	url: "./data/menu.json",
	fetchMenu: async () => {
		const result = await fetch(API.url);
		return await result.json();
	},
};

export default API;
