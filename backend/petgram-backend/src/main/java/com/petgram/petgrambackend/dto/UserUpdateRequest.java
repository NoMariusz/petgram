package com.petgram.petgrambackend.dto;

import jakarta.validation.constraints.Size;

public class UserUpdateRequest {

	@Size(max = 50, message = "First name must be at most 50 characters")
	private String firstName;

	@Size(max = 50, message = "Last name must be at most 50 characters")
	private String lastName;

	@Size(max = 500, message = "Bio must be at most 500 characters")
	private String bio;

	private String profilePictureImage; // base 64 encoded image string

	@Size(max = 100, message = "Location must be at most 100 characters")
	private String location;

	@Size(max = 255, message = "Website must be at most 255 characters")
	private String website;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getProfilePictureImage() {
		return profilePictureImage;
	}

	public void setProfilePictureImage(String profilePictureImage) {
		this.profilePictureImage = profilePictureImage;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}
}
