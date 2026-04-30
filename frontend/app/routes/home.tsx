import type { Route } from './+types/home';
import { Welcome } from '../components/welcome';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Petgram | Społeczność dla miłośników zwierząt' },
		{
			name: 'description',
			content:
				'Petgram to platforma społecznościowa dla opiekunów i miłośników zwierząt z feedem, profilami pupili i wyszukiwaniem treści.',
		},
	];
}

export default function Home() {
	return <Welcome />;
}
