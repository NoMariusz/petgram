import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { apiRequest } from '../../data/api';
import FormField from '../shared/formFields/FormField';
import FormTextareaField from '../shared/formFields/FormTextareaField';
import FileInputField from '../shared/formFields/FileInputField';
import FormMainButton from '../shared/FormMainButton';
import signInTextUrl from '../../assets/signInText.svg';
import type { ApiError } from '~/data/types';

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

export default function RegisterForm() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
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

	const passwordsMatch =
		formData.password &&
		confirmPassword &&
		formData.password === confirmPassword;
	const passwordMismatchError =
		formData.password && confirmPassword && !passwordsMatch
			? 'Passwords do not match'
			: '';

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const target = e.target as HTMLInputElement;
		const { name, value, type } = target;

		if (type === 'file') {
			const file = target.files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (event) => {
					setFormData((prev: FormData) => ({
						...prev,
						profilePictureUrl: event.target?.result as string,
					}));
				};
				reader.readAsDataURL(file);
			}
		} else {
			setFormData((prev: FormData) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setConfirmPassword(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setApiError('');

		try {
			const response = await apiRequest('/users', 'POST', {
				jsonBody: formData,
				skipLoginRedirect: true,
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
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-center gap-4'
		>
			<img
				src={signInTextUrl}
				alt='Sign in'
				className='w-[164px] h-auto p-2'
			/>
			{apiError && <div>{apiError}</div>}

			<div className='w-full flex flex-col gap-[15px]'>
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
					label='Confirm Password'
					name='confirmPassword'
					type='password'
					value={confirmPassword}
					onChange={handleConfirmPasswordChange}
					required
					minLength={8}
					maxLength={255}
					placeholder='Confirm your password'
					error={passwordMismatchError}
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

				<FormTextareaField
					label='Bio'
					name='bio'
					value={formData.bio}
					onChange={handleChange}
					maxLength={500}
					placeholder='Tell us about yourself (optional)'
					rows={3}
				/>

				<FileInputField
					label='Profile Picture'
					name='profilePictureImage'
					onChange={handleChange}
					accept='image/*'
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
			</div>

			<p className='text-[15px] leading-[19px] text-center text-black'>
				By tapping the Sign in button, you agree to create an account
				and to Petgrams’s terms. Information on how we collect, use and
				share your data is set out in our Privacy Policy. Information on
				our use of cookies and similar technologies is available in our
				Cookie Policy.
			</p>

			<FormMainButton type='submit' disabled={loading || !passwordsMatch}>
				{loading ? 'Creating account...' : 'Sign in'}
			</FormMainButton>

			<p className='text-[15px] leading-[19px] text-center text-[#717171]'>
				You already have an account?{' '}
				<Link to='/login' className='underline'>
					Log in
				</Link>
			</p>
		</form>
	);
}
