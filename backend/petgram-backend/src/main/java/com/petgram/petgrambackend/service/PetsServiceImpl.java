package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.PetCreateRequest;
import com.petgram.petgrambackend.dto.PetUpdateRequest;
import com.petgram.petgrambackend.entity.PetEntity;
import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.PetRepository;
import com.petgram.petgrambackend.repository.UsersRepository;
import com.petgram.petgrambackend.view.FollowResponse;
import com.petgram.petgrambackend.view.PetCreateResponse;
import com.petgram.petgrambackend.view.PetProfileResponse;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.FORBIDDEN;
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

	@Override
	@Transactional(readOnly = true)
	public PetProfileResponse getPetProfile(Long petId, Authentication authentication) {
		UserEntity currentUser = usersRepository.findByUsername(authentication.getName())
				.orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Current user not found"));

		PetEntity pet = petRepository.findWithOwnerById(petId)
				.orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Pet not found"));

		return toProfileResponse(pet, currentUser);
	}

	@Override
	@Transactional
	public PetProfileResponse updatePet(Long petId, PetUpdateRequest request, Authentication authentication) {
		UserEntity currentUser = usersRepository.findByUsername(authentication.getName())
				.orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Current user not found"));
		PetEntity pet = petRepository.findWithOwnerById(petId)
				.orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Pet not found"));

		if (!isOwner(pet, currentUser)) {
			throw new ResponseStatusException(FORBIDDEN, "Only the pet owner can edit this pet");
		}

		pet.setName(request.getName());
		pet.setBio(request.getBio());
		pet.setBornAt(request.getBornAt() == null ? null : request.getBornAt().atStartOfDay());

		String profilePictureImage = request.getProfilePictureImage();
		if (profilePictureImage != null && !profilePictureImage.isBlank()) {
			pet.setProfilePictureUrl(fileStorageService.saveBase64(profilePictureImage));
		}

		PetEntity updatedPet = petRepository.save(pet);
		return toProfileResponse(updatedPet, currentUser);
	}

	@Override
	@Transactional
	public FollowResponse followPet(Long petId, Authentication authentication) {
		UserEntity currentUser = usersRepository.findByUsername(authentication.getName())
				.orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Current user not found"));
		PetEntity pet = petRepository.findWithOwnerById(petId)
				.orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Pet not found"));

		if (isOwner(pet, currentUser)) {
			throw new ResponseStatusException(CONFLICT, "Cannot follow your own pet");
		}

		boolean alreadyFollowing = currentUser.getFollowedPets().stream()
				.anyMatch(followedPet -> followedPet.getId().equals(petId));
		if (alreadyFollowing) {
			throw new ResponseStatusException(CONFLICT, "Already following this pet");
		}

		currentUser.getFollowedPets().add(pet);
		usersRepository.save(currentUser);
		return new FollowResponse(true, "Successfully followed pet");
	}

	@Override
	@Transactional
	public FollowResponse unfollowPet(Long petId, Authentication authentication) {
		UserEntity currentUser = usersRepository.findByUsername(authentication.getName())
				.orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Current user not found"));
		PetEntity pet = petRepository.findWithOwnerById(petId)
				.orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Pet not found"));

		if (isOwner(pet, currentUser)) {
			throw new ResponseStatusException(CONFLICT, "Cannot unfollow your own pet");
		}

		boolean isFollowing = currentUser.getFollowedPets().stream()
				.anyMatch(followedPet -> followedPet.getId().equals(petId));
		if (!isFollowing) {
			throw new ResponseStatusException(CONFLICT, "Not following this pet");
		}

		currentUser.getFollowedPets().removeIf(followedPet -> followedPet.getId().equals(petId));
		usersRepository.save(currentUser);
		return new FollowResponse(true, "Successfully unfollowed pet");
	}

	private PetProfileResponse toProfileResponse(PetEntity pet, UserEntity currentUser) {
		UserEntity owner = pet.getOwner();
		String ownerDisplayName = owner == null
				? null
				: (owner.getFirstName() + " " + owner.getLastName()).trim();
		if (ownerDisplayName != null && ownerDisplayName.isBlank()) {
			ownerDisplayName = owner.getUsername();
		}

		Long ownerId = owner == null ? null : owner.getId();
		boolean isOwnProfile = ownerId != null && ownerId.equals(currentUser.getId());
		boolean isFollowed = currentUser.getFollowedPets().stream()
				.anyMatch(followedPet -> followedPet.getId().equals(pet.getId()));
		return new PetProfileResponse(
				pet.getId(),
				pet.getName(),
				pet.getBio(),
				pet.getProfilePictureUrl(),
				pet.getBornAt(),
				ownerId,
				owner == null ? null : owner.getUsername(),
				ownerDisplayName,
				isOwnProfile,
				!isOwnProfile && isFollowed,
				petRepository.countPostsByPetId(pet.getId()),
				petRepository.countFollowersByPetId(pet.getId())
		);
	}

	private boolean isOwner(PetEntity pet, UserEntity user) {
		UserEntity owner = pet.getOwner();
		return owner != null && owner.getId().equals(user.getId());
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
