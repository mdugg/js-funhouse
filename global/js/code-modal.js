let toggleBtn = document.querySelectorAll("[data-btn='toggle']");
let modal = document.querySelector(".fun__code-block");

// for (var i = 0; i < toggleBtn.length; i++) {
// 	toggleBtn[i].addEventListener("click", toggleModal);
// }
toggleBtn.forEach((element) => {
	element.addEventListener("click", toggleModal);
});

function toggleModal(event) {
	// console.log("click event working");
	modal.classList.toggle("fun__code-block--hidden");
}
