package com.petgram.petgrambackend.repository;

import com.petgram.petgrambackend.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<PostEntity, Long> {

	Optional<PostEntity> findFirstByCreatorIdAndIsPinnedTrueOrderByUpdatedAtDesc(Long creatorId);
}
