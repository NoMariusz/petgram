import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import EditPetForm from '~/components/pets/EditPetForm';
import LoggedContainer from '~/components/shared/LoggedContainer';
import Loader from '~/components/shared/Loader';
import { apiRequestJson } from '~/data/api';
import type { PetProfileResponse } from '~/data/types';

export default function EditPet() {
	const { id } = useParams();
	const [petProfile, setPetProfile] = useState<PetProfileResponse | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) {
			setError('Pet id is missing.');
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		setError(null);
		apiRequestJson<PetProfileResponse>(`/pets/${id}`)
			.then((data) => {
				setPetProfile(data);
			})
			.catch((error) => {
				console.error('Error fetching pet profile:', error);
				setError('Failed to load pet profile. Please try again later.');
				setPetProfile(null);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id]);

	return (
		<LoggedContainer activeItem='profile'>
			{error && (
				<p className='text-center text-xl text-red-600'>{error}</p>
			)}
			{isLoading || petProfile == null ? (
				<div className='flex justify-center py-24'>
					<Loader size={72} />
				</div>
			) : !petProfile.isOwnProfile ? (
				<section className='rounded-[30px] bg-[#FFFEFB] p-10 text-center shadow-[0_12px_32px_rgba(48,51,48,0.06)]'>
					<h1 className='text-[28px] font-extrabold text-[#303330]'>
						This pet belongs to another user
					</h1>
					<p className='mt-3 text-[#5D605C]'>
						Only the owner can edit this pet profile.
					</p>
					<Link
						to={`/pets/profile/${petProfile.id}`}
						className='mt-6 inline-flex h-[48px] items-center justify-center rounded-[20px] bg-gradient-to-br from-[#7D5739] to-[#FECAA5] px-8 text-sm font-bold text-[#FFF7F4]'
					>
						Back to pet profile
					</Link>
				</section>
			) : (
				<section className='rounded-[30px] bg-[#FFFEFB] p-8 shadow-[0_12px_32px_rgba(48,51,48,0.06)] md:p-10'>
					<div className='mb-8'>
						<p className='text-[12px] font-bold uppercase tracking-[1.2px] text-[#7D5739]'>
							Pet profile
						</p>
						<h1 className='mt-2 text-[32px] font-extrabold text-[#303330]'>
							Edit {petProfile.name}
						</h1>
						<p className='mt-2 max-w-2xl text-[16px] leading-6 text-[#5D605C]'>
							Update the public details connected to this pet.
						</p>
					</div>

					<EditPetForm initialData={petProfile} />
				</section>
			)}
		</LoggedContainer>
	);
}
