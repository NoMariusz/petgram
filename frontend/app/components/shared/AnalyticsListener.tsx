import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { trackPageView } from '../../data/analytics';

export function AnalyticsListener() {
	const location = useLocation();

	useEffect(() => {
		trackPageView(`${location.pathname}${location.search}`);
	}, [location.pathname, location.search]);

	return null;
}
