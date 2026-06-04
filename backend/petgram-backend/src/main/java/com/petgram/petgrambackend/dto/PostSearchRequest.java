package com.petgram.petgrambackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PostSearchRequest {
    @NotBlank(message = "Please enter the search query")
    @Size(max = 255, message = "Search query cannot exceed 255 characters")
    private String query;

    public String getQuery() {
        return query;
    }
}
