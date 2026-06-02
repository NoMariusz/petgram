package com.petgram.petgrambackend.view;

import java.time.LocalDateTime;
import java.util.List;

public record PostSummaryResponse(
        Long id,
        String text,
        String postPictureUrl,
        String creatorName,
        LocalDateTime createdAt,
        long likesCount,
        List<String> pets
) {
}
