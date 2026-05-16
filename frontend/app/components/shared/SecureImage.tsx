import React, { useState, useEffect } from 'react';
import {
	FILE_SERVER_URL,
	LOCAL_STORAGE_ACCESS_TOKEN_KEY,
} from '~/data/constants';

const SecureImage: React.FC<{
	src: string;
	alt: string;
	className: string;
}> = ({ src, alt, className }) => {
	const [imageSrc, setImageSrc] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let objectUrl = '';

		const fetchProtectedImage = async () => {
			try {
				// Grab your JWT token from wherever you store it (localStorage, context, etc.)
				const token = localStorage.getItem(
					LOCAL_STORAGE_ACCESS_TOKEN_KEY,
				);

				const response = await fetch(FILE_SERVER_URL + src, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error(
						`Failed to fetch image: ${response.status}`,
					);
				}

				// Convert the raw response data into a binary Blob
				const blob = await response.blob();

				// Create a temporary local browser URL pointing to this blob data
				objectUrl = URL.createObjectURL(blob);
				setImageSrc(objectUrl);
				setLoading(false);
			} catch (error) {
				console.error('Error loading protected image:', error);
				setLoading(false);
				// Optional: Set a fallback placeholder image URL here if it fails
				// setImageSrc('/placeholder-avatar.png');
			}
		};

		if (src) {
			fetchProtectedImage();
		}

		// CRITICAL CLEANUP: Revoke the local URL when the component unmounts
		// to prevent browser memory leaks
		return () => {
			if (objectUrl) {
				URL.revokeObjectURL(objectUrl);
			}
		};
	}, [src]);

	if (loading) {
		// Render a simple loading skeleton or spinner while downloading
		return <div className={`${className} bg-gray-200 animate-pulse`} />;
	}

	return <img src={imageSrc} alt={alt} className={className} />;
};

export default SecureImage;
