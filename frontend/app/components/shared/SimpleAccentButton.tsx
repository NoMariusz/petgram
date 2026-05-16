import type { ComponentProps, ReactNode } from 'react';

type SimpleAccentButtonProps = {
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	children: ReactNode;
} & ComponentProps<'button'>;

export default function SimpleAccentButton({
	type = 'button',
	disabled = false,
	children,
	...additionalProps
}: SimpleAccentButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			className='rounded-full bg-gradient-to-br from-[#7D5739] to-[#FECAA5] px-6 py-3 text-sm font-bold text-[#FFF7F4] cursor-pointer'
			{...additionalProps}
		>
			{children}
		</button>
	);
}
