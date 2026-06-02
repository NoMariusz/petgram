package com.petgram.petgrambackend.view;

public record PostUpdateResponse(
    Long id,
    String text,
    String postPictureUrl
) {}
