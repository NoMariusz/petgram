package com.petgram.petgrambackend.view;

import java.time.LocalDateTime;

public record UserDataResponse(
		Long id,
		String username,
		String email,
		String firstName,
		String lastName,
		String role,
		boolean active,
		boolean verified,
		LocalDateTime createdAt
) {
}
