package com.petgram.petgrambackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PostCommentRequest {
    @NotBlank(message = "Comment must contain text")
    @Size(max = 500, message = "Comments can contain at most 255 characters")
    private String text;

    public String getText() {
        return text;
    }
}
