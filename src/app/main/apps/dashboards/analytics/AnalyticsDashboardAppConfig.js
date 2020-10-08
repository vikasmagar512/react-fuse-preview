import React from 'react';
import i18next from 'i18next';
import ar from './i18n/ar';
import en from './i18n/en';
import tr from './i18n/tr';
import kr from './i18n/kr';

i18next.addResourceBundle('en', 'AnalyticsDashboardApp', en);
i18next.addResourceBundle('tr', 'AnalyticsDashboardApp', tr);
i18next.addResourceBundle('ar', 'AnalyticsDashboardApp', ar);
i18next.addResourceBundle('kr', 'AnalyticsDashboardApp', kr);

const AnalyticsDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/dashboards/analytics',
			component: React.lazy(() => import('./AnalyticsDashboardApp'))
		}
	]
};

export default AnalyticsDashboardAppConfig;
