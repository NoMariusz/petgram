package com.petgram.petgrambackend.dto;

import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class WithAdvancedFiltersPostSearchRequest extends PostSearchRequest {
    @Size(max = 255, message = "Author handle cannot exceed 255 characters")
    private String authorHandle;

    @Size(max = 255, message = "Tagged pet handle cannot exceed 255 characters")
    private String taggedPet;

    @PastOrPresent(message = "Post creation date cannot be in the future")
    private LocalDate creationDate;


    public String getAuthorHandle() {
        return authorHandle;
    }

    public String getTaggedPet() {
        return taggedPet;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }
}
