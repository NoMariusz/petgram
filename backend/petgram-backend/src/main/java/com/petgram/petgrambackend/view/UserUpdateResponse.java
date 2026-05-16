package com.petgram.petgrambackend.view;

public record UserUpdateResponse(
		Boolean success,
		String message,
		Long id,
		String username
) {
}
