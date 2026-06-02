import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { apiRequest } from '~/data/api';
import type { ApiError } from '~/data/types';
import FormField from '../shared/formFields/FormField';
import FormTextareaField from '../shared/formFields/FormTextareaField';
import FileInputField from '../shared/formFields/FileInputField';
import FormMainButton from '../shared/FormMainButton';

interface CreatePostFormData {
	text: string;
	picture: string;
	pets: string[];
	postPicture: string;
}

interface PetOption {
	id: number;
	name: string;
	profilePictureUrl?: string;
}

export default function CreatePostForm() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [fetchingPets, setFetchingPets] = useState(true);
	const [apiError, setApiError] = useState('');
	const [userPets, setUserPets] = useState<PetOption[]>([]);
	const [formData, setFormData] = useState<CreatePostFormData>({
		text: '',
		picture: '',
		pets: [],
		postPicture: '',
	});

	useEffect(() => {
		const fetchUserPets = async () => {
			try {
				const response = await apiRequest('/users/me/profile', 'GET');
				if (response.ok) {
					const data = await response.json();
					setUserPets(data.pets || data.petResponses || []);
				}
			} catch (error) {
				console.error('Failed to fetch user profile data:', error);
			} finally {
				setFetchingPets(false);
			}
		};

		fetchUserPets();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const target = e.target as HTMLInputElement;
		const { name, value, type } = target;

		if (type === 'file') {
			const file = target.files?.[0];
			if (!file) {
				setFormData((prev) => ({
					...prev,
					[name]: '',
				}));
				return;
			}

			const reader = new FileReader();
			reader.onload = (event) => {
				setFormData((prev) => ({
					...prev,
					[name]: event.target?.result as string,
				}));
			};
			reader.readAsDataURL(file);
			return;
		}

		if (type === 'select-multiple') {
			const selectTarget = e.target as HTMLSelectElement;
			const selectedValues = Array.from(
				selectTarget.selectedOptions,
				(option) => option.value
			);
			setFormData((prev) => ({
				...prev,
				[name]: selectedValues,
			}));
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
			const response = await apiRequest('/posts', 'POST', {
				jsonBody: {
					text: formData.text,
					picture: formData.picture || null,
					pets: formData.pets.length > 0 ? formData.pets : null,
					postPicture: formData.postPicture || null,
				},
			});

			if (!response.ok) {
				let message = `Could not create post (${response.status})`;
				try {
					const errorData: ApiError = await response.json();
					if (errorData.error) {
						message = errorData.error;
					}
				} catch {
					// Keep fallback message for non-JSON responses.
				}
				setApiError(message);
				return;
			}

			const createdPost = await response.json();
			navigate('/users/profile', {
				state: { createdPostId: createdPost.id },
			});
		} catch {
			setApiError('Network error. Please try again.');
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

			<div className='grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start'>

				<div className='flex flex-col items-center gap-4'>
					<div className='flex h-[300px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-[#E7E9E4] shadow-[0_14px_32px_rgba(48,51,48,0.08)]'>
						{formData.postPicture ? (
							<img
								src={formData.postPicture}
								alt='Post preview'
								className='h-full w-full object-cover'
							/>
						) : (
							<div className='flex flex-col items-center gap-2 text-[#7D5739]'>
								<svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
								</svg>
								<span className="text-sm font-medium opacity-70">No image selected</span>
							</div>
						)}
					</div>
					<p className='text-center text-sm text-[#5D605C]'>
						Add a picture to share with your followers.
					</p>
				</div>

				<div className='flex flex-col gap-[15px]'>
					<FormTextareaField
						label='Post text'
						name='text'
						value={formData.text}
						onChange={handleChange}
						required
						maxLength={1000}
						placeholder="What's on your mind?"
						rows={5}
					/>

					<div className="flex flex-col gap-2">
						<label className="text-sm font-semibold text-[#303330]">
							Tag your pets
						</label>
						<select
							multiple
							name="pets"
							value={formData.pets}
							onChange={handleChange}
							disabled={fetchingPets || userPets.length === 0}
							className="min-h-[100px] w-full rounded-[10px] border border-[#D5D7D3] bg-white px-4 py-3 text-base text-[#303330] focus:border-[#7D5739] focus:outline-none focus:ring-1 focus:ring-[#7D5739] disabled:bg-gray-50 disabled:text-gray-400"
						>
							{fetchingPets ? (
								<option value="" disabled>Loading your pets...</option>
							) : userPets.length === 0 ? (
								<option value="" disabled>You don't have any pets yet</option>
							) : (
								<>
									<option value="" disabled className="text-gray-400">
										Select pets (Hold Ctrl/Cmd to select multiple)
									</option>
									{userPets.map((pet) => (
										<option key={pet.name} value={String(pet.name)}>
											{pet.name}
										</option>
									))}
								</>
							)}
						</select>
					</div>

					<FileInputField
						label='Post picture'
						name='postPicture'
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
						disabled={loading || (!formData.text.trim() && !formData.postPicture)}
					>
						{loading ? 'Posting...' : 'Create post'}
					</FormMainButton>
				</div>
			</div>
		</form>
	);
}