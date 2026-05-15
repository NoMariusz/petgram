import { useParams } from 'react-router';

export default function UserProfile() {
	const params = useParams();
	const id = params.id;
	return <p>{id ? `User ${id} Profile` : 'My User Profile'}</p>;
}
