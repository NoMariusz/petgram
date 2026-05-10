interface OrDividerProps {
	text?: string;
	className?: string;
}

export default function OrDivider({
	text = 'OR',
	className = '',
}: OrDividerProps) {
	return (
		<div
			className={`flex items-center gap-4 text-[#8A8A8A] text-[20px] leading-[25px] w-full ${className}`}
		>
			<span className='h-px flex-1 bg-[#8A8A8A]' />
			<span className='leading-none'>{text}</span>
			<span className='h-px flex-1 bg-[#8A8A8A]' />
		</div>
	);
}
