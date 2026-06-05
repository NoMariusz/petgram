import { useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router';
import logoUrl from '../../assets/logo.svg';
import homeIconUrl from '../../assets/home_icon.svg';
import searchIconUrl from '../../assets/search_icon.svg';
import addIconUrl from '../../assets/add_icon.svg';
import messageIconUrl from '../../assets/message_icon.svg';
import profileIconUrl from '../../assets/profile_icon.svg';
import { apiRequest } from '~/data/api';
import {
	LOCAL_STORAGE_ACCESS_TOKEN_KEY,
	LOCAL_STORAGE_AUTH_STORAGE_KEY,
} from '~/data/constants';

interface LoggedContainerProps {
	children: ReactNode;
	activeItem?: 'feed' | 'explore' | 'add' | 'messages' | 'profile';
}

const menuItems = [
	{ key: 'feed', label: 'Feed', to: '/posts/feed', icon: homeIconUrl },
	{
		key: 'explore',
		label: 'Explore',
		to: '/posts/explore',
		icon: searchIconUrl,
	},
	{ key: 'add', label: 'Add', to: '/posts/create', icon: addIconUrl },
	{
		key: 'messages',
		label: 'Messages',
		to: '/messages',
		icon: messageIconUrl,
	},
	{
		key: 'profile',
		label: 'Profile',
		to: '/users/profile',
		icon: profileIconUrl,
	},
] as const;

export default function LoggedContainer({
	children,
	activeItem = 'profile',
}: LoggedContainerProps) {
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);

	const handleLogout = async () => {
		try {
			const response = await apiRequest('/logout', 'POST');
			if (response.ok) {
				navigate('/');
			}
			localStorage.removeItem(LOCAL_STORAGE_AUTH_STORAGE_KEY);
			localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
		} finally {
			setMenuOpen(false);
		}
	};

	return (
		<main className='min-h-screen bg-[#FAF9F6] px-6 pb-24'>
			<header className='sticky top-0 z-20 bg-[#FAF9F6] relative flex justify-center pt-6 pb-10'>
				<div className='absolute top-8 right-2 md:right-8'>
					<div className='relative'>
						<button
							type='button'
							aria-label='Open menu'
							onClick={() => setMenuOpen((prev) => !prev)}
							className='h-9 w-9 rounded-full bg-white shadow-[0_4px_12px_rgba(48,51,48,0.08)] flex items-center justify-center'
						>
							<span className='flex flex-col gap-1'>
								<span className='h-[2px] w-4 rounded-full bg-[#303330]' />
								<span className='h-[2px] w-4 rounded-full bg-[#303330]' />
								<span className='h-[2px] w-4 rounded-full bg-[#303330]' />
							</span>
						</button>

						{menuOpen && (
							<div className='absolute right-0 mt-2 w-44 rounded-[16px] bg-[#FFFEFB] shadow-[0_12px_32px_rgba(48,51,48,0.12)] p-2'>
								<Link
									to='/settings'
									className='block rounded-[12px] px-3 py-2 text-sm font-semibold text-[#303330] hover:bg-[#F4F4F0]'
									onClick={() => setMenuOpen(false)}
								>
									Settings
								</Link>
								<button
									type='button'
									onClick={handleLogout}
									className='w-full text-left rounded-[12px] px-3 py-2 text-sm font-semibold text-[#303330] hover:bg-[#F4F4F0]'
								>
									Logout
								</button>
							</div>
						)}
					</div>
				</div>

				<div
					className='absolute left-6 md:left-12 top-0 hidden lg:block'
					id='leftTopLogo'
				>
					<div className='bg-white rounded-b-[34px] shadow-[0_4px_4px_rgba(0,0,0,0.03)] w-[220px] h-[112px] flex items-center justify-center'>
						<Link to='/posts/feed'>
							<img
								src={logoUrl}
								alt='Petgram'
								className='h-14 w-auto'
							/>
						</Link>
					</div>
				</div>

				<nav className='flex items-center gap-2'>
					{menuItems.map((item) => {
						const isActive = item.key === activeItem;
						return (
							<Link
								key={item.key}
								to={item.to}
								className={`flex flex-col items-center gap-1 rounded-full px-4 py-2 ${
									isActive
										? 'bg-[#7D5739] text-white'
										: 'text-[#78716C]'
								}`}
							>
								<img
									src={item.icon}
									alt=''
									className={`h-4 w-4 ${
										isActive ? 'brightness-0 invert' : ''
									}`}
									aria-hidden='true'
								/>
								<span
									className={`text-[10px] uppercase tracking-[1px] font-semibold ${
										isActive
											? 'text-white'
											: 'text-[#78716C]'
									}`}
								>
									{item.label}
								</span>
							</Link>
						);
					})}
				</nav>
			</header>

			<section className='mx-auto w-full max-w-[950px]'>
				{children}
			</section>
		</main>
	);
}
