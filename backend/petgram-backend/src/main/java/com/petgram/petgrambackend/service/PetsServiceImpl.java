package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.PetCreateRequest;
import com.petgram.petgrambackend.entity.PetEntity;
import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.PetRepository;
import com.petgram.petgrambackend.repository.UsersRepository;
import com.petgram.petgrambackend.view.PetCreateResponse;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class PetsServiceImpl implements PetsService {

	private final PetRepository petRepository;
	private final UsersRepository usersRepository;
	private final FileStorageService fileStorageService;

	public PetsServiceImpl(
			PetRepository petRepository,
			UsersRepository usersRepository,
			FileStorageService fileStorageService
	) {
		this.petRepository = petRepository;
		this.usersRepository = usersRepository;
		this.fileStorageService = fileStorageService;
	}

	@Override
	@Transactional
	public PetCreateResponse createPet(PetCreateRequest request, Authentication authentication) {
		UserEntity owner = usersRepository.findByUsername(authentication.getName())
				.orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Current user not found"));

		PetEntity pet = new PetEntity(request.getName(), owner);
		pet.setBio(request.getBio());
		if (request.getBornAt() != null) {
			pet.setBornAt(request.getBornAt().atStartOfDay());
		}

		String profilePictureImage = request.getProfilePictureImage();
		if (profilePictureImage != null && !profilePictureImage.isBlank()) {
			pet.setProfilePictureUrl(fileStorageService.saveBase64(profilePictureImage));
		}

		PetEntity savedPet = petRepository.save(pet);
		return toResponse(savedPet);
	}

	private PetCreateResponse toResponse(PetEntity pet) {
		UserEntity owner = pet.getOwner();
		return new PetCreateResponse(
				pet.getId(),
				pet.getName(),
				pet.getBio(),
				pet.getProfilePictureUrl(),
				pet.getBornAt(),
				owner == null ? null : owner.getId(),
				owner == null ? null : owner.getUsername()
		);
	}
}
