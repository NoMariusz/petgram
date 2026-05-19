package com.petgram.petgrambackend.pets;

import com.petgram.petgrambackend.dto.PetUpdateRequest;
import com.petgram.petgrambackend.entity.PetEntity;
import com.petgram.petgrambackend.entity.RoleEntity;
import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.PetRepository;
import com.petgram.petgrambackend.repository.UsersRepository;
import com.petgram.petgrambackend.service.FileStorageService;
import com.petgram.petgrambackend.service.PetsServiceImpl;
import com.petgram.petgrambackend.view.FollowResponse;
import com.petgram.petgrambackend.view.PetProfileResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.FORBIDDEN;

class PetsServiceEditAndFollowTests {

	@Test
	@DisplayName("updatePet updates only owner pet")
	void updatePetUpdatesOnlyOwnerPet() {
		PetRepository petRepository = mock(PetRepository.class);
		UsersRepository usersRepository = mock(UsersRepository.class);
		FileStorageService fileStorageService = mock(FileStorageService.class);
		PetsServiceImpl service = new PetsServiceImpl(petRepository, usersRepository, fileStorageService);

		UserEntity owner = createUser(1L, "john");
		PetEntity pet = createPet(10L, "Luna", owner);
		PetUpdateRequest request = new PetUpdateRequest();
		request.setName("Luna Bean");
		request.setBio("Updated bio");
		request.setBornAt(LocalDate.of(2020, 2, 3));
		request.setProfilePictureImage("base64-image");

		Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);
		when(usersRepository.findByUsername("john")).thenReturn(Optional.of(owner));
		when(petRepository.findWithOwnerById(10L)).thenReturn(Optional.of(pet));
		when(fileStorageService.saveBase64("base64-image")).thenReturn("/data/uploads/luna.png");
		when(petRepository.save(any(PetEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

		PetProfileResponse response = service.updatePet(10L, request, authentication);

		assertEquals("Luna Bean", response.name());
		assertEquals("Updated bio", response.bio());
		assertEquals(LocalDate.of(2020, 2, 3).atStartOfDay(), response.bornAt());
		assertEquals("/data/uploads/luna.png", response.profilePictureUrl());
		assertTrue(response.isOwnProfile());
		verify(petRepository).save(pet);
	}

	@Test
	@DisplayName("updatePet rejects non owner")
	void updatePetRejectsNonOwner() {
		PetRepository petRepository = mock(PetRepository.class);
		UsersRepository usersRepository = mock(UsersRepository.class);
		FileStorageService fileStorageService = mock(FileStorageService.class);
		PetsServiceImpl service = new PetsServiceImpl(petRepository, usersRepository, fileStorageService);

		UserEntity owner = createUser(1L, "john");
		UserEntity visitor = createUser(2L, "anna");
		PetEntity pet = createPet(10L, "Luna", owner);
		PetUpdateRequest request = new PetUpdateRequest();
		request.setName("Nope");

		Authentication authentication = new UsernamePasswordAuthenticationToken("anna", null);
		when(usersRepository.findByUsername("anna")).thenReturn(Optional.of(visitor));
		when(petRepository.findWithOwnerById(10L)).thenReturn(Optional.of(pet));

		ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.updatePet(10L, request, authentication));

		assertSame(FORBIDDEN, ex.getStatusCode());
		assertEquals("Only the pet owner can edit this pet", ex.getReason());
	}

	@Test
	@DisplayName("followPet follows another user's pet")
	void followPetFollowsAnotherUsersPet() {
		PetRepository petRepository = mock(PetRepository.class);
		UsersRepository usersRepository = mock(UsersRepository.class);
		FileStorageService fileStorageService = mock(FileStorageService.class);
		PetsServiceImpl service = new PetsServiceImpl(petRepository, usersRepository, fileStorageService);

		UserEntity owner = createUser(1L, "john");
		UserEntity visitor = createUser(2L, "anna");
		PetEntity pet = createPet(10L, "Luna", owner);

		Authentication authentication = new UsernamePasswordAuthenticationToken("anna", null);
		when(usersRepository.findByUsername("anna")).thenReturn(Optional.of(visitor));
		when(petRepository.findWithOwnerById(10L)).thenReturn(Optional.of(pet));
		when(usersRepository.save(visitor)).thenReturn(visitor);

		FollowResponse response = service.followPet(10L, authentication);

		assertTrue(response.success());
		assertEquals("Successfully followed pet", response.message());
		assertTrue(visitor.getFollowedPets().contains(pet));
		verify(usersRepository).save(visitor);
	}

	@Test
	@DisplayName("followPet rejects own pet")
	void followPetRejectsOwnPet() {
		PetRepository petRepository = mock(PetRepository.class);
		UsersRepository usersRepository = mock(UsersRepository.class);
		FileStorageService fileStorageService = mock(FileStorageService.class);
		PetsServiceImpl service = new PetsServiceImpl(petRepository, usersRepository, fileStorageService);

		UserEntity owner = createUser(1L, "john");
		PetEntity pet = createPet(10L, "Luna", owner);

		Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);
		when(usersRepository.findByUsername("john")).thenReturn(Optional.of(owner));
		when(petRepository.findWithOwnerById(10L)).thenReturn(Optional.of(pet));

		ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.followPet(10L, authentication));

		assertSame(CONFLICT, ex.getStatusCode());
		assertEquals("Cannot follow your own pet", ex.getReason());
	}

	@Test
	@DisplayName("unfollowPet removes followed pet")
	void unfollowPetRemovesFollowedPet() {
		PetRepository petRepository = mock(PetRepository.class);
		UsersRepository usersRepository = mock(UsersRepository.class);
		FileStorageService fileStorageService = mock(FileStorageService.class);
		PetsServiceImpl service = new PetsServiceImpl(petRepository, usersRepository, fileStorageService);

		UserEntity owner = createUser(1L, "john");
		UserEntity visitor = createUser(2L, "anna");
		PetEntity pet = createPet(10L, "Luna", owner);
		visitor.getFollowedPets().add(pet);

		Authentication authentication = new UsernamePasswordAuthenticationToken("anna", null);
		when(usersRepository.findByUsername("anna")).thenReturn(Optional.of(visitor));
		when(petRepository.findWithOwnerById(10L)).thenReturn(Optional.of(pet));
		when(usersRepository.save(visitor)).thenReturn(visitor);

		FollowResponse response = service.unfollowPet(10L, authentication);

		assertTrue(response.success());
		assertEquals("Successfully unfollowed pet", response.message());
		assertFalse(visitor.getFollowedPets().contains(pet));
		verify(usersRepository).save(visitor);
	}

	private UserEntity createUser(Long id, String username) {
		RoleEntity role = new RoleEntity("Pet owner", "Default role");
		UserEntity user = new UserEntity(username, username + "@example.com", "hash", "First", "Last", role);
		ReflectionTestUtils.setField(user, "id", id);
		return user;
	}

	private PetEntity createPet(Long id, String name, UserEntity owner) {
		PetEntity pet = new PetEntity(name, owner);
		ReflectionTestUtils.setField(pet, "id", id);
		return pet;
	}
}
