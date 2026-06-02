import { useState, useEffect, useCallback } from 'react';
import LoggedContainer from '~/components/shared/LoggedContainer';
import { apiRequest } from '~/data/api';
import type { PostListItem } from '~/data/types';
import PostVerticalListItem from '~/components/shared/PostVerticalListItem';

interface FeedResponseData {
	posts: PostListItem[];
	nextCursor: number | null;
}

export default function Feed() {
	const [posts, setPosts] = useState<PostListItem[]>([]);
	const [nextCursor, setNextCursor] = useState<number | null>(null);

	const [isLoadingInitial, setIsLoadingInitial] = useState(true);
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchFeed = useCallback(async (cursor?: number | null) => {
		setError(null);
		const isInitialLoad = !cursor;

		if (isInitialLoad) setIsLoadingInitial(true);
		else setIsFetchingMore(true);

		try {
			let url = '/posts/feed?limit=10';
			if (cursor) {
				url += `&cursor=${cursor}`;
			}

			const response = await apiRequest(url, 'GET');

			if (!response.ok) {
				throw new Error(`Failed to fetch feed: ${response.status}`);
			}

			const data = (await response.json()) as FeedResponseData;

			if (isInitialLoad) {
				setPosts(data.posts);
			} else {
				setPosts((prev) => [...prev, ...data.posts]);
			}

			setNextCursor(data.nextCursor);
		} catch (err) {
			console.error('Error fetching feed:', err);
			setError('We could not load your feed right now. Please try again later.');
		} finally {
			setIsLoadingInitial(false);
			setIsFetchingMore(false);
		}
	}, []);

	useEffect(() => {
		fetchFeed(null);
	}, [fetchFeed]);

	return (
		<LoggedContainer activeItem='feed'>
			<div className='space-y-8 animate-fadeIn pt-4'>

				<section className='rounded-[24px] bg-[#FFFEFB] p-8 shadow-[0_12px_32px_rgba(48,51,48,0.06)] border border-[#F4F4F0] md:p-10'>
					<h1 className='text-[22px] font-bold text-[#303330]'>Your Feed</h1>
					<p className='mt-2 max-w-2xl text-[15px] font-medium leading-6 text-[#5D605C]'>
						Catch up with the latest memories from the pets and owners you follow.
					</p>
				</section>

				<section>
					{isLoadingInitial ? (
						<div className='flex flex-col gap-6'>
							{[1, 2, 3].map((skeleton) => (
								<div
									key={skeleton}
									className='flex flex-col sm:flex-row overflow-hidden rounded-[15px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.06)] border border-[#F4F4F0] animate-pulse'
								>
									<div className='w-full sm:w-[200px] h-[160px] sm:h-auto bg-[#E7E9E4] flex-shrink-0' />
									<div className='p-5 flex-grow flex flex-col justify-between gap-4'>
										<div className='space-y-3 pt-2'>
											<div className='h-3.5 bg-[#E7E9E4] rounded-full w-3/4' />
											<div className='h-3.5 bg-[#E7E9E4] rounded-full w-1/2' />
										</div>
									</div>
								</div>
							))}
						</div>
					) : error ? (
						<div className='rounded-[20px] bg-red-50 p-6 text-sm font-semibold text-red-700 shadow-sm text-center'>
							{error}
						</div>
					) : posts.length === 0 ? (
						<div className='flex flex-col items-center justify-center rounded-[24px] bg-[#FFFEFB] p-12 shadow-[0_12px_32px_rgba(48,51,48,0.06)] border border-[#F4F4F0] text-center'>
							<div className='h-16 w-16 mb-4 flex items-center justify-center rounded-full bg-[#F4F4F0] text-3xl shadow-inner'>🐾</div>
							<h3 className='text-lg font-bold text-[#303330]'>It's quiet here...</h3>
							<p className='mt-2 text-sm font-medium text-[#5D605C] max-w-sm leading-relaxed'>
								You aren't following anyone yet, or they haven't posted any memories.
							</p>
						</div>
					) : (
						<div className='flex flex-col gap-6'>
							{posts.map((post) => (
								<PostVerticalListItem
									key={post.id}
									id={post.id}
									data={post}
								/>
							))}

							{nextCursor !== null && (
								<div className="flex justify-center pt-4 pb-8">
									<button
										type="button"
										onClick={() => fetchFeed(nextCursor)}
										disabled={isFetchingMore}
										className="rounded-full bg-[#FAF9F6] border border-[#D5D7D3] px-8 py-3 text-sm font-bold text-[#303330] transition-colors hover:bg-[#E7E9E4] disabled:opacity-50"
									>
										{isFetchingMore ? 'Loading more...' : 'Load older memories'}
									</button>
								</div>
							)}

							{nextCursor === null && posts.length > 0 && (
								<div className="text-center pt-6 pb-8 text-sm font-medium text-[#5D605C]">
									You've caught up on all memories! 🐾
								</div>
							)}
						</div>
					)}
				</section>
			</div>
		</LoggedContainer>
	);
}