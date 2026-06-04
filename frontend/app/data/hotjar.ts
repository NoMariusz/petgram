const HOTJAR_SCRIPT_ID = 'hotjar-contentsquare-script';

export function initHotjar() {
	if (typeof document === 'undefined') {
		return;
	}

	const scriptUrl = import.meta.env.VITE_HOTJAR_SCRIPT_URL;

	if (!scriptUrl || document.getElementById(HOTJAR_SCRIPT_ID)) {
		return;
	}

	const script = document.createElement('script');
	script.id = HOTJAR_SCRIPT_ID;
	script.src = scriptUrl;
	script.async = true;

	document.head.appendChild(script);
}
