import UnloggedSimpleContainer from '~/components/shared/UnloggedSimpleContainer';
import LoginForm from '~/components/users/LoginForm';

export default function Login() {
	return (
		<UnloggedSimpleContainer
			headerClassName='w-[366px] h-[128px]'
			contentClassName='max-w-[526px] px-8 pt-8 pb-4'
		>
			<LoginForm />
		</UnloggedSimpleContainer>
	);
}
