package com.petgram.petgrambackend.controller;

import com.petgram.petgrambackend.dto.UserLoginRequest;
import com.petgram.petgrambackend.service.AuthService;
import com.petgram.petgrambackend.view.LoginResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthControler {

	private final AuthService authService;

	public AuthControler(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/login")
	public LoginResponse login(@Valid @RequestBody UserLoginRequest request) {
		return authService.login(request);
	}

	@PostMapping("/logout")
	public ResponseEntity<Void> logout(@RequestHeader("Authorization") String authorizationHeader) {
		authService.logout(authorizationHeader);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
}
