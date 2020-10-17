import React from 'react';
import { Redirect } from 'react-router-dom';

const ECommerceAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/e-commerce/products/:productId/:productHandle?',
			component: React.lazy(() => import('./product/Product'))
		},
		{
			path: '/apps/e-commerce/products',
			component: React.lazy(() => import('./products/Products'))
		},
		// {
		// 	path: '/apps/e-commerce/orders/:orderId',
		// 	component: React.lazy(() => import('./order/Order'))
		// },
		// {
		// 	path: '/apps/e-commerce/orders',
		// 	component: React.lazy(() => import('./orders/Orders'))
		// },
		{
			path: '/apps/e-commerce/products/file-manager',
			component: React.lazy(() => import('../file-manager/FileManagerApp'))
			// component: React.lazy(() => import('./orders/Orders'))
			// component: () => <Redirect to="/apps/e-commerce/file-manager" />
		},
		{
			path: '/apps/e-commerce',
			component: () => <Redirect to="/apps/e-commerce/products/file-manager" />
		},
	]
};

export default ECommerceAppConfig;
