package com.petgram.petgrambackend.view;

import java.time.LocalDateTime;

public record PetCreateResponse(
		Long id,
		String name,
		String bio,
		String profilePictureUrl,
		LocalDateTime bornAt,
		Long ownerId,
		String ownerUsername
) {
}
