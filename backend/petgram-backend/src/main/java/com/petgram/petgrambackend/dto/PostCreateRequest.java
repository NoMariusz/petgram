package com.petgram.petgrambackend.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public class PostCreateRequest {
    @NotBlank(message = "Post must contain text")
    @Size(max = 500, message = "Posts can contain at most 500 characters")
    private String text;

    private String postPicture;

    private List<String> pets;

    public String getText() {
        return this.text;
    }

    public String getPostPicture() {
        return this.postPicture;
    }

    public List<String> getPets() {
        return this.pets;
    }
}
