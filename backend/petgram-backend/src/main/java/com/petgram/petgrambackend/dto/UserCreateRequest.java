package com.petgram.petgrambackend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserCreateRequest {

	@NotBlank(message = "Username is required")
	@Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
	private String username;

	@NotBlank(message = "Email is required")
	@Email(message = "Email must be a valid email address")
	@Size(max = 100, message = "Email must be at most 100 characters")
	private String email;

	@NotBlank(message = "Password is required")
	@Size(min = 8, max = 255, message = "Password must be between 8 and 255 characters")
	private String password;

	@NotBlank(message = "First name is required")
	@Size(max = 50, message = "First name must be at most 50 characters")
	private String firstName;

	@NotBlank(message = "Last name is required")
	@Size(max = 50, message = "Last name must be at most 50 characters")
	private String lastName;

	@Size(max = 500, message = "Bio must be at most 500 characters")
	private String bio;

	private String profilePictureImage; // base 64 encoded image string

	@Size(max = 100, message = "Location must be at most 100 characters")
	private String location;

	@Size(max = 255, message = "Website must be at most 255 characters")
	private String website;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

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
