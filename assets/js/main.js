// https://stackoverflow.com/questions/66927938/how-do-i-create-show-hide-elements-for-different-buttons
// press the button to show hidden string
function showHiddenString(ID) {
	var x = document.getElementById(ID);
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

// https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
// copy code button
function copyButton() {
	var copyText = document.getElementById("textToCopy");
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(copyText.value);

	var copyTooltip = document.getElementById("cpTooltip");
	copyTooltip.innerHTML = "Copied";
}
// this is for when moving the mouse out of the button
function outFunc() {
	var copyTooltip = document.getElementById("cpTooltip");
	copyTooltip.innerHTML = "Copy";
}