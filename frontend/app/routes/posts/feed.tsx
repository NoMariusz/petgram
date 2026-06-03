import { useState, useEffect, useCallback } from 'react';
import LoggedContainer from '~/components/shared/LoggedContainer';
import { apiRequest } from '~/data/api';
import type { PostListItem } from '~/data/types';
import PostInstagramItem from '~/components/shared/PostInstagramItem';

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
			console.error('Error loading feed stream:', err);
			setError('We could not load your feed right now. Please check back soon.');
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
			<div className='max-w-[480px] mx-auto space-y-6 pt-4 animate-fadeIn'>

				<header className='rounded-[24px] bg-[#FFFEFB] p-5 shadow-[0_8px_24px_rgba(48,51,48,0.04)] border border-[#F4F4F0] text-center'>
					<h1 className='text-lg font-black text-[#303330] tracking-tight flex items-center justify-center gap-1.5'>
						<span>🐾</span> Petgram Feed
					</h1>
				</header>

				<main className='pb-12'>
					{isLoadingInitial ? (
						[1, 2].map((sk) => (
							<div key={sk} className='w-full rounded-[24px] bg-[#FFFEFB] border border-[#F4F4F0] p-4 mb-8 space-y-4 animate-pulse'>
								<div className='flex items-center gap-3'>
									<div className='h-9 w-9 bg-[#E7E9E4] rounded-full' />
									<div className='space-y-2 flex-1'>
										<div className='h-3 bg-[#E7E9E4] rounded w-1/3' />
										<div className='h-2.5 bg-[#E7E9E4] rounded w-1/4' />
									</div>
								</div>
								<div className='w-full aspect-square bg-[#E7E9E4] rounded-xl' />
							</div>
						))
					) : error ? (
						<div className='rounded-[20px] bg-red-50 p-5 text-xs font-bold text-red-700 border border-red-200 text-center'>
							{error}
						</div>
					) : posts.length === 0 ? (
						<div className='flex flex-col items-center justify-center rounded-[24px] bg-[#FFFEFB] p-10 border border-[#F4F4F0] text-center shadow-[0_8px_24px_rgba(48,51,48,0.04)]'>
							<div className='text-3xl mb-3'>🏡</div>
							<h3 className='text-sm font-bold text-[#303330]'>Welcome to your Feed!</h3>
							<p className='mt-1 text-xs font-medium text-[#5D605C] max-w-xs leading-relaxed'>
								Follow other pets or owners to view their timeline memories right here.
							</p>
						</div>
					) : (
						<div>
							{posts.map((post) => (
								<PostInstagramItem
									key={post.id}
									id={post.id}
									data={post}
								/>
							))}

							{nextCursor !== null && (
								<div className="flex justify-center pt-2">
									<button
										type="button"
										onClick={() => fetchFeed(nextCursor)}
										disabled={isFetchingMore}
										className="rounded-full bg-[#FFFEFB] border border-[#D5D7D3] px-6 py-2.5 text-xs font-bold text-[#303330] shadow-sm transition-all hover:bg-[#FAF9F6] disabled:opacity-50"
									>
										{isFetchingMore ? 'Loading older moments...' : 'View older memories'}
									</button>
								</div>
							)}

							{nextCursor === null && posts.length > 0 && (
								<div className="text-center pt-4 text-xs font-bold text-[#5D605C]/60 tracking-wider uppercase">
									🏁 You've caught up on everything!
								</div>
							)}
						</div>
					)}
				</main>
			</div>
		</LoggedContainer>
	);
}