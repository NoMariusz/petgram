import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import loginTextUrl from '../../assets/loginText.svg';
import googleLogoUrl from '../../assets/googleLogo.png';
import truthSocialLogoUrl from '../../assets/truthSocialLogo.png';
import { apiRequest } from '../../data/api';
import FormMainButton from '../shared/FormMainButton';
import FormSecondaryButton from '../shared/FormSecondaryButton';
import OrDivider from '../shared/OrDivider';
import FormField from './FormField';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '~/data/constants';

interface LoginData {
	username: string;
	password: string;
}

interface LoginResponse {
	userId: number;
	username: string;
	email: string;
	role: string | null;
	active: boolean;
	verified: boolean;
	accessToken: string;
	tokenType: string;
	expiresInSeconds: number;
}

interface ApiError {
	error?: string;
}

const AUTH_STORAGE_KEY = 'petgram.auth';

function persistAuthSession(response: LoginResponse) {
	const expiresAt = Date.now() + response.expiresInSeconds * 1000;
	const authData = {
		userId: response.userId,
		username: response.username,
		email: response.email,
		role: response.role,
		active: response.active,
		verified: response.verified,
		tokenType: response.tokenType,
		accessToken: response.accessToken,
		expiresInSeconds: response.expiresInSeconds,
		expiresAt,
	};

	localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
	localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, response.accessToken);
}

export default function LoginForm() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState('');
	const [formData, setFormData] = useState<LoginData>({
		username: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
			const response = await apiRequest('/login', 'POST', {
				jsonBody: {
					login: formData.username,
					password: formData.password,
				},
			});

			if (!response.ok) {
				let message = `Login failed (${response.status})`;
				try {
					const errorData: ApiError = await response.json();
					if (errorData.error) {
						message = errorData.error;
					}
				} catch {
					// Non-JSON error response; keep fallback message.
				}
				setApiError(message);
				return;
			}

			const result: LoginResponse = await response.json();
			persistAuthSession(result);
			navigate('/posts/feed');
		} catch {
			setApiError('Network error. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-center gap-4'
		>
			{apiError && (
				<p className='w-full text-center text-sm text-red-600'>
					{apiError}
				</p>
			)}
			<img
				src={loginTextUrl}
				alt='Login'
				className='w-[129px] h-auto p-1'
			/>

			<div className='w-full flex flex-col gap-[15px]'>
				<FormField
					label='Username'
					name='username'
					value={formData.username}
					onChange={handleChange}
					placeholder='Type your email or username'
				/>

				<FormField
					label='Password'
					name='password'
					type='password'
					value={formData.password}
					onChange={handleChange}
					placeholder='Type your password'
				/>
			</div>

			<div className='w-full flex justify-end -mt-2'>
				<Link
					to='/forgot-password'
					className='text-[15px] leading-[19px] text-[#717171]'
				>
					Forgot your password?
				</Link>
			</div>

			<FormMainButton
				type='submit'
				disabled={loading || !formData.username || !formData.password}
			>
				{loading ? 'Logging in...' : 'Log in'}
			</FormMainButton>

			<OrDivider className='my-1' />

			<div className='w-full flex flex-col gap-3'>
				<FormSecondaryButton
					type='button'
					iconSrc={googleLogoUrl}
					iconAlt='Google'
				>
					Log in with Google
				</FormSecondaryButton>
				<FormSecondaryButton
					type='button'
					iconSrc={truthSocialLogoUrl}
					iconAlt='Truth Social'
				>
					Log in with Truth Social
				</FormSecondaryButton>
			</div>

			<Link
				to='/register'
				className='text-[15px] leading-[19px] text-[#717171] text-center mt-12'
			>
				Dont have an account? <span className='underline'>Sign up</span>
			</Link>
		</form>
	);
}
