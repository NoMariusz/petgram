package com.petgram.petgrambackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class PetUpdateRequest {

	@NotBlank(message = "Pet name is required")
	@Size(max = 255, message = "Pet name must be at most 255 characters")
	private String name;

	@Size(max = 500, message = "Bio must be at most 500 characters")
	private String bio;

	@PastOrPresent(message = "Birth date cannot be in the future")
	private LocalDate bornAt;

	private String profilePictureImage;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public LocalDate getBornAt() {
		return bornAt;
	}

	public void setBornAt(LocalDate bornAt) {
		this.bornAt = bornAt;
	}

	public String getProfilePictureImage() {
		return profilePictureImage;
	}

	public void setProfilePictureImage(String profilePictureImage) {
		this.profilePictureImage = profilePictureImage;
	}
}
