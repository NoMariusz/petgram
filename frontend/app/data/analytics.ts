import ReactGA from 'react-ga4';

let isGoogleAnalyticsInitialized = false;

export function initGoogleAnalytics() {
	if (typeof window === 'undefined') {
		return;
	}

	const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
	if (!measurementId || isGoogleAnalyticsInitialized) {
		return;
	}

	ReactGA.initialize(measurementId);
	isGoogleAnalyticsInitialized = true;
}

export function trackPageView(path: string) {
	if (!isGoogleAnalyticsInitialized) {
		initGoogleAnalytics();
	}

	if (!isGoogleAnalyticsInitialized) {
		return;
	}

	ReactGA.send({
		hitType: 'pageview',
		page: path,
	});
}
