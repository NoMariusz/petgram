package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.UserCreateRequest;
import com.petgram.petgrambackend.view.UserCreateResponse;
import com.petgram.petgrambackend.view.UserDataResponse;
import com.petgram.petgrambackend.view.UserProfileResponse;
import org.springframework.security.core.Authentication;

public interface UsersService {

	UserCreateResponse createUser(UserCreateRequest request);

	UserDataResponse getCurrentUserData(String username);

	UserProfileResponse getCurrentUserProfile(Authentication authentication);

	UserProfileResponse getUserProfileById(Long userId, Authentication authentication);
}
