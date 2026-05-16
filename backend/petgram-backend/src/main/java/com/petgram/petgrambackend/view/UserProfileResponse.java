package com.petgram.petgrambackend.view;

import java.util.List;

public record UserProfileResponse(
		Long id,
		String username,
		String firstName,
		String lastName,
		String bio,
		String profilePictureUrl,
		String location,
		String role,
		List<UserProfilePetResponse> pets,
		UserPinnedPostResponse pinnedPost
) {
	public record UserProfilePetResponse(
			Long id,
			String name,
			String profilePictureUrl
	) {
	}

	public record UserPinnedPostResponse(
			Long id,
			String text,
			String postPictureUrl,
			String creatorName,
			long likesCount
	) {
	}
}
