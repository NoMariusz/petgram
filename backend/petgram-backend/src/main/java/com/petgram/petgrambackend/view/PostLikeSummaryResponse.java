package com.petgram.petgrambackend.view;

public record PostLikeSummaryResponse(
        Long id,
        long likesCount,
        boolean isLikedByAuthenticatedUser
) {
}
