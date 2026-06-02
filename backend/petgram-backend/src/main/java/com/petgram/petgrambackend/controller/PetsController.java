package com.petgram.petgrambackend.controller;

import com.petgram.petgrambackend.dto.PetCreateRequest;
import com.petgram.petgrambackend.dto.PetUpdateRequest;
import com.petgram.petgrambackend.service.PetsService;
import com.petgram.petgrambackend.view.FollowResponse;
import com.petgram.petgrambackend.view.PetCreateResponse;
import com.petgram.petgrambackend.view.PetProfileResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pets")
public class PetsController {

	private final PetsService petsService;

	public PetsController(PetsService petsService) {
		this.petsService = petsService;
	}

	@PostMapping
	public ResponseEntity<PetCreateResponse> createPet(
			@Valid @RequestBody PetCreateRequest request,
			Authentication authentication
	) {
		PetCreateResponse createdPet = petsService.createPet(request, authentication);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdPet);
	}

	@GetMapping("/{id}")
	public PetProfileResponse getPetProfile(@PathVariable Long id, Authentication authentication) {
		return petsService.getPetProfile(id, authentication);
	}

	@PatchMapping("/{id}")
	public PetProfileResponse updatePet(
			@PathVariable Long id,
			@Valid @RequestBody PetUpdateRequest request,
			Authentication authentication
	) {
		return petsService.updatePet(id, request, authentication);
	}

	@PostMapping("/{id}/follow")
	public FollowResponse followPet(@PathVariable Long id, Authentication authentication) {
		return petsService.followPet(id, authentication);
	}

	@PostMapping("/{id}/unfollow")
	public FollowResponse unfollowPet(@PathVariable Long id, Authentication authentication) {
		return petsService.unfollowPet(id, authentication);
	}
}
