package com.petgram.petgrambackend.users;

import com.petgram.petgrambackend.dto.UserUpdateRequest;
import com.petgram.petgrambackend.entity.RoleEntity;
import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.PostRepository;
import com.petgram.petgrambackend.repository.RoleRepository;
import com.petgram.petgrambackend.repository.UsersRepository;
import com.petgram.petgrambackend.service.FileStorageServiceImpl;
import com.petgram.petgrambackend.service.UserActivationEmailServiceImpl;
import com.petgram.petgrambackend.service.UsersServiceImpl;
import com.petgram.petgrambackend.view.FollowResponse;
import com.petgram.petgrambackend.view.UserUpdateResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.HttpStatus.*;

public class UsersServiceFollowAndUpdateTests {

    @Test
    @DisplayName("UsersService.follow succeeds for valid target")
    void followSucceedsForValidTarget() {
        UsersRepository usersRepository = mock(UsersRepository.class);
        PostRepository postRepository = mock(PostRepository.class);
        RoleRepository roleRepository = mock(RoleRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        UserActivationEmailServiceImpl activationEmailService = mock(UserActivationEmailServiceImpl.class);
        FileStorageServiceImpl fileStorageService = mock(FileStorageServiceImpl.class);

        UsersServiceImpl service = new UsersServiceImpl(
                usersRepository,
                postRepository,
                roleRepository,
                passwordEncoder,
                activationEmailService,
                fileStorageService
        );

        RoleEntity role = new RoleEntity("Pet owner", "Default role");
        UserEntity current = new UserEntity("john", "john@example.com", "hash", "John", "Doe", role);
        org.springframework.test.util.ReflectionTestUtils.setField(current, "id", 1L);
        UserEntity target = new UserEntity("anna", "anna@example.com", "hash", "Anna", "Doe", role);
        org.springframework.test.util.ReflectionTestUtils.setField(target, "id", 2L);

        Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);
        when(usersRepository.findByUsername("john")).thenReturn(Optional.of(current));
        when(usersRepository.findById(2L)).thenReturn(Optional.of(target));
        when(usersRepository.save(current)).thenReturn(current);

        FollowResponse response = service.follow(2L, authentication);

        assertTrue(response.success());
        assertEquals("Successfully followed user", response.message());
        assertTrue(current.getFollowing().contains(target));
    }

    @Test
    @DisplayName("UsersService.unfollow rejects when user is not followed")
    void unfollowRejectsWhenNotFollowing() {
        UsersRepository usersRepository = mock(UsersRepository.class);
        PostRepository postRepository = mock(PostRepository.class);
        RoleRepository roleRepository = mock(RoleRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        UserActivationEmailServiceImpl activationEmailService = mock(UserActivationEmailServiceImpl.class);
        FileStorageServiceImpl fileStorageService = mock(FileStorageServiceImpl.class);

        UsersServiceImpl service = new UsersServiceImpl(
                usersRepository,
                postRepository,
                roleRepository,
                passwordEncoder,
                activationEmailService,
                fileStorageService
        );

        RoleEntity role = new RoleEntity("Pet owner", "Default role");
        UserEntity current = new UserEntity("john", "john@example.com", "hash", "John", "Doe", role);
        org.springframework.test.util.ReflectionTestUtils.setField(current, "id", 1L);
        UserEntity target = new UserEntity("anna", "anna@example.com", "hash", "Anna", "Doe", role);
        org.springframework.test.util.ReflectionTestUtils.setField(target, "id", 2L);

        Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);
        when(usersRepository.findByUsername("john")).thenReturn(Optional.of(current));
        when(usersRepository.findById(2L)).thenReturn(Optional.of(target));

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.unfollow(2L, authentication));
        assertEquals(CONFLICT, ex.getStatusCode());
        assertEquals("Not following this user", ex.getReason());
    }

    @Test
    @DisplayName("UsersService.updateCurrentUser updates only provided fields")
    void updateCurrentUserUpdatesOnlyProvidedFields() {
        UsersRepository usersRepository = mock(UsersRepository.class);
        PostRepository postRepository = mock(PostRepository.class);
        RoleRepository roleRepository = mock(RoleRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        UserActivationEmailServiceImpl activationEmailService = mock(UserActivationEmailServiceImpl.class);
        FileStorageServiceImpl fileStorageService = mock(FileStorageServiceImpl.class);

        UsersServiceImpl service = new UsersServiceImpl(
                usersRepository,
                postRepository,
                roleRepository,
                passwordEncoder,
                activationEmailService,
                fileStorageService
        );

        RoleEntity role = new RoleEntity("Pet owner", "Default role");
        UserEntity current = new UserEntity("john", "john@example.com", "hash", "John", "Doe", role);
        org.springframework.test.util.ReflectionTestUtils.setField(current, "id", 4L);
        current.setBio("old-bio");
        current.setProfilePictureUrl("/old.png");

        UserUpdateRequest request = new UserUpdateRequest();
        request.setBio("new-bio");
        request.setProfilePictureImage("base64-image");
        request.setLocation("Wroclaw");

        Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);
        when(usersRepository.findByUsername("john")).thenReturn(Optional.of(current));
        when(fileStorageService.saveBase64("base64-image")).thenReturn("/data/uploads/new.png");
        when(usersRepository.save(current)).thenReturn(current);

        UserUpdateResponse response = service.updateCurrentUser(request, authentication);

        assertTrue(response.success());
        assertEquals("User updated successfully", response.message());
        assertEquals(4L, response.id());
        assertEquals("john", response.username());
        assertEquals("John", current.getFirstName());
        assertEquals("new-bio", current.getBio());
        assertEquals("Wroclaw", current.getLocation());
        assertEquals("/data/uploads/new.png", current.getProfilePictureUrl());
    }

    @Test
    @DisplayName("UsersService.updateCurrentUser throws NOT_FOUND for unknown auth user")
    void updateCurrentUserThrowsWhenUnknownUser() {
        UsersRepository usersRepository = mock(UsersRepository.class);
        PostRepository postRepository = mock(PostRepository.class);
        RoleRepository roleRepository = mock(RoleRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        UserActivationEmailServiceImpl activationEmailService = mock(UserActivationEmailServiceImpl.class);
        FileStorageServiceImpl fileStorageService = mock(FileStorageServiceImpl.class);

        UsersServiceImpl service = new UsersServiceImpl(
                usersRepository,
                postRepository,
                roleRepository,
                passwordEncoder,
                activationEmailService,
                fileStorageService
        );

        UserUpdateRequest request = new UserUpdateRequest();
        request.setBio("new-bio");
        Authentication authentication = new UsernamePasswordAuthenticationToken("ghost", null);
        when(usersRepository.findByUsername("ghost")).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> service.updateCurrentUser(request, authentication));
        assertEquals(NOT_FOUND, ex.getStatusCode());
        assertEquals("User not found", ex.getReason());
    }
}