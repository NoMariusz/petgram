import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { apiRequestJson } from '../../data/api';
import FormField from '../shared/formFields/FormField';
import FormTextareaField from '../shared/formFields/FormTextareaField';
import FileInputField from '../shared/formFields/FileInputField';
import FormMainButton from '../shared/FormMainButton';
import signInTextUrl from '../../assets/signInText.svg';

interface FormData {
	firstName: string;
	lastName: string;
	bio: string;
	profilePictureUrl: string | null;
	location: string;
	website: string;
}

export default function EditUserForm({
	initialData,
}: {
	initialData?: Partial<FormData>;
}) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState('');
	const [formData, setFormData] = useState<FormData>({
		firstName: initialData?.firstName || '',
		lastName: initialData?.lastName || '',
		bio: initialData?.bio || '',
		profilePictureUrl: initialData?.profilePictureUrl || null,
		location: initialData?.location || '',
		website: initialData?.website || '',
	});

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setApiError('');

		try {
			await apiRequestJson<unknown>('/users/me', 'PATCH', {
				jsonBody: formData,
			});
			navigate('/users/profile');
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: 'An error occurred. Please try again.';
			setApiError(message);
			console.error('Edit error:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-center gap-4'
		>
			{apiError && <div>{apiError}</div>}

			<div className='w-full flex flex-col gap-[15px]'>
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
					label='Change Profile Picture'
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

			<FormMainButton type='submit' disabled={loading}>
				{loading ? 'Saving changes...' : 'Save Changes'}
			</FormMainButton>
		</form>
	);
}
