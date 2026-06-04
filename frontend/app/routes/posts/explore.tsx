import { useState, FormEvent } from 'react';
import LoggedContainer from '~/components/shared/LoggedContainer';
import { apiRequest } from '~/data/api';
import type { PostListItem } from '~/data/types';
import PostVerticalListItem from '~/components/shared/PostVerticalListItem';

type SearchEntityType = 'posts' | 'users' | 'pets';

interface PostSearchRequest {
	query: string;
}

interface WithAdvancedFiltersPostSearchRequest extends PostSearchRequest {
	authorHandle: string | null;
	taggedPet: string | null;
	creationDate: string | null;
}

interface PostFeedResponse {
	posts: PostListItem[];
	nextCursor: number | null;
}

export default function Explore() {
	const [searchType, setSearchType] = useState<SearchEntityType>('posts');

	const [query, setQuery] = useState('');
	const [showAdvanced, setShowAdvanced] = useState(false);

	const [authorHandle, setAuthorHandle] = useState('');
	const [petName, setPetName] = useState('');
	const [postDate, setPostDate] = useState('');

	const [results, setResults] = useState<PostListItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);
	const [hasSearched, setHasSearched] = useState(false);

	const handleSearch = async (e: FormEvent) => {
		e.preventDefault();

		if (!query.trim()) {
			setErrors(['A search keyword or description is required.']);
			return;
		}

		setIsLoading(true);
		setErrors([]);
		setHasSearched(true);

		try {
			let endpoint = '/posts/search';
			let jsonBody: PostSearchRequest | WithAdvancedFiltersPostSearchRequest = {
				query: query.trim()
			};

			if (showAdvanced && (authorHandle.trim() || petName.trim() || postDate)) {
				endpoint = '/posts/search/advanced';
				jsonBody = {
					query: query.trim(),
					authorHandle: authorHandle.trim() || null,
					taggedPet: petName.trim() || null,
					creationDate: postDate || null
				};
			}

			const response = await apiRequest(endpoint, 'POST', { jsonBody });

			if (!response.ok) {
				let parsedErrors: string[] = [];
				try {
					const textData = await response.text();
					try {
						const errorData = JSON.parse(textData);
						if (errorData && Array.isArray(errorData.errors)) {
							errorData.errors.forEach((err: any) => {
								const msg = err.defaultMessage || err.message;
								if (msg) parsedErrors.push(msg);
							});
						} else if (errorData && errorData.message) {
							parsedErrors.push(errorData.message);
						} else if (errorData && errorData.detail) {
							parsedErrors.push(errorData.detail);
						} else if (textData) {
							parsedErrors.push(textData);
						}
					} catch (_) {
						if (textData) {
							parsedErrors.push(textData);
						}
					}
				} catch (_) {}

				if (parsedErrors.length === 0) {
					parsedErrors = [`Server communication error occurred (Status code: ${response.status})`];
				}
				throw parsedErrors;
			}

			const data = (await response.json()) as PostFeedResponse;
			setResults(data.posts || []);
		} catch (err: any) {
			console.error(err);
			if (Array.isArray(err)) {
				setErrors(err);
			} else {
				setErrors([err.message || 'Something went wrong with the search. Please try adjusting your parameters.']);
			}
			setResults([]);
		} finally {
			setIsLoading(false);
		}
	};

	const clearFilters = () => {
		setQuery('');
		setAuthorHandle('');
		setPetName('');
		setPostDate('');
		setResults([]);
		setHasSearched(false);
		setErrors([]);
	};

	return (
		<LoggedContainer activeItem='explore'>
			<div className='space-y-8 animate-fadeIn pt-4 max-w-2xl mx-auto'>

				<section className='rounded-[24px] bg-[#FFFEFB] p-6 shadow-[0_12px_32px_rgba(48,51,48,0.06)] border border-[#F4F4F0] md:p-8'>
					<h1 className='text-[22px] font-bold text-[#303330] mb-4'>Explore Petgram</h1>

					<div className='flex gap-2 border-b border-[#F4F4F0] pb-4 mb-6'>
						<button
							type='button'
							onClick={() => setSearchType('posts')}
							className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
								searchType === 'posts'
									? 'bg-[#FECAA5] text-[#644126]'
									: 'text-[#5D605C] hover:bg-[#FAF9F6]'
							}`}
						>
							Memories
						</button>
						<button
							type='button'
							onClick={() => setSearchType('users')}
							className='px-4 py-2 text-sm font-bold rounded-lg transition-colors relative text-[#5D605C]/50 cursor-not-allowed'
							disabled
						>
							Owners <span className='text-[9px] absolute -top-1 -right-2 bg-[#7D5739] text-white px-1 rounded-full scale-75 font-normal'>Soon</span>
						</button>
						<button
							type='button'
							onClick={() => setSearchType('pets')}
							className='px-4 py-2 text-sm font-bold rounded-lg transition-colors relative text-[#5D605C]/50 cursor-not-allowed'
							disabled
						>
							Pets <span className='text-[9px] absolute -top-1 -right-2 bg-[#7D5739] text-white px-1 rounded-full scale-75 font-normal'>Soon</span>
						</button>
					</div>

					<form onSubmit={handleSearch} className='space-y-4'>
						<div className='flex flex-col sm:flex-row gap-2'>
							<div className='relative flex-1'>
								<input
									type='text'
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder={searchType === 'posts' ? 'Search memories by keywords...' : 'Search...'}
									className='w-full rounded-full border border-[#D5D7D3] bg-white pl-5 pr-12 py-3 text-sm text-[#303330] placeholder-[#5D605C]/60 focus:border-[#7D5739] focus:outline-none focus:ring-1 focus:ring-[#7D5739]'
								/>
								{(query || authorHandle || petName || postDate) && (
									<button
										type='button'
										onClick={clearFilters}
										className='absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#5D605C] hover:text-[#303330]'
									>
										Clear All
									</button>
								)}
							</div>

							<div className='flex gap-2 justify-end'>
								<button
									type='button'
									onClick={() => setShowAdvanced(!showAdvanced)}
									className={`rounded-full border border-[#D5D7D3] px-5 py-3 text-xs font-bold transition-colors ${
										showAdvanced ? 'bg-[#7D5739] text-white border-[#7D5739]' : 'bg-[#FAF9F6] text-[#303330] hover:bg-[#E7E9E4]'
									}`}
								>
									{showAdvanced ? 'Hide Criteria' : 'Advanced Filters'}
								</button>
								<button
									type='submit'
									disabled={isLoading}
									className='rounded-full bg-[#7D5739] px-7 py-3 text-sm font-bold text-[#FFF7F4] transition-colors hover:bg-[#644126] disabled:opacity-50'
								>
									{isLoading ? 'Searching...' : 'Search'}
								</button>
							</div>
						</div>

						{showAdvanced && (
							<div className='p-5 rounded-[16px] bg-[#FAF9F6] border border-[#F4F4F0] grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn'>
								<div className='space-y-1.5'>
									<label className='text-xs font-bold text-[#5D605C] uppercase tracking-wider'>Author Handle</label>
									<input
										type='text'
										value={authorHandle}
										onChange={(e) => setAuthorHandle(e.target.value)}
										placeholder='e.g. john_doe'
										className='w-full rounded-xl border border-[#D5D7D3] bg-white px-4 py-2.5 text-xs text-[#303330] focus:border-[#7D5739] focus:outline-none'
									/>
								</div>

								<div className='space-y-1.5'>
									<label className='text-xs font-bold text-[#5D605C] uppercase tracking-wider'>Tagged Pet Name</label>
									<input
										type='text'
										value={petName}
										onChange={(e) => setPetName(e.target.value)}
										placeholder='e.g. Fluffy'
										className='w-full rounded-xl border border-[#D5D7D3] bg-white px-4 py-2.5 text-xs text-[#303330] focus:border-[#7D5739] focus:outline-none'
									/>
								</div>

								<div className='space-y-1.5'>
									<label className='text-xs font-bold text-[#5D605C] uppercase tracking-wider'>Creation Date</label>
									<input
										type='date'
										value={postDate}
										onChange={(e) => setPostDate(e.target.value)}
										className='w-full rounded-xl border border-[#D5D7D3] bg-white px-4 py-2.5 text-xs text-[#303330] focus:border-[#7D5739] focus:outline-none'
									/>
								</div>
							</div>
						)}
					</form>
				</section>

				<section className='flex flex-col gap-6 w-full'>
					{errors.length > 0 && (
						<div className='rounded-[20px] bg-red-50 p-5 text-sm text-red-800 shadow-sm border border-red-200 animate-fadeIn'>
							<div className='font-bold mb-1.5 flex items-center gap-1.5 text-red-900'>
								⚠️ Search parameters did not pass validation:
							</div>
							<ul className='list-disc list-inside space-y-1 font-medium pl-1'>
								{errors.map((err, idx) => (
									<li key={idx} className='text-red-700 text-xs md:text-sm'>{err}</li>
								))}
							</ul>
						</div>
					)}

					{isLoading ? (
						<div className='space-y-6'>
							{[1, 2].map((i) => (
								<div key={i} className='h-[420px] w-full rounded-[24px] bg-[#E7E9E4] animate-pulse' />
							))}
						</div>
					) : results.length > 0 ? (
						results.map((item) => (
							<PostVerticalListItem
								key={item.id}
								id={item.id}
								data={item}
							/>
						))
					) : (
						errors.length === 0 && (
							hasSearched ? (
								<div className='flex flex-col items-center justify-center rounded-[24px] bg-[#FFFEFB] p-12 shadow-[0_12px_32px_rgba(48,51,48,0.06)] border border-[#F4F4F0] text-center'>
									<div className='h-14 w-14 mb-3 flex items-center justify-center rounded-full bg-[#FAF9F6] text-xl'>🔍</div>
									<h3 className='text-base font-bold text-[#303330]'>No matching memories found</h3>
									<p className='mt-1 text-xs font-medium text-[#5D605C] max-w-xs leading-relaxed'>
										Try expanding your search query terms or clearing the advanced filter entries.
									</p>
								</div>
							) : (
								<div className='text-center py-12 text-sm font-semibold text-[#5D605C] tracking-wide uppercase opacity-60'>
									Type a keyword description above to find memories 🐾
								</div>
							)
						)
					)}
				</section>
			</div>
		</LoggedContainer>
	);
}