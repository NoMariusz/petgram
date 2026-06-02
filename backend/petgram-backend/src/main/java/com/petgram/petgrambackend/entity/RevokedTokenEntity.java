package com.petgram.petgrambackend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "revoked_tokens")
public class RevokedTokenEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true, length = 64)
	private String tokenId;

	@Column(nullable = false)
	private LocalDateTime expiresAt;

	@Column(nullable = false, updatable = false)
	private LocalDateTime revokedAt;

	public RevokedTokenEntity() {
	}

	public RevokedTokenEntity(String tokenId, LocalDateTime expiresAt) {
		this.tokenId = tokenId;
		this.expiresAt = expiresAt;
	}

	@PrePersist
	protected void onCreate() {
		if (revokedAt == null) {
			revokedAt = LocalDateTime.now();
		}
	}

	public Long getId() {
		return id;
	}

	public String getTokenId() {
		return tokenId;
	}

	public LocalDateTime getExpiresAt() {
		return expiresAt;
	}

	public LocalDateTime getRevokedAt() {
		return revokedAt;
	}
}
