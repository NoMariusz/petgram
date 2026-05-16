import { useEffect } from 'react';
import { useParams } from 'react-router';
import { apiRequest } from '~/data/api';

export default function UserProfile() {
	const params = useParams();
	const id = params.id;

	useEffect(() => {
		if (id) {
			// Fetch user profile by id
			apiRequest(`/users/${id}/profile`)
				.then((data) => {
					// Handle the fetched user profile data
					console.log('Fetched user profile:', data);
				})
				.catch((error) => {
					// Handle any errors that occur during the fetch
					console.error('Error fetching user profile:', error);
				});
		} else {
			// Fetch current user's profile
			apiRequest('/users/me/profile')
				.then((data) => {
					// Handle the fetched user profile data
					console.log('Fetched current user profile:', data);
				})
				.catch((error) => {
					// Handle any errors that occur during the fetch
					console.error(
						'Error fetching current user profile:',
						error,
					);
				});
		}
	}, [id]);

	return <p>{id ? `User ${id} Profile` : 'My User Profile'} res </p>;
}
