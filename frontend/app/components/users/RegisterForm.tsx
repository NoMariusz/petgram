import { useState } from 'react';
import { useNavigate } from 'react-router';
import FormField from './FormField';
import FormTextarea from './FormTextarea';

interface FormData {
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	bio: string;
	profilePictureUrl: string;
	location: string;
	website: string;
}

interface ApiError {
	error: string;
}

export default function RegisterForm() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState('');
	const [formData, setFormData] = useState<FormData>({
		username: '',
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		bio: '',
		profilePictureUrl: '',
		location: '',
		website: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setApiError('');

		try {
			const apiUrl = import.meta.env.VITE_API_BASE_URL;
			const response = await fetch(`${apiUrl}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorData: ApiError = await response.json();
				setApiError(errorData.error || 'Registration failed');
				return;
			}

			const result = await response.json();
			navigate('/register-email-send', {
				state: { email: result.email },
			});
		} catch (error) {
			setApiError('An error occurred. Please try again.');
			console.error('Registration error:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			{apiError && <div>{apiError}</div>}

			<FormField
				label='Username'
				name='username'
				value={formData.username}
				onChange={handleChange}
				required
				minLength={3}
				maxLength={50}
				placeholder='Enter your username'
			/>

			<FormField
				label='Email'
				name='email'
				type='email'
				value={formData.email}
				onChange={handleChange}
				required
				maxLength={100}
				placeholder='Enter your email'
			/>

			<FormField
				label='Password'
				name='password'
				type='password'
				value={formData.password}
				onChange={handleChange}
				required
				minLength={8}
				maxLength={255}
				placeholder='Enter a strong password'
			/>

			<FormField
				label='First Name'
				name='firstName'
				value={formData.firstName}
				onChange={handleChange}
				required
				maxLength={50}
				placeholder='Your first name'
			/>

			<FormField
				label='Last Name'
				name='lastName'
				value={formData.lastName}
				onChange={handleChange}
				required
				maxLength={50}
				placeholder='Your last name'
			/>

			<FormTextarea
				label='Bio'
				name='bio'
				value={formData.bio}
				onChange={handleChange}
				maxLength={500}
				placeholder='Tell us about yourself (optional)'
				rows={3}
			/>

			<FormField
				label='Profile Picture URL'
				name='profilePictureUrl'
				type='url'
				value={formData.profilePictureUrl}
				onChange={handleChange}
				maxLength={255}
				placeholder='https://example.com/image.jpg'
			/>

			<FormField
				label='Location'
				name='location'
				value={formData.location}
				onChange={handleChange}
				maxLength={100}
				placeholder='Your location (optional)'
			/>

			<FormField
				label='Website'
				name='website'
				type='url'
				value={formData.website}
				onChange={handleChange}
				maxLength={255}
				placeholder='https://yourwebsite.com'
			/>

			<button type='submit' disabled={loading}>
				{loading ? 'Creating account...' : 'Sign up'}
			</button>
		</form>
	);
}
