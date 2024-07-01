function showHiddenString1() {
	var x = document.getElementById("hiddenString1");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

// https://www.w3schools.com/howto/howto_js_sticky_header.asp
// When the user scrolls the page, execute stickytopnav
window.onscroll = function () { stickytopnav() };

// Get the header
var header = document.getElementById("topnav");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickytopnav() {
	if (window.scrollY > sticky) {
		header.classList.add("sticky");
	} else {
		header.classList.remove("sticky");
	}
} 