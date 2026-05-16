package com.petgram.petgrambackend.repository;

import com.petgram.petgrambackend.entity.UserEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<UserEntity, Long> {

	Optional<UserEntity> findByUsername(String username);

	Optional<UserEntity> findByEmail(String email);

	@EntityGraph(attributePaths = {"role", "pets"})
	Optional<UserEntity> findWithProfileByUsername(String username);

	@EntityGraph(attributePaths = {"role", "pets"})
	Optional<UserEntity> findWithProfileById(Long id);

	@Query("SELECT COUNT(p) FROM PostEntity p WHERE p.creator.id = :userId")
	long countCreatedPostsById(@Param("userId") Long userId);

	@Query("SELECT COUNT(f) FROM UserEntity u JOIN u.followers f WHERE u.id = :userId")
	long countFollowersById(@Param("userId") Long userId);

	@Query("SELECT COUNT(f) FROM UserEntity u JOIN u.following f WHERE u.id = :userId")
	long countFollowedUsersById(@Param("userId") Long userId);

	@Query("SELECT COUNT(p) FROM UserEntity u JOIN u.followedPets p WHERE u.id = :userId")
	long countFollowedPetsById(@Param("userId") Long userId);
}
