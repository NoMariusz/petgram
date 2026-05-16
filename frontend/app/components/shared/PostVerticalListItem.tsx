import type { PostListItem } from '~/data/types';

export default function PostVerticalListItem({
	id,
	data,
}: {
	id: number;
	data: PostListItem;
}) {
	return (
		<p>
			Vertical List Post {data.text} Item {id}
		</p>
	);
}
