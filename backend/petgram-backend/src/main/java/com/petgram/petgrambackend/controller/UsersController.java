package com.petgram.petgrambackend.controller;

import com.petgram.petgrambackend.dto.UserCreateRequest;
import com.petgram.petgrambackend.dto.UserUpdateRequest;
import com.petgram.petgrambackend.service.UsersService;
import com.petgram.petgrambackend.view.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UsersController {

	private final UsersService usersService;

	public UsersController(UsersService usersService) {
		this.usersService = usersService;
	}

	@PostMapping
	public ResponseEntity<UserCreateResponse> createUser(@Valid @RequestBody UserCreateRequest request) {
		UserCreateResponse createdUser = usersService.createUser(request);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
	}

	@GetMapping("/me")
	public UserDataResponse getCurrentUser(Authentication authentication) {
		return usersService.getCurrentUserData(authentication.getName());
	}

	@GetMapping("/me/profile")
	public UserProfileResponse getCurrentUserProfile(Authentication authentication) {
		return usersService.getCurrentUserProfile(authentication);
	}

	@GetMapping("/{id}/profile")
	public UserProfileResponse getUserProfileById(@PathVariable Long id, Authentication authentication) {
		return usersService.getUserProfileById(id, authentication);
	}

	@PostMapping("/{id}/follow")
	public FollowResponse follow(@PathVariable Long id, Authentication authentication) {
		return usersService.follow(id, authentication);
	}

	@PostMapping("/{id}/unfollow")
	public FollowResponse unfollow(@PathVariable Long id, Authentication authentication) {
		return usersService.unfollow(id, authentication);
	}

	@PatchMapping("/me")
	public UserUpdateResponse updateCurrentUser(@Valid @RequestBody UserUpdateRequest request, Authentication authentication) {
		return usersService.updateCurrentUser(request, authentication);
	}

	@GetMapping("/{username}")
	public UserDataResponse getByUsername(@PathVariable("username") String username, Authentication authentication) {
		return usersService.getByUsername(username, authentication);
	}
}
