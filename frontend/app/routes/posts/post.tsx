import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { apiRequestJson } from '~/data/api';
import SecureImage from '~/components/shared/SecureImage';
import { formatCreationDate } from '~/components/shared/PostInstagramItem';
import { LoggedContainer } from '~/components/shared';

interface PostSummaryResponse {
	id: number;
	text: string;
	postPictureUrl?: string;
	creatorName: string;
	createdAt: string;
	likesCount: number;
	pets: string[];
}

interface UserDataResponse {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	verified: boolean;
}

interface UserProfilePetResponse {
	id: number;
	name: string;
	profilePictureUrl?: string;
}

interface UserProfileResponse {
	id: number;
	pets: UserProfilePetResponse[];
}

interface PostLikeSummaryResponse {
	id: number;
	likesCount: number;
	isLikedByAuthenticatedUser: boolean;
}

interface PostCommentSummaryResponse {
	id: number;
	text: string;
	creatorUsername: string;
	likesCount: number;
	isLikedByAuthenticatedUser: boolean;
}

export default function Post() {
	const params = useParams();
	const id = params.id;

	const [post, setPost] = useState<PostSummaryResponse | null>(null);
	const [authorDetails, setAuthorDetails] = useState<UserDataResponse | null>(
		null,
	);
	const [petNameToIdMap, setPetNameToIdMap] = useState<
		Record<string, number>
	>({});
	const [likeData, setLikeData] = useState<PostLikeSummaryResponse | null>(
		null,
	);
	const [comments, setComments] = useState<PostCommentSummaryResponse[]>([]);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [newComment, setNewComment] = useState('');
	const [submittingComment, setSubmittingComment] = useState(false);

	useEffect(() => {
		if (!id) {
			setError('Post id is missing.');
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		setError(null);

		Promise.all([
			apiRequestJson<PostSummaryResponse>(`/posts/${id}`),
			apiRequestJson<PostLikeSummaryResponse>(`/posts/${id}/like`),
			apiRequestJson<PostCommentSummaryResponse[]>(
				`/posts/${id}/comment`,
			),
		])
			.then(async ([postData, likesData, commentsData]) => {
				setPost(postData);
				setLikeData(likesData);
				setComments(commentsData);

				if (postData.creatorName) {
					try {
						const userData = await apiRequestJson<UserDataResponse>(
							`/users/${postData.creatorName}?username=${postData.creatorName}`,
						);
						setAuthorDetails(userData);

						const profileData =
							await apiRequestJson<UserProfileResponse>(
								`/users/${userData.id}/profile`,
							);

						const mappedPets: Record<string, number> = {};
						profileData.pets?.forEach((pet) => {
							mappedPets[pet.name] = pet.id;
						});
						setPetNameToIdMap(mappedPets);
					} catch (e) {
						console.error(
							'Failed to fetch author or pet details:',
							e,
						);
					}
				}
			})
			.catch((err) => {
				console.error('Error fetching post ecosystem data:', err);
				setError(
					'Failed to load post details. Please try again later.',
				);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id]);

	const handleLikeToggle = async () => {
		if (!id || !likeData) return;

		const previouslyLiked = likeData.isLikedByAuthenticatedUser;
		const previousCount = Number(likeData.likesCount || 0);

		setLikeData({
			id: Number(id),
			likesCount: previousCount + (previouslyLiked ? -1 : 1),
			isLikedByAuthenticatedUser: !previouslyLiked,
		});

		try {
			const freshLikeData = await apiRequestJson<PostLikeSummaryResponse>(
				`/posts/${id}/like`,
				'POST',
			);
			setLikeData(freshLikeData);
		} catch (err) {
			console.error('Failed to toggle like state:', err);
			setLikeData({
				id: Number(id),
				likesCount: previousCount,
				isLikedByAuthenticatedUser: previouslyLiked,
			});
		}
	};

	const handleCommentSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newComment.trim() || !id) return;

		setSubmittingComment(true);
		try {
			const freshComment =
				await apiRequestJson<PostCommentSummaryResponse>(
					`/posts/${id}/comment`,
					'POST',
					{
						jsonBody: { text: newComment.trim() },
					},
				);
			setComments((prev) => [...prev, freshComment]);
			setNewComment('');
		} catch (err) {
			console.error('Error adding comment:', err);
		} finally {
			setSubmittingComment(false);
		}
	};

	if (isLoading) {
		return (
			<div className='flex min-h-[400px] items-center justify-center text-sm font-medium text-[#5D605C]'>
				Loading post data...
			</div>
		);
	}

	if (error || !post) {
		return (
			<div className='mx-auto max-w-2xl mt-10 rounded-[20px] bg-red-50 p-6 text-sm font-semibold text-red-700 shadow-sm'>
				{error || 'Post not found.'}
			</div>
		);
	}

	const isLikedByMe = likeData ? likeData.isLikedByAuthenticatedUser : false;

	const authorUsername =
		authorDetails?.username || post.creatorName || 'user';
	const authorDisplayName = authorDetails
		? `${authorDetails.firstName || ''} ${authorDetails.lastName || ''}`.trim() ||
			`@${authorUsername}`
		: `@${authorUsername}`;
	const authorId = authorDetails?.id || null;

	return (
		<LoggedContainer activeItem='feed'>
			<div className='mx-auto max-w-3xl px-4 pb-8 lg:px-0 animate-fadeIn'>
				<article className='overflow-hidden rounded-[24px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.06)] border border-[#F4F4F0]'>
					<div className='flex items-center justify-between border-b border-[#F4F4F0] p-5'>
						<Link
							to={
								authorId
									? `/users/profile/${authorId}`
									: '/users/profile'
							}
							className='flex items-center gap-3 group'
						>
							<div className='h-11 w-11 overflow-hidden rounded-full bg-[#E7E9E4] flex items-center justify-center font-bold text-[#7D5739] text-sm uppercase'>
								{authorUsername.charAt(0)}
							</div>
							<div>
								<h3 className='text-sm font-bold text-[#303330] group-hover:text-[#7D5739] transition-colors'>
									{authorDisplayName}
								</h3>
								<p className='text-xs font-medium text-[#5D605C]'>
									@{authorUsername}{' '}
									{authorDetails?.verified && '✓'}
								</p>
							</div>
						</Link>

						<span className='text-xs font-medium text-[#5D605C]/70 select-none self-start pt-1'>
							{formatCreationDate(post.createdAt)}
						</span>
					</div>

					{post.postPictureUrl && (
						<div className='bg-[#E7E9E4] max-h-[520px] w-full overflow-hidden flex items-center justify-center border-b border-[#F4F4F0]'>
							<SecureImage
								src={post.postPictureUrl}
								alt={post.text ?? 'Memory Image'}
								className='w-full object-contain max-h-[520px]'
							/>
						</div>
					)}

					<div className='p-6 space-y-6'>
						<p className='text-base text-[#303330] leading-relaxed whitespace-pre-wrap font-medium'>
							{post.text || 'Untitled Memory'}
						</p>

						{post.pets && post.pets.length > 0 && (
							<div className='flex flex-wrap items-center gap-2 py-2'>
								<span className='text-[11px] font-bold text-[#5D605C] uppercase tracking-wider mr-1'>
									In this memory:
								</span>
								{post.pets.map((petName, idx) => {
									const petId = petNameToIdMap[petName];
									const targetLink = petId
										? `/pets/profile/${petId}`
										: authorId
											? `/users/profile/${authorId}`
											: '/users/profile';

									return (
										<Link
											key={idx}
											to={targetLink}
											className='inline-flex items-center gap-1.5 rounded-full bg-[#FECAA5]/20 border border-[#FECAA5]/40 px-3.5 py-1.5 text-xs font-bold text-[#7D5739] hover:bg-[#FECAA5]/40 hover:text-[#644126] transition-colors'
										>
											🐾 {petName}
										</Link>
									);
								})}
							</div>
						)}

						<div className='flex items-center gap-6 pt-2 border-t border-[#F4F4F0]'>
							<button
								type='button'
								onClick={handleLikeToggle}
								className={`flex items-center gap-2 rounded-full mt-2 px-5 py-2.5 text-sm font-bold transition-all transform active:scale-95 ${
									isLikedByMe
										? 'bg-[#FECAA5] text-[#644126] shadow-sm'
										: 'bg-[#FAF9F6] text-[#5D605C] hover:bg-[#E7E9E4]'
								}`}
							>
								<svg
									className={`h-5 w-5 transition-colors ${isLikedByMe ? 'fill-current' : 'stroke-current fill-none'}`}
									viewBox='0 0 24 24'
									strokeWidth='2'
								>
									<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
								</svg>
								<span>
									{likeData?.likesCount ?? 0}{' '}
									{likeData?.likesCount === 1
										? 'Like'
										: 'Likes'}
								</span>
							</button>
						</div>

						<div className='border-t border-[#F4F4F0] pt-6 space-y-4'>
							<h4 className='text-sm font-bold text-[#303330] tracking-wide'>
								Comments ({comments.length})
							</h4>

							<div className='space-y-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar'>
								{comments.length === 0 ? (
									<p className='text-sm italic text-[#5D605C] py-2'>
										No comments yet. Be the first to share
										your thoughts!
									</p>
								) : (
									comments.map((comment) => (
										<div
											key={comment.id}
											className='rounded-[14px] bg-[#FAF9F6] p-4 text-sm border border-[#F4F4F0] hover:border-[#D5D7D3] transition-colors'
										>
											<div className='flex items-center justify-between mb-1.5'>
												<span className='font-bold text-[#7D5739]'>
													{comment.creatorUsername}
												</span>
											</div>
											<p className='text-[#303330] leading-normal font-medium whitespace-pre-wrap'>
												{comment.text}
											</p>
										</div>
									))
								)}
							</div>

							<form
								onSubmit={handleCommentSubmit}
								className='mt-4 flex gap-2 pt-2'
							>
								<input
									type='text'
									value={newComment}
									onChange={(e) =>
										setNewComment(e.target.value)
									}
									placeholder='Write a nice comment...'
									maxLength={500}
									disabled={submittingComment}
									className='flex-1 rounded-full border border-[#D5D7D3] bg-white px-4 py-2.5 text-sm text-[#303330] placeholder-[#5D605C]/60 focus:border-[#7D5739] focus:outline-none focus:ring-1 focus:ring-[#7D5739] disabled:bg-gray-50'
								/>
								<button
									type='submit'
									disabled={
										submittingComment || !newComment.trim()
									}
									className='rounded-full bg-[#7D5739] px-6 py-2.5 text-sm font-bold text-[#FFF7F4] transition-colors hover:bg-[#644126] disabled:opacity-40'
								>
									{submittingComment ? 'Sending...' : 'Post'}
								</button>
							</form>
						</div>
					</div>
				</article>
			</div>
		</LoggedContainer>
	);
}
