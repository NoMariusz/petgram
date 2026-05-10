package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.UserLoginRequest;
import com.petgram.petgrambackend.view.LoginResponse;

public interface AuthService {
	LoginResponse login(UserLoginRequest request);

	void logout(String authorizationHeader);
}
