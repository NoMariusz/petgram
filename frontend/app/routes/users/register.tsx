import RegisterForm from '../../components/users/RegisterForm';
import UnloggedSimpleContainer from '../../components/shared/UnloggedSimpleContainer';

export default function Register() {
	return (
		<UnloggedSimpleContainer>
			<RegisterForm />
		</UnloggedSimpleContainer>
	);
}
