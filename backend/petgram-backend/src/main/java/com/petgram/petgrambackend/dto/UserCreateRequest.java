package com.petgram.petgrambackend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserCreateRequest {

	@NotBlank
	@Size(min = 3, max = 50)
	private String username;

	@NotBlank
	@Email
	@Size(max = 100)
	private String email;

	@NotBlank
	@Size(min = 8, max = 255)
	private String password;

	@NotBlank
	@Size(max = 50)
	private String firstName;

	@NotBlank
	@Size(max = 50)
	private String lastName;

	@Size(max = 500)
	private String bio;

	@Size(max = 255)
	private String profilePictureUrl;

	@Size(max = 100)
	private String location;

	@Size(max = 255)
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

	public String getProfilePictureUrl() {
		return profilePictureUrl;
	}

	public void setProfilePictureUrl(String profilePictureUrl) {
		this.profilePictureUrl = profilePictureUrl;
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
