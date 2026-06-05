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

export const formatCreationDate = (createdAtString: string): string => {
	if (!createdAtString) return '';
	const createdDate = new Date(createdAtString);
	const now = new Date();
	const diffInMs = now.getTime() - createdDate.getTime();
	const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

	if (diffInHours >= 0 && diffInHours < 24) {
		const hours = diffInHours === 0 ? 1 : diffInHours;
		return `${hours} hour${hours === 1 ? '' : 's'} ago`;
	} else {
		const day = String(createdDate.getDate()).padStart(2, '0');
		const month = String(createdDate.getMonth() + 1).padStart(2, '0');
		const year = createdDate.getFullYear();
		const hours = String(createdDate.getHours()).padStart(2, '0');
		const minutes = String(createdDate.getMinutes()).padStart(2, '0');
		return `${day}.${month}.${year} ${hours}:${minutes}`;
	}
};
