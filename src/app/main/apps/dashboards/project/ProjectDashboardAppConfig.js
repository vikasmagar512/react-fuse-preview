import React from 'react';

import i18next from 'i18next';
import ar from './i18n/ar';
import en from './i18n/en';
import tr from './i18n/tr';
import kr from './i18n/kr';

i18next.addResourceBundle('en', 'ProjectDashboardApp', en);
i18next.addResourceBundle('tr', 'ProjectDashboardApp', tr);
i18next.addResourceBundle('ar', 'ProjectDashboardApp', ar);
i18next.addResourceBundle('kr', 'ProjectDashboardApp', kr);

const ProjectDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/dashboards/project',
			component: React.lazy(() => import('./ProjectDashboardApp'))
		}
	]
};

export default ProjectDashboardAppConfig;
