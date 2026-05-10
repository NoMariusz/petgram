import type { ReactNode } from 'react';
import logoUrl from '../../assets/logo.svg';

interface UnloggedSimpleContainerProps {
	children: ReactNode;
}

export default function UnloggedSimpleContainer({
	children,
}: UnloggedSimpleContainerProps) {
	return (
		<main className='min-h-screen bg-[#FAF9F6] flex flex-col items-center gap-[96px] px-6 pb-32'>
			<header className='w-[366px] h-[156px] bg-white rounded-b-[34px] shadow-[0_4px_4px_rgba(0,0,0,0.03)] flex items-center justify-center'>
				<img src={logoUrl} alt='Petgram' className='h-16 w-auto' />
			</header>
			<section className='w-full flex justify-center'>
				<div className='w-full max-w-[530px] bg-[#FFFEFB] rounded-[34px] shadow-[0_12px_32px_rgba(48,51,48,0.06)] px-8 pt-8 pb-10'>
					{children}
				</div>
			</section>
		</main>
	);
}
