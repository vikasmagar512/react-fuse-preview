import React from 'react';
import { Redirect } from 'react-router-dom';
import i18next from 'i18next';
import ar from './i18n/ar';
import en from './i18n/en';
import tr from './i18n/tr';
import kr from './i18n/kr';

i18next.addResourceBundle('en', 'TodoApp', en);
i18next.addResourceBundle('tr', 'TodoApp', tr);
i18next.addResourceBundle('ar', 'TodoApp', ar);
i18next.addResourceBundle('kr', 'TodoApp', kr);

const TodoAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: [
				'/apps/todo/label/:labelHandle/:todoId?',
				'/apps/todo/filter/:filterHandle/:todoId?',
				'/apps/todo/:folderHandle/:todoId?'
			],
			component: React.lazy(() => import('./TodoApp'))
		},
		{
			path: '/apps/todo',
			component: () => <Redirect to="/apps/todo/all" />
		}
	]
};

export default TodoAppConfig;
