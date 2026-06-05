import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import LoggedContainer from '~/components/shared/LoggedContainer';
import Loader from '~/components/shared/Loader';
import MemoryGallery from '~/components/shared/MemoryGallery';
import shareIconUrl from '~/assets/share_icon.svg';
import sharePostIconUrl from '~/assets/share_post_icon.svg';
import mapPinIconUrl from '~/assets/map_pin_icon.svg';
import pinIconUrl from '~/assets/pin_icon.svg';
import { apiRequest, apiRequestJson } from '~/data/api';
import type { UserProfileResponse } from '~/data/types';
import SecureImage from '~/components/shared/SecureImage';
import { DEFAULT_USER_ROLE } from '~/data/constants';
import SimpleAccentButton from '~/components/shared/SimpleAccentButton';
import { formatCount } from '~/utils/formatters';

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
		apiRequestJson<UserProfileResponse>(path)
			.then((jsonData) => {
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

	const handleFollowToggle = async () => {
		const url = userProfile?.isFollowed
			? `/users/${userProfile.id}/unfollow`
			: `/users/${userProfile?.id}/follow`;
		const res = await apiRequest(url, 'POST');
		if (res.ok && userProfile) {
			setUserProfile({
				...userProfile,
				isFollowed: !userProfile.isFollowed,
				followersCount: userProfile.isFollowed
					? userProfile.followersCount - 1
					: userProfile.followersCount + 1,
			});
		} else {
			console.error('Failed to toggle follow status');
		}
	};

	const handleSharePinnedPost = () => {
		console.log('Share pinned post clicked');
	};

	const roleLabel = userProfile?.role ?? DEFAULT_USER_ROLE;
	const showUpgrade = isOwnProfile && roleLabel === DEFAULT_USER_ROLE;

	const handleUpgradeRole = () => {
		console.log('Upgrade role clicked');
	};

	return (
		<LoggedContainer activeItem='profile'>
			{error && (
				<p className='text-red-600 text-center text-xl'>{error}</p>
			)}
			{isLoading || userProfile == null ? (
				<div className='flex justify-center py-24'>
					<Loader size={72} />
				</div>
			) : (
				<div className='space-y-10'>
					<section className='rounded-[30px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.06)] p-8 md:p-10'>
						<div className='flex flex-col gap-8 md:flex-row md:items-start'>
							<div className='flex w-full shrink-0 flex-col items-center md:w-[160px]'>
								<div className='relative'>
									<div className='h-[128px] w-[128px] rounded-full bg-[#E7E9E4] shadow-[0_0_0_4px_#FFFFFF,0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden'>
										{userProfile.profilePictureUrl ? (
											<SecureImage
												src={
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
									<span className='absolute -bottom-2 -right-2 h-[52px] w-[52px] rounded-full bg-gradient-to-br from-[#7D5739] to-[#FECAA5] shadow-[0_12px_32px_rgba(48,51,48,0.16)] flex items-center justify-center'>
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
							</div>

							<div className='flex-1 space-y-5 text-center md:text-left'>
								<div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6'>
									<div>
										<div className='flex flex-wrap items-baseline justify-center items-center gap-x-3 gap-y-1 md:justify-start'>
											<h1 className='text-[30px] font-extrabold leading-tight text-[#303330] md:text-[36px]'>
												{displayName}
											</h1>
											<p className='text-[30px] font-light leading-tight text-[#303330]/55'>
												@{userProfile.username}
											</p>
										</div>
										<div className='mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start'>
											<span className='relative rounded-full bg-[#7D5739] px-3 py-1.5 text-xs font-semibold text-[#FFF7F4]'>
												{roleLabel}
												{showUpgrade && (
													<button
														type='button'
														onClick={
															handleUpgradeRole
														}
														className='absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#FECAA5] text-[#7D5739] flex items-center justify-center shadow-[0_4px_10px_rgba(48,51,48,0.15)] group'
														aria-label='Upgrade role'
													>
														<span className='text-xs font-bold'>
															+
														</span>
														<span className='pointer-events-none absolute -top-10 right-0 whitespace-nowrap rounded-full bg-[#303330] px-3 py-1 text-[11px] text-[#FFF7F4] opacity-0 transition-opacity group-hover:opacity-100'>
															Upgrade your profile
															to Specialist role!
														</span>
													</button>
												)}
											</span>
											<span className='flex items-center gap-2 text-[14px] text-[#303330]/90'>
												<img
													src={mapPinIconUrl}
													alt=''
													className='h-5 w-5'
													aria-hidden='true'
												/>
												{userProfile.location ||
													'No location set'}
											</span>
										</div>
									</div>
									<div className='flex items-center justify-center gap-3 md:justify-end'>
										{isOwnProfile ? (
											<Link
												to='/users/profile/edit'
												className='rounded-full bg-gradient-to-br from-[#7D5739] to-[#FECAA5] px-6 py-3 text-sm font-bold text-[#FFF7F4] transition-all duration-200 hover:brightness-[1.02] hover:shadow-md active:scale-[0.99]'
											>
												Edit profile
											</Link>
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
												<SimpleAccentButton
													id='followButton'
													type='button'
													onClick={handleFollowToggle}
												>
													{userProfile.isFollowed
														? 'Following'
														: 'Follow'}
												</SimpleAccentButton>
											</>
										)}
									</div>
								</div>

								<p className='border-l-0 border-[#7D5739]/20 text-[16px] italic leading-7 text-[#5D605C] md:border-l-4 md:pl-6 md:text-[18px] mt-0'>
									{userProfile.bio || 'No bio provided yet.'}
								</p>
							</div>
						</div>
					</section>

					{userProfile.pinnedPost && (
						<section className='space-y-4'>
							<h2 className='text-[20px] font-bold text-[#303330]'>
								Pinned post
							</h2>

							<div className='relative rounded-[16px] bg-gradient-to-br from-[#7D5739] to-[#FECAA5] p-[4px]'>
								<div className='flex flex-col overflow-hidden rounded-[16px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.06)] md:flex-row'>
									<Link
										to={`/posts/${userProfile.pinnedPost.id}`}
										className='h-[176px] w-full md:w-[192px] bg-[#E7E9E4]'
									>
										{userProfile.pinnedPost
											.postPictureUrl && (
											<SecureImage
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
												<img
													src={pinIconUrl}
													alt='Pinned'
													className='h-4 w-4'
												/>
												<span>Pinned</span>
											</div>
										</div>
										<p className='text-[16px] text-[#303330]'>
											<b>
												{
													userProfile.pinnedPost
														.creatorName
												}
											</b>
											: {userProfile.pinnedPost.text}
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
												<img
													src={sharePostIconUrl}
													alt='Share post'
													className='h-5 w-5'
												/>
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
									{isOwnProfile ? (
										<p>
											There is no pets, sooo Let's add
											some pets to your profile!
										</p>
									) : (
										<p>No pets yet.</p>
									)}
								</div>
							) : (
								userProfile.pets.map((pet) => (
									<Link
										key={pet.id}
										to={`/pets/profile/${pet.id}`}
										className='w-[180px] overflow-hidden rounded-[18px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.06)] transition-all duration-200 hover:shadow-[0_16px_36px_rgba(48,51,48,0.1)]'
									>
										<div className='h-[128px] w-full overflow-hidden bg-[#E7E9E4]'>
											{pet.profilePictureUrl && (
												<SecureImage
													src={pet.profilePictureUrl}
													alt={pet.name}
													className='h-full w-full object-cover'
												/>
											)}
										</div>
										<div className='flex flex-col gap-1 px-4 py-4'>
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
							{isOwnProfile && (
								<Link
									to='/pets/add'
									className='flex min-h-[198px] w-[180px] flex-col items-center justify-center rounded-[18px] border border-dashed border-[#D5D7D3] bg-[#FFFEFB]/70 p-4 text-center text-[#5D605C] transition-colors duration-200 hover:border-[#C7B8AA] hover:bg-[#FFFEFB]'
								>
									<span className='flex h-11 w-11 items-center justify-center rounded-full border border-[#D5D7D3] bg-white text-2xl font-semibold text-[#7D5739]'>
										+
									</span>
									<span className='mt-3 text-[15px] font-semibold text-[#303330]'>
										Add a pet
									</span>
								</Link>
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
