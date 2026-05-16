import { useState } from 'react';
import FormField from '../shared/formFields/FormField';
import FormMainButton from '~/components/shared/FormMainButton';

export default function ForgotPasswordForm() {
	const [login, setLogin] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
			<h1 className='text-[36px] leading-10 font-extrabold tracking-[-0.9px] text-black'>
				Reset your password
			</h1>

			<FormField
				label='Enter your username or email address'
				name='login'
				value={login}
				onChange={(e) => setLogin(e.target.value)}
				placeholder='Type your username or email address'
			/>

			<p className='text-[15px] leading-[19px] text-[#717171]'>
				We’ll send a verification code to your email if it matches an
				existing Petgram’s account.
			</p>

			<FormMainButton type='submit'>Continue</FormMainButton>
		</form>
	);
}
