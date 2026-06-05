import type { ReactNode } from 'react';
import logoUrl from '../../assets/logo.svg';
import { Link } from 'react-router';
import { ROUTES } from '~/routes';

interface UnloggedSimpleContainerProps {
	children: ReactNode;
	headerClassName?: string;
	contentClassName?: string;
}

export default function UnloggedSimpleContainer({
	children,
	headerClassName = 'w-[366px] h-[128px]',
	contentClassName = 'max-w-[530px] px-8 pt-8 pb-10',
}: UnloggedSimpleContainerProps) {
	return (
		<main className='min-h-screen bg-[#FAF9F6] flex flex-col items-center gap-[36px] px-6 pb-32'>
			<header
				className={`bg-white rounded-b-[28px] shadow-[0_4px_4px_rgba(0,0,0,0.03)] flex items-center justify-center ${headerClassName}`}
			>
				<Link to={ROUTES.home}>
					<img
						src={logoUrl}
						alt='Petgram'
						className='h-16 w-auto cursor-pointer'
					/>
				</Link>
			</header>
			<section className='w-full flex justify-center'>
				<div
					className={`w-full bg-[#FFFEFB] rounded-[34px] shadow-[0_12px_32px_rgba(48,51,48,0.06)] ${contentClassName}`}
				>
					{children}
				</div>
			</section>
		</main>
	);
}
