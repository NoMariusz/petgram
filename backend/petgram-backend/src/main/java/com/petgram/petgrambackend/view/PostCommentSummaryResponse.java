package com.petgram.petgrambackend.view;

import java.time.LocalDateTime;

public record PostCommentSummaryResponse(
    Long id,
    String text,
    String creatorUsername,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,

    Long likesCount,
    boolean isLikedByAuthenticatedUser
) {
}
