import { useParams } from 'react-router';

export default function Post() {
	const params = useParams();
	const id = params.id;

	return <p>Post {id}</p>;
}
