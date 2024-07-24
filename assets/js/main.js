// press the button to show hidden string
function showHiddenString1() {
	var x = document.getElementById("hiddenString1");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

// https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
// Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon
function topnavHamburger() {
	var x = document.getElementById("topnav-right");
	if (x.className === "topnav-right") {
		x.className += " responsive";
	} else {
		x.className = "topnav-right";
	}
	// var x = document.getElementById("topnav-hamburger");
	// if (x.className === "topnav-hamburger") {
	// 	x.className += " active";
	// } else {
	// 	x.className = "topnav-hamburger";
	// }
}

// Google Tag Manager
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-ZLCH42TM0W');