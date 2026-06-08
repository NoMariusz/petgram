import { Link } from 'react-router';
import logoUrl from '../assets/logo.svg';
import homeImage from '../assets/home-image.png';
import FormMainButton from '~/components/shared/FormMainButton';
import OrDivider from '~/components/shared/OrDivider';
import { ROUTES } from '../route-constants';

export default function Home() {
	const bg = '#FAF9F6';

	return (
		<main style={{ background: bg }} className='min-h-screen flex flex-col'>
			<header
				className='w-full flex items-center justify-center rounded-xl overflow-hidden shadow-lg'
				style={{ height: '16vh' }}
			>
				<img src={logoUrl} alt='Petgram' className='h-20' />
			</header>

			<section className='w-full p-4' style={{ height: '80vh' }}>
				<div className='h-full px-6 2xl:container mx-auto'>
					<div className='h-full flex flex-col md:flex-row gap-12 pt-6 items-stretch'>
						<div
							className='hidden md:flex md:w-2/3 rounded-xl overflow-hidden shadow-lg relative items-center'
							style={{
								backgroundImage: `url(${homeImage})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}
						>
							<div className='absolute inset-0 bg-black/30' />
							<div className='relative z-10 w-full p-8 flex items-center justify-center'>
								<p className='text-white text-center text-xl md:text-2xl lg:text-3xl font-semibold max-w-2xl'>
									Community for pet owners and animal lovers —
									share, discover and organize photos and
									short videos of your pets!
								</p>
							</div>
						</div>

						<div
							className='md:w-1/3 flex items-center justify-center'
							id='start-now'
						>
							<div className='bg-[#FFFEFB] rounded-[34px] px-8 pt-8 pb-4 shadow-[0_12px_32px_rgba(48,51,48,0.06)] w-full max-w-[550px] min-h-[550px] flex'>
								<div className='w-full flex flex-col justify-between gap-1'>
									<div className='empty'></div>
									<div className='text-center text-[36px] leading-10 font-extrabold tracking-[-0.9px] text-[#313131] pt-3'>
										Welcome to your pet community
									</div>

									<div className='flex flex-col gap-4 px-4'>
										<FormMainButton>
											<Link to={ROUTES.auth.login}>
												Login
											</Link>
										</FormMainButton>

										<OrDivider className='my-1' />

										<FormMainButton>
											<Link to={ROUTES.auth.register}>
												Sign in
											</Link>
										</FormMainButton>
									</div>

									<div className='empty'></div>
									<p className='text-center text-[13px] leading-[19px] text-gray-500 max-w-[464px] mx-auto pb-1'>
										By clicking Login or Sign in, you agree
										to Petgram`s User Agreement, Privacy
										Policy, and Cookie Policy.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
