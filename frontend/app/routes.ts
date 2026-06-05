import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('posts/feed', 'routes/posts/feed.tsx'),
	route('posts/explore', 'routes/posts/explore.tsx'),
	route('posts/create', 'routes/posts/createPost.tsx'),
	route('posts/:id', 'routes/posts/post.tsx'),
	route('login', 'routes/users/login.tsx'),
	route('forgot-password', 'routes/users/forgot-password.tsx'),
	route('register', 'routes/users/register.tsx'),
	route('register-email-send', 'routes/users/register-email-send.tsx'),
	// Support optional id parameter for viewing other users' profiles
	route('users/profile', 'routes/users/userProfile.tsx'),
	route('users/profile/edit', 'routes/users/editProfile.tsx'),
	route('users/profile/:id', 'routes/users/userProfileParam.tsx'),
	route('pets/add', 'routes/pets/addPet.tsx'),
	route('pets/profile/:id', 'routes/pets/petProfile.tsx'),
	route('pets/profile/:id/edit', 'routes/pets/editPet.tsx'),
	route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
