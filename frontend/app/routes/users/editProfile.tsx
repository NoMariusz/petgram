import EditUserForm from '~/components/users/EditUserForm';
import { LoggedContainer } from '~/components/shared';
import { useEffect, useState } from 'react';
import type { UserDataResponse } from '~/data/types';
import Loader from '~/components/shared/Loader';
import { apiRequestJson } from '~/data/api';

export default function EditProfile() {
	const [userData, setUserData] = useState<UserDataResponse | null>(null);

	useEffect(() => {
		async function fetchUserData() {
			try {
				const data =
					await apiRequestJson<UserDataResponse>('/users/me');
				setUserData(data);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		}

		fetchUserData();
	}, []);

	return (
		<LoggedContainer>
			<section className='mt-10'>
				<div className='mb-6'>
					<h1 className='text-[24px] font-bold text-[#303330]'>
						Edit Profile
					</h1>
					<p className='text-[#5D605C]'>
						Update your profile information and settings.
					</p>
				</div>
				{userData ? (
					<EditUserForm initialData={userData} />
				) : (
					<Loader />
				)}
			</section>
		</LoggedContainer>
	);
}
