import { authRoles } from 'app/auth';
import Register from './Register';
import EmailVerify from './EmailVerify';

const RegisterConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/register',
			component: Register
		},
		{
			path: '/verify-email',
			component: EmailVerify
		}
	]
};

export default RegisterConfig;
