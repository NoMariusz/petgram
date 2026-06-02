import { useParams } from 'react-router';
import { apiRequest } from '~/data/api';
import type { PostListItem } from "~/data/types"

export default function Post() {
	const params = useParams();
	const id = params.id;

    const [post, setPost] =
        useState<PostListItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowLoading, setIsFollowLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) {
			setError('Post id is missing.');
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		setError(null);
		apiRequest(`/posts/${id}`)
			.then(async (response) => {
				if (!response.ok) {
					throw new Error(`Request failed (${response.status})`);
				}
				const data = (await response.json()) as PostListItem;
				setPetProfile(data);
			})
			.catch((error) => {
				console.error('Error fetching post:', error);
				setError('Failed to load post. Please try again later.');
				setPetProfile(null);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id]);


	return <p>Post {id}</p>;
}
