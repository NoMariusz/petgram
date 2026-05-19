package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.PetCreateRequest;
import com.petgram.petgrambackend.dto.PetUpdateRequest;
import com.petgram.petgrambackend.view.PetCreateResponse;
import com.petgram.petgrambackend.view.PetProfileResponse;
import com.petgram.petgrambackend.view.FollowResponse;
import org.springframework.security.core.Authentication;

public interface PetsService {

	PetCreateResponse createPet(PetCreateRequest request, Authentication authentication);

	PetProfileResponse getPetProfile(Long petId, Authentication authentication);

	PetProfileResponse updatePet(Long petId, PetUpdateRequest request, Authentication authentication);

	FollowResponse followPet(Long petId, Authentication authentication);

	FollowResponse unfollowPet(Long petId, Authentication authentication);
}
