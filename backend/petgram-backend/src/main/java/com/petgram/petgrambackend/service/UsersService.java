package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.UserCreateRequest;
import com.petgram.petgrambackend.view.UserCreateResponse;

public interface UsersService {

	UserCreateResponse createUser(UserCreateRequest request);
}
