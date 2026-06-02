import LoggedContainer from '~/components/shared/LoggedContainer';

export default function Explore() {
	// TODO: Implement and use common PostCardItem component for common rendering posts between profiles and explore page
	return (
			<LoggedContainer activeItem='explore'>
    			<section className='rounded-[30px] bg-[#FFFEFB] p-8 shadow-[0_12px_32px_rgba(48,51,48,0.06)] md:p-10'>
    				<div className='mb-8'>
    					<p className='mt-2 max-w-2xl text-[16px] leading-6 text-[#5D605C]'>
    						Explore posts.
    					</p>
    				</div>
    			</section>
    		</LoggedContainer>

	)
}
