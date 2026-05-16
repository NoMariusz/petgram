package com.petgram.petgrambackend;

import com.petgram.petgrambackend.config.JwtAuthenticationFilter;
import com.petgram.petgrambackend.dto.UserLoginRequest;
import com.petgram.petgrambackend.entity.RevokedTokenEntity;
import com.petgram.petgrambackend.entity.RoleEntity;
import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.RevokedTokenRepository;
import com.petgram.petgrambackend.repository.UsersRepository;
import com.petgram.petgrambackend.service.AuthServiceImpl;
import com.petgram.petgrambackend.service.JwtService;
import com.petgram.petgrambackend.view.LoginResponse;
import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.clearInvocations;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

class AuthTests {

	@AfterEach
	void clearSecurityContext() {
		SecurityContextHolder.clearContext();
	}

	@Test
	@DisplayName("Login with username returns token response")
	void loginWithUsernameReturnsTokenResponse() {
		UsersRepository usersRepository = mock(UsersRepository.class);
		PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
		JwtService jwtService = mock(JwtService.class);
		RevokedTokenRepository revokedTokenRepository = mock(RevokedTokenRepository.class);
		AuthServiceImpl authService = new AuthServiceImpl(usersRepository, passwordEncoder, jwtService, revokedTokenRepository);

		UserEntity user = createUser("john", "john@example.com", true, true);
		UserLoginRequest request = new UserLoginRequest();
		request.setLogin("john");
		request.setPassword("secret");

		when(usersRepository.findByUsername("john")).thenReturn(Optional.of(user));
		when(passwordEncoder.matches("secret", user.getPasswordHash())).thenReturn(true);
		when(jwtService.generateToken(user)).thenReturn("token-123");
		when(jwtService.getExpirationSeconds()).thenReturn(7200L);

		LoginResponse response = authService.login(request);

		assertEquals(user.getId(), response.userId());
		assertEquals("john", response.username());
		assertEquals("john@example.com", response.email());
		assertEquals("Pet owner", response.role());
		assertEquals("token-123", response.accessToken());
		assertEquals("Bearer", response.tokenType());
		assertEquals(7200L, response.expiresInSeconds());
	}

	@Test
	@DisplayName("Login with email works when username lookup misses")
	void loginWithEmailWorks() {
		UsersRepository usersRepository = mock(UsersRepository.class);
		PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
		JwtService jwtService = mock(JwtService.class);
		RevokedTokenRepository revokedTokenRepository = mock(RevokedTokenRepository.class);
		AuthServiceImpl authService = new AuthServiceImpl(usersRepository, passwordEncoder, jwtService, revokedTokenRepository);

		UserEntity user = createUser("anna", "anna@example.com", true, false);
		UserLoginRequest request = new UserLoginRequest();
		request.setLogin("anna@example.com");
		request.setPassword("secret");

		when(usersRepository.findByUsername("anna@example.com")).thenReturn(Optional.empty());
		when(usersRepository.findByEmail("anna@example.com")).thenReturn(Optional.of(user));
		when(passwordEncoder.matches("secret", user.getPasswordHash())).thenReturn(true);
		when(jwtService.generateToken(user)).thenReturn("token-email");
		when(jwtService.getExpirationSeconds()).thenReturn(3600L);

		LoginResponse response = authService.login(request);

		assertEquals("anna", response.username());
		assertEquals("anna@example.com", response.email());
		assertEquals(false, response.verified());
		assertEquals("token-email", response.accessToken());
	}

	@Test
	@DisplayName("Login fails with UNAUTHORIZED for invalid credentials")
	void loginFailsForInvalidCredentials() {
		UsersRepository usersRepository = mock(UsersRepository.class);
		PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
		JwtService jwtService = mock(JwtService.class);
		RevokedTokenRepository revokedTokenRepository = mock(RevokedTokenRepository.class);
		AuthServiceImpl authService = new AuthServiceImpl(usersRepository, passwordEncoder, jwtService, revokedTokenRepository);

		UserEntity user = createUser("john", "john@example.com", true, true);
		UserLoginRequest request = new UserLoginRequest();
		request.setLogin("john");
		request.setPassword("wrong");

		when(usersRepository.findByUsername("john")).thenReturn(Optional.of(user));
		when(passwordEncoder.matches("wrong", user.getPasswordHash())).thenReturn(false);

		ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> authService.login(request));

		assertEquals(UNAUTHORIZED, ex.getStatusCode());
		assertEquals("Invalid credentials", ex.getReason());
	}

	@Test
	@DisplayName("Login fails with FORBIDDEN for inactive account")
	void loginFailsForInactiveUser() {
		UsersRepository usersRepository = mock(UsersRepository.class);
		PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
		JwtService jwtService = mock(JwtService.class);
		RevokedTokenRepository revokedTokenRepository = mock(RevokedTokenRepository.class);
		AuthServiceImpl authService = new AuthServiceImpl(usersRepository, passwordEncoder, jwtService, revokedTokenRepository);

		UserEntity user = createUser("john", "john@example.com", false, true);
		UserLoginRequest request = new UserLoginRequest();
		request.setLogin("john");
		request.setPassword("secret");

		when(usersRepository.findByUsername("john")).thenReturn(Optional.of(user));
		when(passwordEncoder.matches("secret", user.getPasswordHash())).thenReturn(true);

		ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> authService.login(request));

		assertEquals(FORBIDDEN, ex.getStatusCode());
		assertEquals("User account is inactive", ex.getReason());
	}

	@Test
	@DisplayName("Logout with valid bearer token stores revoked token id")
	void logoutRevokesToken() {
		UsersRepository usersRepository = mock(UsersRepository.class);
		PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
		JwtService jwtService = mock(JwtService.class);
		RevokedTokenRepository revokedTokenRepository = mock(RevokedTokenRepository.class);
		AuthServiceImpl authService = new AuthServiceImpl(usersRepository, passwordEncoder, jwtService, revokedTokenRepository);

		String authorizationHeader = "Bearer token-abc";
		LocalDateTime expiration = LocalDateTime.now().plusHours(2);

		when(jwtService.extractTokenId("token-abc")).thenReturn("jti-123");
		when(jwtService.extractExpiration("token-abc")).thenReturn(expiration);
		when(revokedTokenRepository.existsByTokenId("jti-123")).thenReturn(false);

		authService.logout(authorizationHeader);

		verify(revokedTokenRepository).save(any(RevokedTokenEntity.class));
	}

	@Test
	@DisplayName("Logout fails with UNAUTHORIZED when bearer header is missing")
	void logoutFailsWhenBearerHeaderMissing() {
		UsersRepository usersRepository = mock(UsersRepository.class);
		PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
		JwtService jwtService = mock(JwtService.class);
		RevokedTokenRepository revokedTokenRepository = mock(RevokedTokenRepository.class);
		AuthServiceImpl authService = new AuthServiceImpl(usersRepository, passwordEncoder, jwtService, revokedTokenRepository);

		ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> authService.logout("token-abc"));

		assertEquals(UNAUTHORIZED, ex.getStatusCode());
		assertEquals("Missing bearer token", ex.getReason());
	}

	@Test
	@DisplayName("Logout fails with UNAUTHORIZED for invalid JWT")
	void logoutFailsForInvalidToken() {
		UsersRepository usersRepository = mock(UsersRepository.class);
		PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
		JwtService jwtService = mock(JwtService.class);
		RevokedTokenRepository revokedTokenRepository = mock(RevokedTokenRepository.class);
		AuthServiceImpl authService = new AuthServiceImpl(usersRepository, passwordEncoder, jwtService, revokedTokenRepository);

		when(jwtService.extractTokenId("token-abc")).thenThrow(new JwtException("bad token"));

		ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> authService.logout("Bearer token-abc"));

		assertEquals(UNAUTHORIZED, ex.getStatusCode());
		assertEquals("Invalid token", ex.getReason());
	}

	@Test
	@DisplayName("Revoked token is rejected by JWT filter after logout")
	void revokedTokenIsRejectedAfterLogout() throws Exception {
		UsersRepository usersRepository = mock(UsersRepository.class);
		PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
		JwtService jwtService = mock(JwtService.class);
		RevokedTokenRepository revokedTokenRepository = mock(RevokedTokenRepository.class);

		AuthServiceImpl authService = new AuthServiceImpl(usersRepository, passwordEncoder, jwtService, revokedTokenRepository);
		JwtAuthenticationFilter filter = new JwtAuthenticationFilter(jwtService, usersRepository, revokedTokenRepository);

		UserEntity user = createUser("john", "john@example.com", true, true);
		Set<String> revokedTokenIds = new HashSet<>();

		when(jwtService.isTokenValid("token-abc")).thenReturn(true);
		when(jwtService.extractTokenId("token-abc")).thenReturn("jti-123");
		when(jwtService.extractSubject("token-abc")).thenReturn("john");
		when(jwtService.extractExpiration("token-abc")).thenReturn(LocalDateTime.now().plusHours(1));
		when(usersRepository.findByUsername("john")).thenReturn(Optional.of(user));
		when(revokedTokenRepository.existsByTokenId("jti-123")).thenAnswer(invocation -> revokedTokenIds.contains(invocation.getArgument(0)));
		when(revokedTokenRepository.save(any(RevokedTokenEntity.class))).thenAnswer(invocation -> {
			RevokedTokenEntity entity = invocation.getArgument(0);
			revokedTokenIds.add(entity.getTokenId());
			return entity;
		});

		MockHttpServletRequest request = new MockHttpServletRequest();
		request.addHeader("Authorization", "Bearer token-abc");
		MockHttpServletResponse response = new MockHttpServletResponse();

		filter.doFilter(request, response, new MockFilterChain());
		assertNotNull(SecurityContextHolder.getContext().getAuthentication());

		SecurityContextHolder.clearContext();
		clearInvocations(usersRepository);
		authService.logout("Bearer token-abc");

		filter.doFilter(request, response, new MockFilterChain());
		assertNull(SecurityContextHolder.getContext().getAuthentication());

		verify(usersRepository, never()).findByUsername(anyString());
	}

	private UserEntity createUser(String username, String email, boolean active, boolean verified) {
		RoleEntity role = new RoleEntity("Pet owner", "Default role");
		UserEntity user = new UserEntity(username, email, "hashed-password", "John", "Doe", role);
		user.setIsActive(active);
		user.setIsVerified(verified);
		return user;
	}
}
