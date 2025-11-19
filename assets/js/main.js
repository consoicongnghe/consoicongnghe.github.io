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

// Reusable copy-button initializer
// Buttons should have attribute `data-copy-target="<id>"` where the target element contains the text to copy.
// Example: <button data-copy-target="configText" class="rust-copy-btn">Copy</button>
function initCopyButtons(selector) {
	selector = selector || '[data-copy-target]';
	function initButton(btn) {
		if (btn.__copyInit) return; // prevent double-init
		btn.__copyInit = true;
		btn.addEventListener('click', function () {
			var targetId = btn.getAttribute('data-copy-target');
			if (!targetId) return;
			var el = document.getElementById(targetId);
			if (!el) return;
			var text = (el.innerText || el.textContent || '').trim();
			if (!navigator.clipboard || !navigator.clipboard.writeText) return;
			navigator.clipboard.writeText(text).then(function () {
				// immediate success state
				btn.style.transition = 'none';
				var prevLabel = btn.textContent;
				btn.textContent = 'Copied';
				btn.style.background = 'var(--cyan,cyan)';
				btn.style.color = 'black';
				// force reflow
				void btn.offsetWidth;
				// enable transition for revert
				btn.style.transition = 'background 400ms linear, color 400ms linear';
				// start revert after 1.2s, restore label at middle of fade
				setTimeout(function () {
					btn.style.background = 'var(--bg-block)';
					btn.style.color = '';
					setTimeout(function () {
						btn.textContent = prevLabel;
						btn.style.transition = '';
					}, 200);
				}, 1200);
			}).catch(function () { /* ignore errors */ });
		});
	}

	var buttons = document.querySelectorAll(selector);
	for (var i = 0; i < buttons.length; i++) initButton(buttons[i]);
}

// Auto-init on DOMContentLoaded
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', function () { initCopyButtons(); });
} else {
	initCopyButtons();
}