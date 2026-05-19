package com.petgram.petgrambackend.controller;

import com.petgram.petgrambackend.dto.PetCreateRequest;
import com.petgram.petgrambackend.service.PetsService;
import com.petgram.petgrambackend.view.PetCreateResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
