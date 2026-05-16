import { useState } from 'react';
import { Link } from 'react-router';

function GridIcon() {
	return (
		<svg
			width='15'
			height='15'
			viewBox='0 0 15 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
			className='h-4 w-4'
		>
			<path
				d='M0 6.66667V0H6.66667V6.66667H0ZM0 15V8.33333H6.66667V15H0ZM8.33333 6.66667V0H15V6.66667H8.33333ZM8.33333 15V8.33333H15V15H8.33333Z'
				fill='currentColor'
			/>
			<path
				d='M0 6.66667V0H6.66667V6.66667H0ZM0 15V8.33333H6.66667V15H0ZM8.33333 6.66667V0H15V6.66667H8.33333ZM8.33333 15V8.33333H15V15H8.33333Z'
				fill='currentColor'
				fillOpacity='0.2'
			/>
		</svg>
	);
}

function ListIcon() {
	return (
		<svg
			width='17'
			height='17'
			viewBox='0 0 17 17'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
			className='h-4 w-4'
		>
			<path
				d='M7.91667 10.4167L13.75 6.66667L7.91667 2.91667V10.4167ZM5 13.3333C4.54167 13.3333 4.14931 13.1701 3.82292 12.8438C3.49653 12.5174 3.33333 12.125 3.33333 11.6667V1.66667C3.33333 1.20833 3.49653 0.815972 3.82292 0.489583C4.14931 0.163194 4.54167 0 5 0H15C15.4583 0 15.8507 0.163194 16.1771 0.489583C16.5035 0.815972 16.6667 1.20833 16.6667 1.66667V11.6667C16.6667 12.125 16.5035 12.5174 16.1771 12.8438C15.8507 13.1701 15.4583 13.3333 15 13.3333H5ZM5 11.6667H15V1.66667H5V11.6667ZM1.66667 16.6667C1.20833 16.6667 0.815972 16.5035 0.489583 16.1771C0.163194 15.8507 0 15.4583 0 15V3.33333H1.66667V15H13.3333V16.6667H1.66667ZM5 1.66667V11.6667V1.66667Z'
				fill='currentColor'
			/>
			<path
				d='M7.91667 10.4167L13.75 6.66667L7.91667 2.91667V10.4167ZM5 13.3333C4.54167 13.3333 4.14931 13.1701 3.82292 12.8438C3.49653 12.5174 3.33333 12.125 3.33333 11.6667V1.66667C3.33333 1.20833 3.49653 0.815972 3.82292 0.489583C4.14931 0.163194 4.54167 0 5 0H15C15.4583 0 15.8507 0.163194 16.1771 0.489583C16.5035 0.815972 16.6667 1.20833 16.6667 1.66667V11.6667C16.6667 12.125 16.5035 12.5174 16.1771 12.8438C15.8507 13.1701 15.4583 13.3333 15 13.3333H5ZM5 11.6667H15V1.66667H5V11.6667ZM1.66667 16.6667C1.20833 16.6667 0.815972 16.5035 0.489583 16.1771C0.163194 15.8507 0 15.4583 0 15V3.33333H1.66667V15H13.3333V16.6667H1.66667ZM5 1.66667V11.6667V1.66667Z'
				fill='currentColor'
				fillOpacity='0.2'
			/>
		</svg>
	);
}

export interface MemoryGalleryItem {
	id: number;
	imageUrl?: string | null;
	title?: string;
	excerpt?: string;
	likesCount?: number;
}

interface MemoryGalleryProps {
	relatedObjectType: 'user' | 'pet';
	id: number;
}

export default function MemoryGallery({
	relatedObjectType,
	id,
}: MemoryGalleryProps) {
	const [view, setView] = useState<'grid' | 'list'>('list');

	const [items, setItems] = useState<MemoryGalleryItem[]>([]);

	return (
		<section className='mt-10'>
			<div className='flex items-center justify-between'>
				<h2 className='text-[20px] font-bold text-[#303330]'>
					Memory Gallery
				</h2>
				<div className='flex items-center gap-2'>
					<button
						type='button'
						onClick={() => setView('grid')}
						className={`h-10 w-10 rounded-full flex items-center justify-center ${
							view === 'grid'
								? 'bg-[#FECAA5] text-[#644126]'
								: 'text-[#5D605C]'
						}`}
						aria-label='Grid view'
					>
						<GridIcon />
					</button>
					<button
						type='button'
						onClick={() => setView('list')}
						className={`h-10 w-10 rounded-full flex items-center justify-center ${
							view === 'list'
								? 'bg-[#FECAA5] text-[#644126]'
								: 'text-[#5D605C]'
						}`}
						aria-label='List view'
					>
						<ListIcon />
					</button>
				</div>
			</div>

			<div className='mt-4'>
				{items.length === 0 ? (
					<div className='rounded-[20px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.06)] p-6 text-sm text-[#5D605C]'>
						No memories yet for {relatedObjectType} #{id}.
					</div>
				) : view === 'grid' ? (
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
						{items.map((item) => (
							<Link
								key={item.id}
								to={`/posts/${item.id}`}
								className='overflow-hidden rounded-[15px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.06)]'
							>
								<div className='aspect-[4/3] bg-[#E7E9E4]'>
									{item.imageUrl && (
										<img
											src={item.imageUrl}
											alt={item.title ?? 'Memory'}
											className='h-full w-full object-cover'
										/>
									)}
								</div>
								<div className='p-4'>
									<h3 className='text-sm font-semibold text-[#303330]'>
										{item.title ?? 'Memory'}
									</h3>
								</div>
							</Link>
						))}
					</div>
				) : (
					<div className='space-y-6'>
						{items.map((item) => (
							<Link
								key={item.id}
								to={`/posts/${item.id}`}
								className='block overflow-hidden rounded-[15px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.06)]'
							>
								<div className='p-6'>
									<h3 className='text-base font-semibold text-[#303330]'>
										{item.title ?? 'Memory'}
									</h3>
									<p className='mt-2 text-sm text-[#5D605C]'>
										{item.excerpt ??
											'A beautiful moment worth sharing.'}
									</p>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
