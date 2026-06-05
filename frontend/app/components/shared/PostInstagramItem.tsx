import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { apiRequest } from '~/data/api';
import type { PostListItem, UserProfilePetResponse } from '~/data/types';
import SecureImage from '~/components/shared/SecureImage';

interface PostInstagramItemProps {
	id: number;
	data: PostListItem;
}

interface UserDataResponse {
	id: number;
	username: string;
}

interface UserProfilePetsResponse {
	pets: UserProfilePetResponse[];
}

interface PostLikeSummaryResponse {
	id: number;
	likesCount: number;
	isLikedByAuthenticatedUser: boolean;
}

export const formatCreationDate = (createdAtString: string): string => {
	if (!createdAtString) return '';
	const createdDate = new Date(createdAtString);
	const now = new Date();
	const diffInMs = now.getTime() - createdDate.getTime();
	const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

	if (diffInHours >= 0 && diffInHours < 24) {
		const hours = diffInHours === 0 ? 1 : diffInHours;
		return `${hours} hour${hours === 1 ? '' : 's'} ago`;
	} else {
		const day = String(createdDate.getDate()).padStart(2, '0');
		const month = String(createdDate.getMonth() + 1).padStart(2, '0');
		const year = createdDate.getFullYear();
		const hours = String(createdDate.getHours()).padStart(2, '0');
		const minutes = String(createdDate.getMinutes()).padStart(2, '0');
		return `${day}.${month}.${year} ${hours}:${minutes}`;
	}
};

export default function PostInstagramItem({ id, data }: PostInstagramItemProps) {
	const authorUsername = (data as any).creatorName || 'user';
	const [authorId, setAuthorId] = useState<number | null>(null);
	const [authorPets, setAuthorPets] = useState<UserProfilePetResponse[]>([]);

	const commentsCount = (data as any).commentsCount || 0;
	const taggedPets = ((data as any).pets || []) as string[];

	const [isLiked, setIsLiked] = useState<boolean>((data as any).isLikedByAuthenticatedUser);
	const [likesCount, setLikesCount] = useState<number>((data as any).likesCount || 0);
	const [isSubmittingLike, setIsSubmittingLike] = useState(false);

	useEffect(() => {
		setIsLiked((data as any).isLikedByAuthenticatedUser);
		setLikesCount((data as any).likesCount || 0);
	}, [data]);

	useEffect(() => {
		if (!id) return;

		apiRequest(`/posts/${id}/like`, 'GET')
			.then(async (res) => {
				if (res.ok) {
					const serverData = (await res.json()) as PostLikeSummaryResponse;
					setIsLiked(serverData.isLikedByAuthenticatedUser);
					setLikesCount(serverData.likesCount);
				}
			})
			.catch((err) => console.error(`Failed to sync like state for post ${id}:`, err));
	}, [id]);

	useEffect(() => {
		apiRequest(`/users/${authorUsername}`, 'GET')
			.then(async (res) => {
				if (res.ok) {
					const userData = (await res.json()) as UserDataResponse;
					setAuthorId(userData.id);
				}
			})
			.catch((err) => console.error(`Failed to resolve ID for user ${authorUsername}:`, err));
	}, [authorUsername]);

	useEffect(() => {
		if (!authorId || taggedPets.length === 0) {
			setAuthorPets([]);
			return;
		}

		apiRequest(`/users/${authorId}/profile`, 'GET')
			.then(async (res) => {
				if (res.ok) {
					const userData = (await res.json()) as UserProfilePetsResponse;
					setAuthorPets(userData.pets || []);
				}
			})
			.catch((err) => console.error(`Failed to fetch pets for user ${authorId}:`, err));
	}, [authorId, taggedPets.length]);

	const authorProfileLink = authorId ? `/users/profile/${authorId}` : '#';
	const getPetProfileLink = (petName: string) => {
		const pet = authorPets.find((item) => item.name === petName);
		return pet ? `/pets/profile/${pet.id}` : null;
	};
	const primaryPetName = taggedPets[0] || null;
	const primaryPet = primaryPetName
		? authorPets.find((item) => item.name === primaryPetName)
		: null;
	const primaryPetProfileLink = primaryPetName ? getPetProfileLink(primaryPetName) : null;

	const handleLikeToggle = async () => {
		if (isSubmittingLike) return;
		setIsSubmittingLike(true);

		const expectedLikedState = !isLiked;

		setIsLiked(expectedLikedState);
		setLikesCount((prev) => (expectedLikedState ? prev + 1 : Math.max(0, prev - 1)));

		try {
			const response = await apiRequest(`/posts/${id}/like`, 'POST');

			if (!response.ok) {
				throw new Error(`Failed to toggle like: ${response.status}`);
			}

			const serverData = (await response.json()) as PostLikeSummaryResponse;
			setIsLiked(serverData.isLikedByAuthenticatedUser);
			setLikesCount(serverData.likesCount);
		} catch (err) {
			console.error('Error toggling like state, rolling back:', err);
			setIsLiked(!expectedLikedState);
			setLikesCount((prev) => (!expectedLikedState ? prev + 1 : Math.max(0, prev - 1)));
		} finally {
			setIsSubmittingLike(false);
		}
	};

	return (
		<article className='w-full max-w-[480px] mx-auto overflow-hidden rounded-[24px] bg-[#FFFEFB] border border-[#F4F4F0] shadow-[0_8px_24px_rgba(48,51,48,0.04)] mb-8'>

			{/* Header with Top-Right Creation Date */}
			<div className='flex items-center justify-between p-4'>
				<div className='flex items-center gap-3'>
					{primaryPetProfileLink ? (
						<Link
							to={primaryPetProfileLink}
							className='h-10 w-10 flex items-center justify-center overflow-hidden rounded-full bg-[#FECAA5] text-[#644126] font-bold text-sm tracking-wider uppercase transition-transform hover:scale-105 shadow-inner'
						>
							{primaryPet?.profilePictureUrl ? (
								<SecureImage
									src={primaryPet.profilePictureUrl}
									alt={primaryPet.name}
									className='h-full w-full object-cover'
								/>
							) : (
								primaryPetName?.substring(0, 2)
							)}
						</Link>
					) : (
						<Link
							to={authorProfileLink}
							className={`h-10 w-10 flex items-center justify-center rounded-full bg-[#FECAA5] text-[#644126] font-bold text-sm tracking-wider uppercase transition-transform hover:scale-105 shadow-inner ${!authorId ? 'pointer-events-none opacity-70' : ''}`}
						>
							{(primaryPetName || authorUsername).substring(0, 2)}
						</Link>
					)}

					<div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
						{primaryPetProfileLink ? (
							<Link
								to={primaryPetProfileLink}
								className='text-base font-bold text-[#303330] hover:text-[#7D5739] transition-colors'
							>
								{primaryPetName}
							</Link>
						) : (
							<span className='text-base font-bold text-[#303330]'>
								{primaryPetName || authorUsername}
							</span>
						)}
						{primaryPetName && (
							<Link
								to={authorProfileLink}
								className={`text-base font-normal text-[#5D605C] hover:text-[#7D5739] transition-colors ${!authorId ? 'pointer-events-none' : ''}`}
							>
								@{authorUsername}
							</Link>
						)}
					</div>
				</div>

				{/* Creation Timestamp element */}
				<span className='text-sm font-medium text-[#5D605C]/70 select-none'>
					{formatCreationDate(data.createdAt)}
				</span>
			</div>

			{data.postPictureUrl && (
				<div className='w-full bg-[#FAF9F6] border-y border-[#F4F4F0] overflow-hidden aspect-square relative group'>
					<Link to={`/posts/${data.id}`} className='block w-full h-full'>
						<SecureImage
							src={data.postPictureUrl}
							alt='Memory content photo'
							className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]'
						/>
					</Link>
				</div>
			)}

			{data.text && (
				!data.postPictureUrl ? (
					<Link
						to={`/posts/${data.id}`}
						className='block px-4 pt-4 pb-2 text-base leading-relaxed text-[#303330] break-words font-medium whitespace-pre-wrap hover:bg-[#FAF9F6]/40 transition-colors'
					>
						{data.text}
					</Link>
				) : (
					<div className='px-4 pt-4 text-base leading-relaxed text-[#303330] break-words font-medium whitespace-pre-wrap'>
						{data.text}
					</div>
				)
			)}

			<div className='p-4 pt-2 space-y-3'>
                {taggedPets.length > 1 && (
                    <div className='flex flex-wrap gap-2 pt-1'>
                        {taggedPets.slice(1).map((pet, idx) => {
							const petProfileLink = getPetProfileLink(pet);
                            const className = 'rounded-full border border-[#D5D7D3] bg-[#F4F4F0] px-3 py-1 text-sm font-semibold text-[#644126] transition-colors hover:border-[#C7B8AA] hover:bg-[#FFFEFB]';

                            return petProfileLink ? (
                                <Link key={pet} to={petProfileLink} className={className}>
                                    {pet}
                                </Link>
                            ) : (
                                <span key={`${pet}-${idx}`} className={className}>
                                    {pet}
                                </span>
                            );
                        })}
                    </div>
                )}
				<div className='flex items-center gap-4 text-[#303330] border-t border-[#F4F4F0]/60 pt-2'>
					<button
						type='button'
						onClick={handleLikeToggle}
						aria-label={isLiked ? 'Unlike memory' : 'Like memory'}
						className={`hover:scale-110 transition-all ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
					>
						<svg
							className='w-6 h-6'
							fill={isLiked ? 'currentColor' : 'none'}
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
						</svg>
					</button>

					<Link
						to={`/posts/${data.id}`}
						aria-label='Comment on memory'
						className='hover:text-[#7D5739] hover:scale-105 transition-all flex items-center gap-1 text-sm font-medium text-[#303330]'
					>
						<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
						</svg>
					</Link>
				</div>

				<div className='text-sm font-normal text-[#303330] tracking-tight'>
					{likesCount} {likesCount === 1 ? 'like' : 'likes'},&nbsp;
                    {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
				</div>
			</div>
		</article>
	);
}
