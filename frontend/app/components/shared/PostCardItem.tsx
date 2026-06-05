import { Link } from 'react-router';
import type { PostListItem } from '~/data/types';
import SecureImage from './SecureImage';

export default function PostCardItem({
	id,
	data,
}: {
	id: number;
	data: PostListItem;
}) {
	return (
		<Link
			key={data.id}
			to={`/posts/${data.id}`}
			className='overflow-hidden rounded-[15px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.06)] transition-all duration-200 hover:shadow-[0_16px_36px_rgba(48,51,48,0.1)]'
		>
			<div className='aspect-[4/3] bg-[#E7E9E4]'>
				{data.postPictureUrl ? (
					<SecureImage
						src={data.postPictureUrl}
						alt={data.text ?? 'Memory'}
						className='h-full w-full object-cover'
					/>
				) : (
					<div className='flex h-full w-full flex-col justify-between bg-[#FFFEFB] p-6'>
						<p className='line-clamp-4 text-base font-medium leading-7 text-[#303330]'>
							{data.text || 'Untitled memory'}
						</p>
						<div className='flex items-center justify-between border-t border-[#F4F4F0] pt-3 text-xs font-semibold text-[#5D605C]'>
							<span className='flex items-center gap-1 text-[#7D5739]'>
								View memory
								<svg
									className='h-3 w-3 transition-transform'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2.5'
										d='M9 5l7 7-7 7'
									/>
								</svg>
							</span>
						</div>
					</div>
				)}
			</div>
		</Link>
	);
}
