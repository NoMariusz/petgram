import LoggedContainer from '~/components/shared/LoggedContainer';

export default function Feed() {
	// TODO: Implement and use common PostVerticalListItem component for common rendering posts between profiles and feed page
	return (
			<LoggedContainer activeItem='feed'>
    			<section className='rounded-[30px] bg-[#FFFEFB] p-8 shadow-[0_12px_32px_rgba(48,51,48,0.06)] md:p-10'>
    				<div className='mb-8'>
    					<p className='mt-2 max-w-2xl text-[16px] leading-6 text-[#5D605C]'>
    						Browse posts.
    					</p>
    				</div>
    			</section>
    		</LoggedContainer>
	)
}
