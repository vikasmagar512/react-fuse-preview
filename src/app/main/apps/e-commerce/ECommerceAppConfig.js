import React from 'react';
import { Redirect } from 'react-router-dom';

const ECommerceAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		
		{
			path: '/apps/e-commerce/receipts/file-manager',
			component: React.lazy(() => import('./file-manager/FileManagerApp'))
		},
		{
			path: '/apps/e-commerce/receipts/:productId/:productHandle?',
			component: React.lazy(() => import('./product/Product'))
		},
		{
			path: '/apps/e-commerce/receipts',
			component: React.lazy(() => import('./products/Products'))
		},
		{
			path: '/apps/e-commerce',
			component: () => <Redirect to="/apps/e-commerce/receipts/file-manager" />
		},
	]
};

export default ECommerceAppConfig;
