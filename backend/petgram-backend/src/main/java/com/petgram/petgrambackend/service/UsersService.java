package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.UserCreateRequest;
import com.petgram.petgrambackend.view.UserCreateResponse;
import com.petgram.petgrambackend.view.UserDataResponse;

public interface UsersService {

	UserCreateResponse createUser(UserCreateRequest request);

	UserDataResponse getCurrentUserData(String username);
}
