import { useLocation } from 'react-router';

export default function RegisterEmailSend() {
	const location = useLocation();
	const email = (location.state as { email?: string })?.email;

	return (
		<p>
			Please check your email at {email || 'your email address'} to
			activate your account.
		</p>
	);
}
