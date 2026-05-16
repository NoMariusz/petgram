import ForgotPasswordForm from '~/components/users/ForgotPasswordForm';
import UnloggedSimpleContainer from '~/components/shared/UnloggedSimpleContainer';

export default function ForgotPasswordRoute() {
	return (
		<UnloggedSimpleContainer
			headerClassName='w-[366px] h-[173px]'
			contentClassName='max-w-[526px] px-8 pt-8 pb-4'
		>
			<ForgotPasswordForm />
		</UnloggedSimpleContainer>
	);
}
