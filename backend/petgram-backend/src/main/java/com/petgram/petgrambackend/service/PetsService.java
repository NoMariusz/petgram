package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.PetCreateRequest;
import com.petgram.petgrambackend.view.PetCreateResponse;
import com.petgram.petgrambackend.view.PetProfileResponse;
import org.springframework.security.core.Authentication;

public interface PetsService {

	PetCreateResponse createPet(PetCreateRequest request, Authentication authentication);

	PetProfileResponse getPetProfile(Long petId, Authentication authentication);
}
