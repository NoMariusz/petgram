package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.entity.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtServiceImpl implements JwtService {

	private final SecretKey signingKey;
	private final long expirationSeconds;

	public JwtServiceImpl(
			@Value("${app.jwt.secret}") String jwtSecret,
			@Value("${app.jwt.expiration-minutes:120}") long expirationMinutes
	) {
		this.signingKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
		this.expirationSeconds = expirationMinutes * 60;
	}

	@Override
	public String generateToken(UserEntity user) {
		Instant now = Instant.now();
		Instant expiration = now.plusSeconds(expirationSeconds);
		String roleName = user.getRole() == null ? "" : user.getRole().getName();

		return Jwts.builder()
				.id(UUID.randomUUID().toString())
				.subject(user.getUsername())
				.issuedAt(Date.from(now))
				.expiration(Date.from(expiration))
				.claim("uid", user.getId())
				.claim("role", roleName)
				.signWith(signingKey)
				.compact();
	}

	@Override
	public String extractSubject(String token) {
		return extractAllClaims(token).getSubject();
	}

	@Override
	public String extractTokenId(String token) {
		return extractAllClaims(token).getId();
	}

	@Override
	public LocalDateTime extractExpiration(String token) {
		Date expiration = extractAllClaims(token).getExpiration();
		return LocalDateTime.ofInstant(expiration.toInstant(), ZoneId.systemDefault());
	}

	@Override
	public boolean isTokenValid(String token) {
		extractAllClaims(token);
		return true;
	}

	@Override
	public long getExpirationSeconds() {
		return expirationSeconds;
	}

	private Claims extractAllClaims(String token) {
		return Jwts.parser().verifyWith(signingKey).build().parseSignedClaims(token).getPayload();
	}
}
