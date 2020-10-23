// import { authRoles } from 'app/auth';
import i18next from 'i18next';
// import DocumentationNavigation from '../main/documentation/DocumentationNavigation';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import kr from './navigation-i18n/kr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
i18next.addResourceBundle('kr', 'navigation', kr);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'dashboards',
				title: 'Dashboards',
				translate: 'DASHBOARDS',
				type: 'collapse',
				icon: 'dashboard',
				children: [
					{
						id: 'analytics-dashboard',
						title: 'Analytics',
						translate: 'ANALYTICS',
						type: 'item',
						url: '/apps/dashboards/analytics'
					},
					{
						id: 'project-dashboard',
						title: 'Project',
						translate: 'PROJECT',
						type: 'item',
						url: '/apps/dashboards/project'
					}
				]
			},
			{
				id: 'e-commerce',
				title: 'Receipts',
				translate: 'RECEIPTS',
				type: 'collapse',
				icon: 'receipt',
				url: '/apps/e-commerce',
				children: [
					{
						id: 'e-commerce-product-detail',
						title: 'Receipt status',
						translate: 'RECEIPT_STATUS',
						type: 'item',
						url: '/apps/e-commerce/receipts/file-manager',
						exact: true
					},
					{
						id: 'e-commerce-products',
						title: 'Receipts',
						translate: 'SUBMIT_RECEIPTS',
						type: 'item',
						url: '/apps/e-commerce/receipts/new',
						exact: true
					},
					{
						id: 'e-commerce-new-product',
						title: 'Approve receipts',
						translate: 'APPROVE_RECEIPTS',
						url: '/apps/e-commerce/receipts',
						type: 'item',
						exact: true
					},
				]
			},
			{
				id: 'todo',
				title: 'Projects',
				translate: 'PROJECT',
				type: 'item',
				icon: 'check_box',
				url: '/apps/todo',
				badge: {
					title: 3,
					bg: 'rgb(255, 111, 0)',
					fg: '#FFFFFF'
				}
			},
			{
				id: 'profile',
				title: 'Profile',
				type: 'item',
				icon: 'person',
				url: '/pages/profile'
			},
		]
	},
];

export default navigationConfig;
