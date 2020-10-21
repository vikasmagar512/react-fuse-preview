import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import _ from '@lodash';
import NoteFormAddListItem from 'app/main/apps/notes/note-form/checklist/NoteFormAddListItem';

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	authDB = {
		users: [
			{
				uuid: 'XgbuVEXBU5gtSKdbQRP1Zbbby1i1',
				from: 'custom-db',
				password: 'admin',
				role: 'admin',
				data: {
					displayName: 'Abbott Keitch',
					photoURL: 'assets/images/avatars/Abbott.jpg',
					email: 'admin',
					settings: {
						layout: {
							style: 'layout1',
							config: {
								scroll: 'content',
								navbar: {
									display: true,
									folded: true,
									position: 'left'
								},
								toolbar: {
									display: true,
									style: 'fixed',
									position: 'below'
								},
								footer: {
									display: false,
									style: 'fixed',
									position: 'below'
								},
								mode: 'fullwidth',
								rightSidePanel:{
									display: false,
								}
							}
						},
						customScrollbars: true,
						theme: {
							main: 'defaultDark',
							navbar: 'defaultDark',
							toolbar: 'defaultDark',
							footer: 'defaultDark'
						}
					},
					shortcuts: ['calendar', 'mail', 'contacts']
				}
			},
			{
				uuid: 'XgbuVEXBU6gtSKdbTYR1Zbbby1i3',
				from: 'custom-db',
				password: 'staff',
				role: 'staff',
				data: {
					displayName: 'Arnold Matlock',
					photoURL: 'assets/images/avatars/Arnold.jpg',
					email: 'staff',
					settings: {
						layout: {
							style: 'layout2',
							config: {
								mode: 'boxed',
								scroll: 'content',
								navbar: {
									display: true
								},
								toolbar: {
									display: true,
									position: 'below'
								},
								footer: {
									display: false,
									style: 'fixed'
								},
								rightSidePanel:{
									display: false,
								}
							}
						},
						customScrollbars: true,
						theme: {
							main: 'greeny',
							navbar: 'mainThemeDark',
							toolbar: 'mainThemeDark',
							footer: 'mainThemeDark'
						}
					},
					shortcuts: ['calendar', 'mail', 'contacts', 'todo']
				}
			}
		]
	};
	init() {
		axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
		// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
		axios.defaults.headers.post['Content-Type'] = 'application/json';

		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/api/auth/register', data).then(response => {
				debugger
				if (response.data.user) {
					this.setSession(response.data.token);
					resolve(response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};
	
	signInWithEmailAndPassword = (email, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post('/api/auth/login', {
					username:email,
					password
				})
				.then(response => {
					const {data} = response.data 
					debugger
					const userTemplate = _.cloneDeep(this.authDB.users.find(_user => _user.role === data.user.role));
					debugger
					const user = {
							uuid: 'XgbuVEXBU6gtSKdbTYR1Zbbby1i3',
							from: 'custom-db',
							role: data.user.role,
							data: {
								...data.user,
								email: data.user.userName,
								settings: userTemplate.data.settings
							}
					}
					debugger
					if (data.user) {
						this.setSession(data.token);
						resolve(user);
					} else {
						reject(data.error);
					}
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.post('/api/auth/verify-token', {
					access_token: this.getAccessToken()
				})
				.then(response => {
					const {data} = response.data 
					debugger
					const userTemplate = _.cloneDeep(this.authDB.users.find(_user => _user.role === data.user.role));
					debugger
					const user = {
							uuid: 'XgbuVEXBU6gtSKdbTYR1Zbbby1i3',
							from: 'custom-db',
							role: data.user.role,
							data: {
								...data.user,
								email: data.user.userName,
								settings: userTemplate.data.settings
							}
					}
					debugger
					if (data.user) {
						// this.setSession(data.token);
						resolve(user);
					} else {
						this.logout();
						reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Failed to login with token.'));
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		debugger
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const instance = new JwtService();

export default instance;
