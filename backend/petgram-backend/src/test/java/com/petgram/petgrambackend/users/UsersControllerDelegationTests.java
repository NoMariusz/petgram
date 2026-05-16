package com.petgram.petgrambackend.users;

import com.petgram.petgrambackend.controller.UsersController;
import com.petgram.petgrambackend.dto.UserCreateRequest;
import com.petgram.petgrambackend.dto.UserUpdateRequest;
import com.petgram.petgrambackend.service.UsersService;
import com.petgram.petgrambackend.view.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UsersControllerDelegationTests {

    @Test
    @DisplayName("UsersController.createUser returns CREATED with service response")
    void controllerCreateUserReturnsCreated() {
        UsersService usersService = mock(UsersService.class);
        UsersController controller = new UsersController(usersService);

        UserCreateRequest request = new UserCreateRequest();
        request.setUsername("john");
        request.setEmail("john@example.com");

        UserCreateResponse expected = new UserCreateResponse(1L, "john", "john@example.com");
        when(usersService.createUser(request)).thenReturn(expected);

        ResponseEntity<UserCreateResponse> response = controller.createUser(request);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(expected, response.getBody());
    }

    @Test
    @DisplayName("UsersController.getCurrentUser delegates username from authentication")
    void controllerGetCurrentUserDelegatesUsername() {
        UsersService usersService = mock(UsersService.class);
        UsersController controller = new UsersController(usersService);

        UserDataResponse expected = new UserDataResponse(
                7L,
                "john",
                "john@example.com",
                "John",
                "Doe",
                "bio",
                "Warsaw",
                "https://example.com",
                "Pet owner",
                true,
                true,
                LocalDateTime.of(2026, 1, 1, 12, 0)
        );
        Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);
        when(usersService.getCurrentUserData("john")).thenReturn(expected);

        UserDataResponse response = controller.getCurrentUser(authentication);

        assertEquals(expected, response);
        verify(usersService).getCurrentUserData("john");
    }

    @Test
    @DisplayName("UsersController.follow delegates to service")
    void controllerFollowDelegatesToService() {
        UsersService usersService = mock(UsersService.class);
        UsersController controller = new UsersController(usersService);
        Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);
        FollowResponse expected = new FollowResponse(true, "Successfully followed user");

        when(usersService.follow(2L, authentication)).thenReturn(expected);

        FollowResponse response = controller.follow(2L, authentication);

        assertEquals(expected, response);
        verify(usersService).follow(2L, authentication);
    }

    @Test
    @DisplayName("UsersController.updateCurrentUser delegates to service")
    void controllerUpdateCurrentUserDelegatesToService() {
        UsersService usersService = mock(UsersService.class);
        UsersController controller = new UsersController(usersService);
        Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);

        UserUpdateRequest request = new UserUpdateRequest();
        request.setBio("new-bio");
        UserUpdateResponse expected = new UserUpdateResponse(true, "User updated successfully", 1L, "john");

        when(usersService.updateCurrentUser(eq(request), eq(authentication))).thenReturn(expected);

        UserUpdateResponse response = controller.updateCurrentUser(request, authentication);

        assertNotNull(response);
        assertTrue(response.success());
        assertFalse(response.username().isBlank());
        verify(usersService).updateCurrentUser(request, authentication);
    }

    @Test
    @DisplayName("UsersController.getUserProfileById delegates to service")
    void controllerGetUserProfileByIdDelegates() {
        UsersService usersService = mock(UsersService.class);
        UsersController controller = new UsersController(usersService);
        Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);

        UserProfileResponse expected = new UserProfileResponse(
                2L,
                "anna",
                "Anna",
                "Smith",
                "bio",
                "/photo.png",
                "Gdansk",
                "Pet owner",
                List.of(),
                null,
                true,
                3L,
                4L,
                5L,
                false
        );

        when(usersService.getUserProfileById(2L, authentication)).thenReturn(expected);

        UserProfileResponse response = controller.getUserProfileById(2L, authentication);

        assertEquals(expected, response);
        verify(usersService).getUserProfileById(2L, authentication);
    }
}