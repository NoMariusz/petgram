import { Link } from 'react-router';
import type { PostListItem } from '~/data/types';
import SecureImage from './SecureImage';

export default function PostVerticalListItem({
	id,
	data,
}: {
	id: number;
	data: PostListItem;
}) {
	return (
		<Link
			to={`/posts/${data.id}`}
			className='flex flex-col sm:flex-row overflow-hidden rounded-[15px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.06)] hover:shadow-[0_16px_36px_rgba(48,51,48,0.1)] transition-all duration-200'
		>
			{data.postPictureUrl ? (
				<div className='w-full sm:w-[200px] h-[160px] sm:h-auto bg-[#E7E9E4] flex-shrink-0'>
					<SecureImage
						src={data.postPictureUrl}
						alt={data.text ?? 'Memory'}
						className='h-full w-full object-cover'
					/>
				</div>
			) : null}

			<div className='flex flex-col justify-between p-5 flex-grow gap-4'>
				<div className='space-y-2'>
					<p className='text-base font-medium text-[#303330] leading-relaxed whitespace-pre-wrap line-clamp-3 sm:line-clamp-4'>
						{data.text ?? 'Untitled Memory'}
					</p>
				</div>

				<div className='flex items-center justify-between border-t border-[#F4F4F0] pt-3 text-xs font-semibold text-[#5D605C]'>
					<span className='text-[#7D5739] flex items-center gap-1 group-hover:underline'>
						View memory
						<svg
							className='w-3 h-3 transition-transform group-hover:translate-x-0.5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M9 5l7 7-7 7' />
						</svg>
					</span>
				</div>
			</div>
		</Link>
	);
}
