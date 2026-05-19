import AddPetForm from '~/components/pets/AddPetForm';
import LoggedContainer from '~/components/shared/LoggedContainer';

export default function AddPet() {
	return (
		<LoggedContainer activeItem='profile'>
			<section className='rounded-[30px] bg-[#FFFEFB] p-8 shadow-[0_12px_32px_rgba(48,51,48,0.06)] md:p-10'>
				<div className='mb-8'>
					<p className='text-[12px] font-bold uppercase tracking-[1.2px] text-[#7D5739]'>
						New family member
					</p>
					<h1 className='mt-2 text-[32px] font-extrabold text-[#303330]'>
						Add a pet
					</h1>
					<p className='mt-2 max-w-2xl text-[16px] leading-6 text-[#5D605C]'>
						Create a pet profile connected to your account.
					</p>
				</div>

				<AddPetForm />
			</section>
		</LoggedContainer>
	);
}
