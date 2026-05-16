package com.petgram.petgrambackend.view;

import java.time.LocalDateTime;

public record PostSummaryResponse(
        Long id,
        String text,
        String postPictureUrl,
        String creatorName,
        LocalDateTime createdAt,
        long likesCount
) {
}
