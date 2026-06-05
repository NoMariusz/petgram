export function formatCount(value: number) {
	if (value >= 1000) {
		const formatted = (value / 1000).toFixed(1).replace('.0', '');
		return `${formatted}k`;
	}
	return value.toString();
}

export function formatBornAt(value: string | null) {
	if (!value) {
		return 'Unknown';
	}

	const datePart = value.split('T')[0];
	const [year, month, day] = datePart.split('-').map(Number);
	if (!year || !month || !day) {
		return 'Unknown';
	}

	return new Date(year, month - 1, day).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
}
