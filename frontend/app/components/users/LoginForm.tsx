import { Link } from 'react-router';
import loginTextUrl from '../../assets/loginText.svg';
import googleLogoUrl from '../../assets/googleLogo.png';
import truthSocialLogoUrl from '../../assets/truthSocialLogo.png';
import FormMainButton from '../shared/FormMainButton';
import FormSecondaryButton from '../shared/FormSecondaryButton';
import OrDivider from '../shared/OrDivider';
import FormField from './FormField';
import { useState } from 'react';

interface LoginData {
	username: string;
	password: string;
}

export default function LoginForm() {
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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-center gap-4'
		>
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

			<FormMainButton type='submit'>Log in</FormMainButton>

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
				to='/users/register'
				className='text-[15px] leading-[19px] text-[#717171] text-center mt-12'
			>
				Dont have an account? <span className='underline'>Sign up</span>
			</Link>
		</form>
	);
}
