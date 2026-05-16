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
			className='overflow-hidden rounded-[15px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.06)]'
		>
			<div className='aspect-[4/3] bg-[#E7E9E4]'>
				{data.postPictureUrl && (
					<SecureImage
						src={data.postPictureUrl}
						alt={data.text ?? 'Memory'}
						className='h-full w-full object-cover'
					/>
				)}
			</div>
			{/* <div className='p-4'>
				<h3 className='text-sm font-semibold text-[#303330]'>
					{data.text ?? 'Memory'}
				</h3>
			</div> */}
		</Link>
	);
}
