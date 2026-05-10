package com.petgram.petgrambackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserLoginRequest {

	@NotBlank(message = "Login is required")
	@Size(max = 100, message = "Login must be at most 100 characters")
	private String login;

	@NotBlank(message = "Password is required")
	@Size(min = 1, max = 255, message = "Password must be between 1 and 255 characters")
	private String password;

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
