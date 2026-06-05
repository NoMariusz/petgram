import { index, route, type RouteConfig } from '@react-router/dev/routes';

export const ROUTE_SEGMENTS = {
	home: '',
	postsFeed: 'posts/feed',
	postsExplore: 'posts/explore',
	postsCreate: 'posts/create',
	postsById: 'posts/:id',
	login: 'login',
	forgotPassword: 'forgot-password',
	register: 'register',
	registerEmailSend: 'register-email-send',
	usersProfile: 'users/profile',
	usersProfileEdit: 'users/profile/edit',
	usersProfileById: 'users/profile/:id',
	petsAdd: 'pets/add',
	petsProfileById: 'pets/profile/:id',
	petsProfileEdit: 'pets/profile/:id/edit',
	messages: 'messages',
	settings: 'settings',
	coreSettings: 'core/settings',
	notFound: '*',
} as const;

export const ROUTES = {
	home: '/',
	posts: {
		feed: `/${ROUTE_SEGMENTS.postsFeed}`,
		explore: `/${ROUTE_SEGMENTS.postsExplore}`,
		create: `/${ROUTE_SEGMENTS.postsCreate}`,
		byId: (id: string | number) => `/posts/${id}`,
	},
	auth: {
		login: `/${ROUTE_SEGMENTS.login}`,
		forgotPassword: `/${ROUTE_SEGMENTS.forgotPassword}`,
		register: `/${ROUTE_SEGMENTS.register}`,
		registerEmailSend: `/${ROUTE_SEGMENTS.registerEmailSend}`,
	},
	users: {
		profile: `/${ROUTE_SEGMENTS.usersProfile}`,
		profileEdit: `/${ROUTE_SEGMENTS.usersProfileEdit}`,
		profileById: (id: string | number) => `/users/profile/${id}`,
	},
	pets: {
		add: `/${ROUTE_SEGMENTS.petsAdd}`,
		profileById: (id: string | number) => `/pets/profile/${id}`,
		profileEdit: (id: string | number) => `/pets/profile/${id}/edit`,
	},
	messages: `/${ROUTE_SEGMENTS.messages}`,
	settings: `/${ROUTE_SEGMENTS.settings}`,
	coreSettings: `/${ROUTE_SEGMENTS.coreSettings}`,
	catchAll: ROUTE_SEGMENTS.notFound,
} as const;

export default [
	index('routes/home.tsx'),
	route(ROUTE_SEGMENTS.postsFeed, 'routes/posts/feed.tsx'),
	route(ROUTE_SEGMENTS.postsExplore, 'routes/posts/explore.tsx'),
	route(ROUTE_SEGMENTS.postsCreate, 'routes/posts/createPost.tsx'),
	route(ROUTE_SEGMENTS.postsById, 'routes/posts/post.tsx'),
	route(ROUTE_SEGMENTS.login, 'routes/users/login.tsx'),
	route(ROUTE_SEGMENTS.forgotPassword, 'routes/users/forgot-password.tsx'),
	route(ROUTE_SEGMENTS.register, 'routes/users/register.tsx'),
	route(
		ROUTE_SEGMENTS.registerEmailSend,
		'routes/users/register-email-send.tsx',
	),
	// Support optional id parameter for viewing other users' profiles
	route(ROUTE_SEGMENTS.usersProfile, 'routes/users/userProfile.tsx'),
	route(ROUTE_SEGMENTS.usersProfileEdit, 'routes/users/editProfile.tsx'),
	route(ROUTE_SEGMENTS.usersProfileById, 'routes/users/userProfileParam.tsx'),
	route(ROUTE_SEGMENTS.petsAdd, 'routes/pets/addPet.tsx'),
	route(ROUTE_SEGMENTS.petsProfileById, 'routes/pets/petProfile.tsx'),
	route(ROUTE_SEGMENTS.petsProfileEdit, 'routes/pets/editPet.tsx'),
	route(ROUTE_SEGMENTS.notFound, 'routes/not-found.tsx'),
] satisfies RouteConfig;
