const theme = localStorage.getItem('theme') /* get theme status */
/* Dark mode toggle button: https://github.com/mahozad/theme-switch */
/* localStorage.setItem('theme', 'light') 	/* set auto theme across browser sessions. if null? */
theme-switch {
	width: 17px;
	padding: 5px;
	background: #333;
	
	/*  if want animated then https://gist.github.com/mahozad/a8114b6145cac721f7652aa7b0732cf6 */
	--theme-switch-icon-color: #fff;
}

/* These are applied for the default (light) theme */
/* (or when the toggle is auto, and the OS theme is light) */
html {
	--my-page-background-color: #fff;
	--my-text-color: #000;
}

/* These are applied for the dark theme */
/* (or when the toggle is auto, and the OS theme is dark) */
/* If a property has the same value for light and dark themes, no need to redeclare it here */
html[data-theme="dark"] {
	--my-page-background-color: #121212;
	--my-text-color: #fff;
}

body /* or any selector you want */ {
  background: var(--my-page-background-color);
  color: var(--my-text-color);
}
