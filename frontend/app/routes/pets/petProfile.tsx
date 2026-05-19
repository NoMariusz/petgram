import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import LoggedContainer from '~/components/shared/LoggedContainer';
import Loader from '~/components/shared/Loader';
import MemoryGallery from '~/components/shared/MemoryGallery';
import SecureImage from '~/components/shared/SecureImage';
import shareIconUrl from '~/assets/share_icon.svg';
import { apiRequest } from '~/data/api';
import type { PetProfileResponse } from '~/data/types';

function formatCount(value: number) {
	if (value >= 1000) {
		const formatted = (value / 1000).toFixed(1).replace('.0', '');
		return `${formatted}k`;
	}
	return value.toString();
}

function formatBornAt(value: string | null) {
	if (!value) {
		return 'Unknown';
	}

	const datePart = value.split('T')[0];
	const [year, month, day] = datePart.split('-').map(Number);
	if (!year || !month || !day) {
		return 'Unknown';
	}

	return new Date(year, month - 1, day).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
}

function PawBadge() {
	return (
		<span className='absolute -bottom-6 -right-3 h-[52px] w-[52px] rounded-full bg-gradient-to-br from-[#7D5739] to-[#FECAA5] shadow-[0_12px_32px_rgba(48,51,48,0.2)] flex items-center justify-center'>
			<svg viewBox='0 0 24 24' className='h-7 w-7 text-white'>
				<path
					d='M7.2 10.2c-1.2 0-2.2-1.3-2.2-2.9S6 4.4 7.2 4.4s2.2 1.3 2.2 2.9-1 2.9-2.2 2.9Zm9.6 0c-1.2 0-2.2-1.3-2.2-2.9s1-2.9 2.2-2.9S19 5.7 19 7.3s-1 2.9-2.2 2.9ZM11 8.6c-1.2 0-2.1-1.2-2.1-2.8S9.8 3 11 3s2.1 1.2 2.1 2.8S12.2 8.6 11 8.6Zm2 0c-1.2 0-2.1-1.2-2.1-2.8S11.8 3 13 3s2.1 1.2 2.1 2.8S14.2 8.6 13 8.6Zm-1 11.8c-3.4 0-6.2-1.8-6.2-4.1 0-1.5 1.2-2.4 2.4-3.3.9-.7 1.7-1.4 2.3-2.4.3-.5.8-.8 1.5-.8s1.2.3 1.5.8c.6 1 1.4 1.7 2.3 2.4 1.2.9 2.4 1.8 2.4 3.3 0 2.3-2.8 4.1-6.2 4.1Z'
					fill='currentColor'
				/>
			</svg>
		</span>
	);
}

export default function PetProfile() {
	const { id } = useParams();
	const [petProfile, setPetProfile] =
		useState<PetProfileResponse | null>(null);
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
		apiRequest(`/pets/${id}`)
			.then(async (response) => {
				if (!response.ok) {
					throw new Error(`Request failed (${response.status})`);
				}
				const data = (await response.json()) as PetProfileResponse;
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

	const ownerLabel = useMemo(() => {
		if (!petProfile) {
			return '';
		}
		return petProfile.ownerDisplayName || petProfile.ownerUsername;
	}, [petProfile]);

	const handleShareProfile = () => {
		console.log('Share pet profile clicked');
	};

	return (
		<LoggedContainer activeItem='profile'>
			{error && (
				<p className='text-center text-xl text-red-600'>{error}</p>
			)}
			{isLoading || petProfile == null ? (
				<div className='flex justify-center py-24'>
					<Loader size={72} />
				</div>
			) : (
				<div className='space-y-8'>
					<section className='rounded-[30px] bg-[#FFFEFB] p-8 shadow-[0_12px_32px_rgba(48,51,48,0.06)] md:p-10'>
						<div className='flex flex-col gap-8 md:flex-row md:items-start'>
							<div className='relative mx-auto md:mx-0'>
								<div className='h-[148px] w-[148px] overflow-hidden rounded-full bg-[#E7E9E4] shadow-[0_0_0_5px_#FFFFFF,0_1px_2px_rgba(0,0,0,0.05)]'>
									{petProfile.profilePictureUrl ? (
										<SecureImage
											src={petProfile.profilePictureUrl}
											alt={petProfile.name}
											className='h-full w-full object-cover'
										/>
									) : (
										<div className='flex h-full w-full items-center justify-center text-[48px] font-extrabold text-[#7D5739]'>
											{petProfile.name.charAt(0) || 'P'}
										</div>
									)}
								</div>
								<PawBadge />
							</div>

							<div className='flex-1 space-y-6'>
								<div className='flex flex-wrap items-start justify-between gap-4'>
									<div>
										<h1 className='text-[40px] font-extrabold leading-tight text-[#303330]'>
											{petProfile.name}
										</h1>
										<p className='mt-1 text-[14px] text-[#303330]/95'>
											Owned by{' '}
											<Link
												to={
													petProfile.isOwnProfile
														? '/users/profile'
														: `/users/profile/${petProfile.ownerId}`
												}
												className='underline underline-offset-2'
											>
												{ownerLabel}
											</Link>
										</p>
									</div>

									<div className='flex items-center gap-3'>
										<button
											id='sharePetProfileButton'
											type='button'
											onClick={handleShareProfile}
											className='rounded-full bg-[#F4F4F0] p-3 text-sm font-semibold text-[#303330]'
										>
											<img
												src={shareIconUrl}
												alt='Share pet profile'
												className='h-5 w-5'
											/>
										</button>
										{petProfile.isOwnProfile && (
											<span className='rounded-full bg-gradient-to-br from-[#7D5739] to-[#FECAA5] px-6 py-3 text-sm font-bold text-[#FFF7F4]'>
												My pet
											</span>
										)}
									</div>
								</div>

								<p className='border-l-4 border-[#7D5739]/20 pl-6 text-[18px] italic leading-8 text-[#5D605C]'>
									{petProfile.bio || 'No bio provided yet.'}
								</p>
							</div>
						</div>
					</section>

					<section className='grid grid-cols-1 gap-5 md:grid-cols-3'>
						<div className='rounded-[28px] bg-[#F4F4F0] px-8 py-7'>
							<p className='text-[12px] font-bold uppercase tracking-[1.2px] text-[#303330]'>
								Born
							</p>
							<p className='mt-3 text-[24px] font-extrabold text-[#303330]'>
								{formatBornAt(petProfile.bornAt)}
							</p>
						</div>
						<div className='rounded-[28px] bg-[#F4F4F0] px-8 py-7'>
							<p className='text-[12px] font-bold uppercase tracking-[1.2px] text-[#303330]'>
								Memories
							</p>
							<p className='mt-3 text-[24px] font-extrabold text-[#303330]'>
								{formatCount(petProfile.memoriesCount)}
							</p>
						</div>
						<div className='rounded-[28px] bg-[#F4F4F0] px-8 py-7'>
							<p className='text-[12px] font-bold uppercase tracking-[1.2px] text-[#303330]'>
								Followers
							</p>
							<p className='mt-3 text-[24px] font-extrabold text-[#303330]'>
								{formatCount(petProfile.followersCount)}
							</p>
						</div>
					</section>

					<MemoryGallery relatedObjectType='pet' id={petProfile.id} />
				</div>
			)}
		</LoggedContainer>
	);
}
