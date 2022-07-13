import { LitElement, html, css } from "https://cdn.skypack.dev/lit";
// console.log(LitElement);
export default class MyCounter extends LitElement {
	// what properties would our counter need ?
	// static properties = ['count']
	static properties = {
		// keep track of the count
		// count is an object
		// reactive property, with type
		// count: { type:Number, state:true }
		// for Lit, state is kept local when false - not accepting in from attributes
		// 	props and attributes are different
		count: { state: false },
	};
	/*
	vanilla JS version:
	static get observedAttributes() {
		return ['count']
	}
	*/
	static styles = [
		css`
			:host {
				display: flex;
				height: 8rem;
			}
			.btn {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				border-style: none;
				background-color: transparent;
			}
			.btn:hover {
				cursor: pointer;
			}
			.btn:hover .icon {
				fill: #15cbff;
			}
			.icon {
				height: 4rem;
			}
			.number {
				font-family: "Quicksand", sans-serif;
				font-size: 8rem;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				height: 100%;
				width: 20rem;
			}
		`,
	];
	// create the class
	constructor() {
		super();
		this.count = 0;
	}
	// increment
	_plus() {
		this.count++;
	}
	//decrement
	_minus() {
		this.count--;
	}
	// Lit render function
	// Lit uses custom directives
	// Angular Directives & Decorators
	// https://medium.com/swlh/angular-directives-decorators-23faf07b0bf9
	render() {
		return html`
			<button class="btn" @click="${this._minus}">
				<svg class="icon" viewBox="0 0 448 512">
					<path
						d="M24 264h400c4.406 0 8-3.572 8-7.994C432 251.6 428.4 248 424 248H24c-4.406 0-8 3.584-8 8.006C16 260.4 19.59 264 24 264z"
					/>
				</svg>
			</button>
			<span class="number"> ${this.count} </span>
			<button class="btn" @click="${this._plus}">
				<svg class="icon" viewBox="0 0 448 512">
					<path
						d="M432 256C432 260.4 428.4 264 424 264h-192v192c0 4.422-3.578 8.006-8 8.006S216 460.4 216 456v-192h-192c-4.422 0-8-3.572-8-7.994C16 251.6 19.58 248 24 248h192v-192c0-4.422 3.578-7.994 8-7.994S232 51.58 232 56v192h192C428.4 248 432 251.6 432 256z"
					/>
				</svg>
			</button>
		`;
	}
}

customElements.define("my-counter", MyCounter);
