import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { apiRequestJson } from '~/data/api';
import type { PetCreateResponse } from '~/data/types';
import FormField from '../shared/formFields/FormField';
import FormTextareaField from '../shared/formFields/FormTextareaField';
import FileInputField from '../shared/formFields/FileInputField';
import FormMainButton from '../shared/FormMainButton';

interface AddPetFormData {
	name: string;
	bio: string;
	bornAt: string;
	profilePictureImage: string;
}

export default function AddPetForm() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState('');
	const [formData, setFormData] = useState<AddPetFormData>({
		name: '',
		bio: '',
		bornAt: '',
		profilePictureImage: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const target = e.target as HTMLInputElement;
		const { name, value, type } = target;

		if (type === 'file') {
			const file = target.files?.[0];
			if (!file) {
				setFormData((prev) => ({
					...prev,
					profilePictureImage: '',
				}));
				return;
			}

			const reader = new FileReader();
			reader.onload = (event) => {
				setFormData((prev) => ({
					...prev,
					profilePictureImage: event.target?.result as string,
				}));
			};
			reader.readAsDataURL(file);
			return;
		}

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
			const createdPet = await apiRequestJson<PetCreateResponse>(
				'/pets',
				'POST',
				{
					jsonBody: {
						name: formData.name,
						bio: formData.bio || null,
						bornAt: formData.bornAt || null,
						profilePictureImage:
							formData.profilePictureImage || null,
					},
				},
			);

			navigate('/users/profile', {
				state: { createdPetId: createdPet.id },
			});
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: 'Network error. Please try again.';
			setApiError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-8'>
			{apiError && (
				<p className='rounded-[10px] bg-red-50 px-4 py-3 text-sm font-semibold text-red-700'>
					{apiError}
				</p>
			)}

			<div className='grid gap-8 lg:grid-cols-[220px_1fr] lg:items-start'>
				<div className='flex flex-col items-center gap-4'>
					<div className='h-[168px] w-[168px] overflow-hidden rounded-full bg-[#E7E9E4] shadow-[0_0_0_6px_#FFFFFF,0_14px_32px_rgba(48,51,48,0.08)]'>
						{formData.profilePictureImage ? (
							<img
								src={formData.profilePictureImage}
								alt='Pet preview'
								className='h-full w-full object-cover'
							/>
						) : (
							<div className='flex h-full w-full items-center justify-center text-[48px] font-extrabold text-[#7D5739]'>
								{formData.name.trim().charAt(0) || 'P'}
							</div>
						)}
					</div>
					<p className='text-center text-sm text-[#5D605C]'>
						This photo will appear on your pet profile and in your
						profile pets list.
					</p>
				</div>

				<div className='flex flex-col gap-[15px]'>
					<FormField
						label='Pet name'
						name='name'
						value={formData.name}
						onChange={handleChange}
						required
						maxLength={255}
						placeholder='Enter your pet name'
					/>

					<FormField
						label='Born'
						name='bornAt'
						type='date'
						value={formData.bornAt}
						onChange={handleChange}
					/>

					<FormTextareaField
						label='Bio'
						name='bio'
						value={formData.bio}
						onChange={handleChange}
						maxLength={500}
						placeholder='Tell us what makes your pet special'
						rows={4}
					/>

					<FileInputField
						label='Profile picture'
						name='profilePictureImage'
						onChange={handleChange}
						accept='image/*'
					/>
				</div>
			</div>

			<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end'>
				<Link
					to='/users/profile'
					className='flex h-[48px] items-center justify-center rounded-[20px] px-6 text-base font-medium text-[#5D605C]'
				>
					Cancel
				</Link>
				<div className='w-full sm:w-[240px]'>
					<FormMainButton
						type='submit'
						disabled={loading || !formData.name.trim()}
					>
						{loading ? 'Adding pet...' : 'Add pet'}
					</FormMainButton>
				</div>
			</div>
		</form>
	);
}
