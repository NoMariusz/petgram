import { index, route, type RouteConfig } from '@react-router/dev/routes';
import { ROUTE_SEGMENTS } from "./route-constants"

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
