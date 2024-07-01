function showHiddenString1() {
	var x = document.getElementById("hiddenString1");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

// https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function topnavHamburger() {
	var x = document.getElementById("topnav-right");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
} 