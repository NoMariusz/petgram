interface LoaderProps {
	size?: number;
	className?: string;
}

export default function Loader({ size = 128, className = '' }: LoaderProps) {
	return (
		<div
			className={`inline-flex items-center justify-center ${className}`}
			role='status'
			aria-live='polite'
			aria-label='Loading'
		>
			<span
				className='inline-block rounded-full animate-spin'
				style={{
					width: size,
					height: size,
					background:
						'conic-gradient(from 90deg, #7D5739 0deg, #FECAA5 300deg, transparent 300deg 360deg)',
					WebkitMask:
						'radial-gradient(farthest-side, transparent calc(100% - 10px), #000 calc(100% - 10px))',
					mask: 'radial-gradient(farthest-side, transparent calc(100% - 10px), #000 calc(100% - 10px))',
				}}
			/>
		</div>
	);
}
