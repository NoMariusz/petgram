import { useLocation } from 'react-router';
import FormSecondaryButton from '~/components/shared/FormSecondaryButton';
import UnloggedSimpleContainer from '~/components/shared/UnloggedSimpleContainer';

export default function RegisterEmailSend() {
	const location = useLocation();
	const email = (location.state as { email?: string })?.email;

	return (
		<UnloggedSimpleContainer
			headerClassName='w-[366px] h-[173px]'
			contentClassName='max-w-[923px] px-6 py-6'
		>
			<div className='flex flex-col items-center justify-center gap-6 text-[#313131]'>
				<p className='text-[20px] leading-[25px] max-w-[875px] text-center'>
					You’re almost done! We sent an activation mail to{' '}
					<strong>{email || 'your email address'}</strong>.
				</p>
				<p className='text-[20px] leading-[25px] max-w-[875px] text-center'>
					Please follow the instruction in the email to activate your
					account.
				</p>
				<p className='text-[20px] leading-[25px] max-w-[875px] text-center'>
					If it doesn’t arrive, <u>check your spam folder</u>, or use
					button below to send activation email again.
				</p>
				<div className='w-1/2'>
					<FormSecondaryButton>
						Send activation email again
					</FormSecondaryButton>
				</div>
			</div>
		</UnloggedSimpleContainer>
	);
}
