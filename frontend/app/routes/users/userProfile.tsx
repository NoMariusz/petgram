import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import LoggedContainer from '~/components/shared/LoggedContainer';
import Loader from '~/components/shared/Loader';
import MemoryGallery from '~/components/shared/MemoryGallery';
import shareIconUrl from '~/assets/share_icon.svg';
import mapPinIconUrl from '~/assets/map_pin_icon.svg';
import { apiRequest } from '~/data/api';
import type { UserProfileResponse } from '~/data/types';
import { FILE_SERVER_URL } from '~/data/constants';
import SecureImage from '~/components/shared/SecureImage';

export default function UserProfile() {
	const params = useParams();
	const id = params.id;
	const isOwnProfile = !id; // If no id is provided, it's the current user's profile
	const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(
		null,
	);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const path = id ? `/users/${id}/profile` : '/users/me/profile';
		setIsLoading(true);
		setError(null);
		apiRequest(path)
			.then(async (response) => {
				if (!response.ok) {
					throw new Error(`Request failed (${response.status})`);
				}
				const jsonData = (await response.json()) as UserProfileResponse;
				setUserProfile(jsonData);
			})
			.catch((error) => {
				console.error('Error fetching user profile:', error);
				setError(
					'Failed to load user profile. Please try again later.',
				);
				setUserProfile(null);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id]);

	const displayName = useMemo(() => {
		if (!userProfile) {
			return '';
		}
		const fullName =
			`${userProfile.firstName} ${userProfile.lastName}`.trim();
		return fullName || userProfile.username;
	}, [userProfile]);

	const handleEditProfile = () => {
		console.log('Edit profile clicked');
	};

	const handleShareProfile = () => {
		console.log('Share profile clicked');
	};

	const handleFollowToggle = () => {
		console.log('Follow/unfollow clicked');
	};

	const handleSharePinnedPost = () => {
		console.log('Share pinned post clicked');
	};

	const formatCount = (value: number) => {
		if (value >= 1000) {
			const formatted = (value / 1000).toFixed(1).replace('.0', '');
			return `${formatted}k`;
		}
		return value.toString();
	};

	return (
		<LoggedContainer activeItem='profile'>
			{error ? (
				<p className='text-red-600'>{error}</p>
			) : isLoading || userProfile == null ? (
				<div className='flex justify-center py-24'>
					<Loader size={72} />
				</div>
			) : (
				<div className='space-y-10'>
					<section className='relative rounded-[30px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.06)] p-10'>
						<div className='flex flex-col gap-8 md:flex-row md:items-start'>
							<div className='relative'>
								<div className='h-[128px] w-[128px] rounded-full bg-[#E7E9E4] shadow-[0_0_0_4px_#FFFFFF,0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden'>
									{userProfile.profilePictureUrl ? (
										<SecureImage
											src={
												FILE_SERVER_URL +
												userProfile.profilePictureUrl
											}
											alt={displayName}
											className='h-full w-full object-cover'
										/>
									) : (
										<div className='h-full w-full flex items-center justify-center text-3xl font-semibold text-[#7D5739]'>
											{displayName.charAt(0) || 'U'}
										</div>
									)}
								</div>
								<span className='absolute -bottom-8 -right-4 m-1 h-[53px] w-[53px] rounded-full bg-gradient-to-br from-[#7D5739] to-[#FECAA5] shadow-[0_12px_32px_rgba(48,51,48,0.2)] flex items-center justify-center'>
									<svg
										viewBox='0 0 24 24'
										className='h-6 w-6 text-white'
									>
										<path
											d='M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z'
											fill='currentColor'
										/>
									</svg>
								</span>
							</div>
							<span className='absolute -bottom-0 m-5 left-0 rounded-full bg-[#7D5739] px-4 py-2 text-xs font-semibold text-[#FFF7F4]'>
								{userProfile.role ?? 'Pet owner'}
							</span>

							<div className='flex-1 space-y-2'>
								<div className='flex flex-wrap items-center justify-between gap-4'>
									<div>
										<h1 className='text-[36px] font-extrabold text-[#303330]'>
											{displayName}
										</h1>
										<p className='text-[13px] text-[#303330]/95'>
											@{userProfile.username}
										</p>
									</div>
									<div className='flex items-center gap-3'>
										{isOwnProfile ? (
											<button
												type='button'
												onClick={handleEditProfile}
												className='rounded-full bg-gradient-to-br from-[#7D5739] to-[#FECAA5] px-6 py-3 text-sm font-bold text-[#FFF7F4] shadow-[0_12px_32px_rgba(48,51,48,0.06)]'
											>
												Edit profile
											</button>
										) : (
											<>
												<button
													id='shareProfileButton'
													type='button'
													onClick={handleShareProfile}
													className='rounded-full p-3 text-sm font-semibold text-[#303330] bg-[#F4F4F0]'
												>
													<img
														src={shareIconUrl}
														alt='Share profile'
														className='h-5 w-5'
													/>
												</button>
												<button
													id='followButton'
													type='button'
													onClick={handleFollowToggle}
													className='rounded-full bg-gradient-to-br from-[#7D5739] to-[#FECAA5] px-6 py-3 text-sm font-bold text-[#FFF7F4]'
												>
													{userProfile.isFollowed
														? 'Following'
														: 'Follow'}
												</button>
											</>
										)}
									</div>
								</div>

								<div className='flex items-center gap-2 text-[13px] text-[#303330]/95 mb-8'>
									<img
										src={mapPinIconUrl}
										alt='Location'
										className='h-5 w-5'
									/>
									<span>
										{userProfile.location ||
											'No location set'}
									</span>
								</div>

								<p className='border-l-4 border-[#7D5739]/20 pl-6 text-[18px] italic text-[#5D605C]'>
									{userProfile.bio || 'No bio provided yet.'}
								</p>
							</div>
						</div>
					</section>

					<section className='rounded-[32px] bg-[#F4F4F0] px-6 py-8'>
						<div className='grid grid-cols-1 gap-6 text-center md:grid-cols-3'>
							<div className='space-y-1'>
								<p className='text-[24px] font-bold text-[#303330]'>
									{formatCount(userProfile.postsCount)}
								</p>
								<p className='text-[12px] font-bold uppercase tracking-[1.2px] text-[#5D605C]'>
									Memories
								</p>
							</div>
							<div className='space-y-1 md:border-x md:border-[#B0B3AE]/20'>
								<p className='text-[24px] font-bold text-[#303330]'>
									{formatCount(userProfile.followersCount)}
								</p>
								<p className='text-[12px] font-bold uppercase tracking-[1.2px] text-[#5D605C]'>
									Followers
								</p>
							</div>
							<div className='space-y-1'>
								<p className='text-[24px] font-bold text-[#303330]'>
									{formatCount(userProfile.followingCount)}
								</p>
								<p className='text-[12px] font-bold uppercase tracking-[1.2px] text-[#5D605C]'>
									Following
								</p>
							</div>
						</div>
					</section>

					{userProfile.pinnedPost && (
						<section className='space-y-4'>
							<h2 className='text-[20px] font-bold text-[#303330]'>
								Pinned post
							</h2>

							<div className='relative rounded-[16px] bg-gradient-to-br from-[#7D5739] to-[#FECAA5] p-[1px]'>
								<div className='flex flex-col overflow-hidden rounded-[16px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.06)] md:flex-row'>
									<Link
										to={`/posts/${userProfile.pinnedPost.id}`}
										className='h-[176px] w-full md:w-[192px] bg-[#E7E9E4]'
									>
										{userProfile.pinnedPost
											.postPictureUrl && (
											<img
												src={
													userProfile.pinnedPost
														.postPictureUrl
												}
												alt={
													userProfile.pinnedPost.text
												}
												className='h-full w-full object-cover'
											/>
										)}
									</Link>
									<div className='flex flex-1 flex-col justify-center gap-4 px-6 py-6'>
										<div className='flex items-center justify-between gap-4'>
											<h3 className='text-[24px] font-semibold text-[#303330]'>
												{
													userProfile.pinnedPost
														.creatorName
												}
											</h3>
											<div className='flex items-center gap-2 text-[14px] font-semibold text-[#7D5739]'>
												<svg
													viewBox='0 0 24 24'
													className='h-4 w-4'
												>
													<path
														d='M14 3h7v7l-2-2-5 5-4-4-7 7-2-2 9-9-2-2z'
														fill='currentColor'
													/>
												</svg>
												<span>Pinned</span>
											</div>
										</div>
										<p className='text-[16px] font-bold text-[#303330]'>
											{userProfile.pinnedPost.text}
										</p>
										<div className='flex items-center gap-6 text-sm font-semibold text-[#303330]'>
											<span className='flex items-center gap-2'>
												<svg
													viewBox='0 0 24 24'
													className='h-5 w-5 text-[#A33D3E]'
												>
													<path
														d='M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.4-7 10-7 10z'
														fill='currentColor'
													/>
												</svg>
												{
													userProfile.pinnedPost
														.likesCount
												}
											</span>
											<button
												type='button'
												onClick={handleSharePinnedPost}
												className='flex items-center gap-2 text-[#5D605C]'
											>
												<svg
													viewBox='0 0 24 24'
													className='h-4 w-4'
												>
													<path
														d='M15 8a3 3 0 1 0-2.8-4H12a3 3 0 0 0 0 6 2.9 2.9 0 0 0 1.8-.6l4 2a3 3 0 1 0 0 3.2l-4 2a3 3 0 1 0 .4 1.4l4-2a3 3 0 1 0 .8-2.2l-4-2z'
														fill='currentColor'
													/>
												</svg>
												Share
											</button>
										</div>
									</div>
								</div>
							</div>
						</section>
					)}

					<section className='space-y-4'>
						<h2 className='text-[20px] font-bold text-[#303330]'>
							My pets
						</h2>
						<div className='flex flex-wrap gap-6'>
							{userProfile.pets.length === 0 ? (
								<div className='rounded-[16px] bg-[#FFFEFB] p-6 text-sm text-[#5D605C] shadow-[0_12px_32px_rgba(48,51,48,0.06)]'>
									No pets yet.
								</div>
							) : (
								userProfile.pets.map((pet) => (
									<Link
										key={pet.id}
										to={`/pets/profile/${pet.id}`}
										className='w-[170px] rounded-[16px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.06)] p-3'
									>
										<div className='h-[120px] w-full overflow-hidden rounded-[16px] bg-[#E7E9E4]'>
											{pet.profilePictureUrl && (
												<img
													src={pet.profilePictureUrl}
													alt={pet.name}
													className='h-full w-full object-cover'
												/>
											)}
										</div>
										<div className='mt-3 flex flex-col gap-1'>
											<span className='text-[16px] font-bold text-[#000000]'>
												{pet.name}
											</span>
											<span className='text-[15px] text-[#000000]'>
												profile ↗
											</span>
										</div>
									</Link>
								))
							)}
						</div>
					</section>

					<MemoryGallery
						relatedObjectType='user'
						id={userProfile.id}
					/>
				</div>
			)}
		</LoggedContainer>
	);
}
