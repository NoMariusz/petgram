import { Link } from 'react-router';
import { ROUTES } from '../routes';

export default function NotFound() {
	return (
		<main className='min-h-screen bg-[#FAF9F6] px-6 py-8 text-[#303330]'>
			<section className='mx-auto flex min-h-[calc(100vh-140px)] w-full max-w-[900px] items-center justify-center py-10'>
				<div className='w-full rounded-[34px] bg-[#FFFEFB] px-6 py-10 text-center shadow-[0_12px_32px_rgba(48,51,48,0.08)] sm:px-12'>
					<h1 className='mt-4 text-2xl font-extrabold leading-tight text-[#313131] sm:text-5xl'>
						Page not found
					</h1>
					<p className='mx-auto mt-4 max-w-[560px] text-base leading-7 text-[#6B625B]'>
						The address may be incorrect or the page may have been
						moved. Go back to Petgram and keep exploring.
					</p>

					<div className='mx-auto mt-8 flex w-full max-w-[420px] flex-col gap-3 sm:flex-row'>
						<Link
							to={ROUTES.posts.feed}
							className='flex h-12 flex-1 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#7D5739] to-[#FECAA5] px-5 text-base font-medium tracking-[0.25px] text-[#FFF7F4] shadow-sm'
						>
							Go to feed
						</Link>
						<Link
							to={ROUTES.home}
							className='flex h-12 flex-1 items-center justify-center rounded-[20px] border border-[#DADCE0] bg-white px-5 text-base font-medium tracking-[0.25px] text-[#3C4043] shadow-sm'
						>
							Home page
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
