package com.petgram.petgrambackend.view;

public record LoginResponse(
		Long userId,
		String username,
		String email,
		String role,
		boolean active,
		boolean verified,
		String accessToken,
		String tokenType,
		long expiresInSeconds
) {
}
