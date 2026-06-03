package com.petgram.petgrambackend.view;

import java.util.List;

public record PostFeedResponse(
    List<PostSummaryResponse> posts,
    Long nextCursor
) {}
