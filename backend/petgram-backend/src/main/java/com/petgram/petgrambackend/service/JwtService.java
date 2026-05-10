package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.entity.UserEntity;

import java.time.LocalDateTime;

public interface JwtService {

	String generateToken(UserEntity user);

	String extractSubject(String token);

	String extractTokenId(String token);

	LocalDateTime extractExpiration(String token);

	boolean isTokenValid(String token);

	long getExpirationSeconds();
}
