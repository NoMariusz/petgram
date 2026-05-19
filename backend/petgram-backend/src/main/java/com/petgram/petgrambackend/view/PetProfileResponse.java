package com.petgram.petgrambackend.view;

import java.time.LocalDateTime;

public record PetProfileResponse(
		Long id,
		String name,
		String bio,
		String profilePictureUrl,
		LocalDateTime bornAt,
		Long ownerId,
		String ownerUsername,
		String ownerDisplayName,
		boolean isOwnProfile,
		long memoriesCount,
		long followersCount
) {
}
