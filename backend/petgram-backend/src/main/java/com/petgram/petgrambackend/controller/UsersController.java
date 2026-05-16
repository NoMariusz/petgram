package com.petgram.petgrambackend.controller;

import com.petgram.petgrambackend.dto.UserCreateRequest;
import com.petgram.petgrambackend.dto.UserUpdateRequest;
import com.petgram.petgrambackend.service.UsersService;
import com.petgram.petgrambackend.view.UserCreateResponse;
import com.petgram.petgrambackend.view.UserDataResponse;
import com.petgram.petgrambackend.view.UserProfileResponse;
import com.petgram.petgrambackend.view.FollowResponse;
import com.petgram.petgrambackend.view.UserUpdateResponse;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
