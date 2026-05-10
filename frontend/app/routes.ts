import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('posts/feed', 'routes/posts/feed.tsx'),
	route('posts/explore', 'routes/posts/explore.tsx'),
	route('posts/create', 'routes/posts/createPost.tsx'),
	route('users/login', 'routes/users/login.tsx'),
	route('forgot-password', 'routes/users/forgot-password.tsx'),
	route('users/register', 'routes/users/register.tsx'),
	route('users/profile', 'routes/users/userProfile.tsx'),
	route('register-email-send', 'routes/users/register-email-send.tsx'),
	route('pets/profile', 'routes/pets/petProfiel.tsx'),
	route('core/settings', 'routes/core/settings.tsx'),
] satisfies RouteConfig;
