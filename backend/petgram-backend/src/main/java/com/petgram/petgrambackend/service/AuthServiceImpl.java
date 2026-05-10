package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.UserLoginRequest;
import com.petgram.petgrambackend.entity.RevokedTokenEntity;
import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.RevokedTokenRepository;
import com.petgram.petgrambackend.repository.UsersRepository;
import com.petgram.petgrambackend.view.LoginResponse;
import io.jsonwebtoken.JwtException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Service
public class AuthServiceImpl implements AuthService {

	private final UsersRepository usersRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final RevokedTokenRepository revokedTokenRepository;

	public AuthServiceImpl(
			UsersRepository usersRepository,
			PasswordEncoder passwordEncoder,
			JwtService jwtService,
			RevokedTokenRepository revokedTokenRepository
	) {
		this.usersRepository = usersRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.revokedTokenRepository = revokedTokenRepository;
	}

	@Override
	public LoginResponse login(UserLoginRequest request) {
		UserEntity user = findByLogin(request.getLogin())
				.orElseThrow(() -> new ResponseStatusException(UNAUTHORIZED, "Invalid credentials"));

		if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
			throw new ResponseStatusException(UNAUTHORIZED, "Invalid credentials");
		}

		if (!Boolean.TRUE.equals(user.getIsActive())) {
			throw new ResponseStatusException(FORBIDDEN, "User account is inactive");
		}

		String roleName = user.getRole() == null ? null : user.getRole().getName();
		boolean isVerified = Boolean.TRUE.equals(user.getIsVerified());
		String accessToken = jwtService.generateToken(user);

		return new LoginResponse(
				user.getId(),
				user.getUsername(),
				user.getEmail(),
				roleName,
				true,
				isVerified,
				accessToken,
				"Bearer",
				jwtService.getExpirationSeconds()
		);
	}

	@Override
	public void logout(String authorizationHeader) {
		String token = extractBearerToken(authorizationHeader);

		try {
			String tokenId = jwtService.extractTokenId(token);
			LocalDateTime expiresAt = jwtService.extractExpiration(token);

			if (tokenId == null || tokenId.isBlank()) {
				throw new ResponseStatusException(UNAUTHORIZED, "Invalid token");
			}

			if (!revokedTokenRepository.existsByTokenId(tokenId)) {
				revokedTokenRepository.save(new RevokedTokenEntity(tokenId, expiresAt));
			}
		} catch (JwtException | IllegalArgumentException ex) {
			throw new ResponseStatusException(UNAUTHORIZED, "Invalid token");
		}
	}

	private Optional<UserEntity> findByLogin(String login) {
		Optional<UserEntity> byUsername = usersRepository.findByUsername(login);
		if (byUsername.isPresent()) {
			return byUsername;
		}
		return usersRepository.findByEmail(login);
	}

	private String extractBearerToken(String authorizationHeader) {
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
			throw new ResponseStatusException(UNAUTHORIZED, "Missing bearer token");
		}
		return authorizationHeader.substring(7);
	}
}
