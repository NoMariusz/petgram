package com.petgram.petgrambackend.repository;

import com.petgram.petgrambackend.entity.RevokedTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RevokedTokenRepository extends JpaRepository<RevokedTokenEntity, Long> {
	boolean existsByTokenId(String tokenId);
}
