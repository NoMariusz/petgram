import type { ReactNode } from 'react';

interface FormSecondaryButtonProps {
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	children: ReactNode;
	iconSrc?: string;
	iconAlt?: string;
}

export default function FormSecondaryButton({
	type = 'button',
	disabled = false,
	children,
	iconSrc,
	iconAlt = 'button icon',
}: FormSecondaryButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			className='relative w-full h-[48px] rounded-[20px] bg-white border border-[#DADCE0] text-[#3C4043] text-base font-medium tracking-[0.25px] flex items-center justify-center shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
		>
			{iconSrc && (
				<img
					src={iconSrc}
					alt={iconAlt}
					className='absolute left-4 h-6 w-6 rounded-full object-contain'
				/>
			)}
			{children}
		</button>
	);
}
