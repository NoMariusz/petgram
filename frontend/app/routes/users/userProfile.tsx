import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from '~/components/shared/Loader';
import { apiRequest } from '~/data/api';
import type { UserProfileResponse } from '~/data/types';

export default function UserProfile() {
	const params = useParams();
	const id = params.id;
	const isOwnProfile = !id; // If no id is provided, it's the current user's profile
	const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(
		null,
	);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const path = id ? `/users/${id}/profile` : '/users/me/profile';
		// Fetch user profile by id
		apiRequest(path)
			.then((data) => {
				data.json().then((jsonData) => {
					// Handle the fetched user profile data
					console.log('Fetched user profile:', jsonData);
					setUserProfile(jsonData as UserProfileResponse);
				});
			})
			.catch((error) => {
				// Handle any errors that occur during the fetch
				console.error('Error fetching user profile:', error);
				setError(
					'Failed to load user profile. Please try again later.',
				);
				setUserProfile(null);
			});
	}, [id]);

	return (
		<div>
			{error ? (
				<p>{error}</p>
			) : userProfile == null ? (
				<Loader />
			) : (
				<p>{id ? `User ${id} Profile` : 'My User Profile'}</p>
			)}
		</div>
	);
}
