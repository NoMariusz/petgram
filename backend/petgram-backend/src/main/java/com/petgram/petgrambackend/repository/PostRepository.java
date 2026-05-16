package com.petgram.petgrambackend.repository;

import com.petgram.petgrambackend.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<PostEntity, Long> {

	Optional<PostEntity> findFirstByCreatorIdAndIsPinnedTrueOrderByUpdatedAtDesc(Long creatorId);

	@Query("SELECT DISTINCT p FROM PostEntity p LEFT JOIN FETCH p.likedByUsers WHERE p.creator.id = :creatorId ORDER BY p.createdAt DESC")
	List<PostEntity> findAllWithLikesByCreatorId(@Param("creatorId") Long creatorId);
}
