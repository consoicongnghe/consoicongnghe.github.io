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

// copy code button
document.querySelectorAll('.code-copy-button').forEach(button => {
	button.addEventListener('click', () => {
		const target = button.getAttribute('data-copy-target');
		const text = document.getElementById(target).textContent;
		const originalText = button.textContent;
		const originalColor = button.style.color;
		copyToClipboard(text).then(() => {
			button.textContent = 'Copied!';
			button.style.color = 'var(--cyan)';
			setTimeout(() => {
				button.textContent = originalText;
				button.style.color = originalColor;
			}, 2000);
		}).catch(err => {
			console.error('Failed to copy: ', err);
			button.textContent = 'Failed';
			button.style.color = 'var(--cyan)';
			setTimeout(() => {
				button.textContent = originalText;
				button.style.color = originalColor;
			}, 2000);
		});
	});
});

function copyToClipboard(text) {
	if (navigator.clipboard && window.isSecureContext) {
		return navigator.clipboard.writeText(text);
	} else {
		// Fallback for older browsers or non-HTTPS contexts
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.position = "fixed";
		textArea.style.left = "-999999px";
		textArea.style.top = "-999999px";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try {
			document.execCommand('copy');
			return Promise.resolve();
		} catch (err) {
			return Promise.reject(err);
		} finally {
			document.body.removeChild(textArea);
		}
	}
}

// Auto-init on DOMContentLoaded
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', function () { initCopyButtons(); });
} else {
	initCopyButtons();
}