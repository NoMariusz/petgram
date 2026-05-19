package com.petgram.petgrambackend.pets;

import com.petgram.petgrambackend.dto.PetCreateRequest;
import com.petgram.petgrambackend.entity.PetEntity;
import com.petgram.petgrambackend.entity.RoleEntity;
import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.PetRepository;
import com.petgram.petgrambackend.repository.UsersRepository;
import com.petgram.petgrambackend.service.FileStorageService;
import com.petgram.petgrambackend.service.PetsServiceImpl;
import com.petgram.petgrambackend.view.PetCreateResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpStatus.NOT_FOUND;

class PetsServiceCreateTests {

	@Test
	@DisplayName("createPet assigns new pet to authenticated user")
	void createPetAssignsNewPetToAuthenticatedUser() {
		PetRepository petRepository = mock(PetRepository.class);
		UsersRepository usersRepository = mock(UsersRepository.class);
		FileStorageService fileStorageService = mock(FileStorageService.class);
		PetsServiceImpl service = new PetsServiceImpl(petRepository, usersRepository, fileStorageService);

		UserEntity owner = createUser();
		PetCreateRequest request = new PetCreateRequest();
		request.setName("Luna");
		request.setBio("Small dog with a big heart.");
		request.setBornAt(LocalDate.of(2022, 5, 12));

		Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);
		when(usersRepository.findByUsername("john")).thenReturn(Optional.of(owner));
		when(petRepository.save(any(PetEntity.class))).thenAnswer(invocation -> {
			PetEntity pet = invocation.getArgument(0);
			ReflectionTestUtils.setField(pet, "id", 10L);
			return pet;
		});

		PetCreateResponse response = service.createPet(request, authentication);

		assertEquals(10L, response.id());
		assertEquals("Luna", response.name());
		assertEquals("Small dog with a big heart.", response.bio());
		assertEquals(LocalDate.of(2022, 5, 12).atStartOfDay(), response.bornAt());
		assertEquals(1L, response.ownerId());
		assertEquals("john", response.ownerUsername());
		verify(petRepository).save(any(PetEntity.class));
	}

	@Test
	@DisplayName("createPet stores profile picture when base64 image is provided")
	void createPetStoresProfilePictureWhenProvided() {
		PetRepository petRepository = mock(PetRepository.class);
		UsersRepository usersRepository = mock(UsersRepository.class);
		FileStorageService fileStorageService = mock(FileStorageService.class);
		PetsServiceImpl service = new PetsServiceImpl(petRepository, usersRepository, fileStorageService);

		UserEntity owner = createUser();
		PetCreateRequest request = new PetCreateRequest();
		request.setName("Milo");
		request.setProfilePictureImage("base64-image");

		Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);
		when(usersRepository.findByUsername("john")).thenReturn(Optional.of(owner));
		when(fileStorageService.saveBase64("base64-image")).thenReturn("/data/uploads/milo.png");
		when(petRepository.save(any(PetEntity.class))).thenAnswer(invocation -> {
			PetEntity pet = invocation.getArgument(0);
			ReflectionTestUtils.setField(pet, "id", 11L);
			return pet;
		});

		PetCreateResponse response = service.createPet(request, authentication);

		assertEquals("/data/uploads/milo.png", response.profilePictureUrl());
		verify(fileStorageService).saveBase64("base64-image");
	}

	@Test
	@DisplayName("createPet throws NOT_FOUND when authenticated user is missing")
	void createPetThrowsWhenAuthenticatedUserIsMissing() {
		PetRepository petRepository = mock(PetRepository.class);
		UsersRepository usersRepository = mock(UsersRepository.class);
		FileStorageService fileStorageService = mock(FileStorageService.class);
		PetsServiceImpl service = new PetsServiceImpl(petRepository, usersRepository, fileStorageService);

		PetCreateRequest request = new PetCreateRequest();
		request.setName("Ghost");
		Authentication authentication = new UsernamePasswordAuthenticationToken("ghost", null);
		when(usersRepository.findByUsername("ghost")).thenReturn(Optional.empty());

		ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.createPet(request, authentication));

		assertSame(NOT_FOUND, ex.getStatusCode());
		assertEquals("Current user not found", ex.getReason());
	}

	@Test
	@DisplayName("getPetProfile returns pet owner and counters")
	void getPetProfileReturnsPetOwnerAndCounters() {
		PetRepository petRepository = mock(PetRepository.class);
		UsersRepository usersRepository = mock(UsersRepository.class);
		FileStorageService fileStorageService = mock(FileStorageService.class);
		PetsServiceImpl service = new PetsServiceImpl(petRepository, usersRepository, fileStorageService);

		UserEntity owner = createUser();
		PetEntity pet = new PetEntity("Luna", owner);
		ReflectionTestUtils.setField(pet, "id", 20L);
		pet.setBio("Small dog with a big heart.");
		pet.setBornAt(LocalDateTime.of(2022, 5, 12, 0, 0));
		pet.setProfilePictureUrl("/data/seed/dog_profile_picture.png");

		Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);
		when(usersRepository.findByUsername("john")).thenReturn(Optional.of(owner));
		when(petRepository.findWithOwnerById(20L)).thenReturn(Optional.of(pet));
		when(petRepository.countPostsByPetId(20L)).thenReturn(3L);
		when(petRepository.countFollowersByPetId(20L)).thenReturn(5L);

		var response = service.getPetProfile(20L, authentication);

		assertEquals(20L, response.id());
		assertEquals("Luna", response.name());
		assertEquals("Small dog with a big heart.", response.bio());
		assertEquals("/data/seed/dog_profile_picture.png", response.profilePictureUrl());
		assertEquals(1L, response.ownerId());
		assertEquals("john", response.ownerUsername());
		assertEquals("John Doe", response.ownerDisplayName());
		assertEquals(true, response.isOwnProfile());
		assertEquals(3L, response.memoriesCount());
		assertEquals(5L, response.followersCount());
	}

	@Test
	@DisplayName("getPetProfile throws NOT_FOUND for unknown pet")
	void getPetProfileThrowsWhenPetIsMissing() {
		PetRepository petRepository = mock(PetRepository.class);
		UsersRepository usersRepository = mock(UsersRepository.class);
		FileStorageService fileStorageService = mock(FileStorageService.class);
		PetsServiceImpl service = new PetsServiceImpl(petRepository, usersRepository, fileStorageService);

		UserEntity owner = createUser();
		Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);
		when(usersRepository.findByUsername("john")).thenReturn(Optional.of(owner));
		when(petRepository.findWithOwnerById(404L)).thenReturn(Optional.empty());

		ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.getPetProfile(404L, authentication));

		assertSame(NOT_FOUND, ex.getStatusCode());
		assertEquals("Pet not found", ex.getReason());
	}

	private UserEntity createUser() {
		RoleEntity role = new RoleEntity("Pet owner", "Default role");
		UserEntity owner = new UserEntity("john", "john@example.com", "hash", "John", "Doe", role);
		ReflectionTestUtils.setField(owner, "id", 1L);
		return owner;
	}
}
