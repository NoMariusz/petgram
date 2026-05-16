package com.petgram.petgrambackend.repository;

import com.petgram.petgrambackend.entity.UserEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<UserEntity, Long> {

	Optional<UserEntity> findByUsername(String username);

	Optional<UserEntity> findByEmail(String email);

	@EntityGraph(attributePaths = {"role", "pets"})
	Optional<UserEntity> findWithProfileByUsername(String username);

	@EntityGraph(attributePaths = {"role", "pets"})
	Optional<UserEntity> findWithProfileById(Long id);
}
