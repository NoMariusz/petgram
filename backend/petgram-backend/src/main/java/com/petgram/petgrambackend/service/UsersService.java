package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.UserCreateRequest;
import com.petgram.petgrambackend.dto.UserUpdateRequest;
import com.petgram.petgrambackend.view.*;
import org.springframework.security.core.Authentication;

public interface UsersService {

	UserCreateResponse createUser(UserCreateRequest request);

	UserDataResponse getCurrentUserData(String username);

	UserProfileResponse getCurrentUserProfile(Authentication authentication);

	UserProfileResponse getUserProfileById(Long userId, Authentication authentication);

	FollowResponse follow(Long followUserId, Authentication authentication);

	FollowResponse unfollow(Long unfollowUserId, Authentication authentication);

	UserUpdateResponse updateCurrentUser(UserUpdateRequest request, Authentication authentication);

	UserDataResponse getByUsername(String username, Authentication authentication);
}
